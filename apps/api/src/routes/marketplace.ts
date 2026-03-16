import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { prisma } from '@clawcloud/db';
import { SafetyScorer } from '../services/safetyScorer';

export const marketplaceRoutes: FastifyPluginAsync = async (fastify, opts) => {
  
  // 1. Get all Verified Skills from the global Registry
  fastify.get('/api/marketplace/skills', async (request, reply) => {
    const verifiedSkills = await prisma.skillRegistry.findMany({
      where: { isVerified: true },
      orderBy: { installs: 'desc' }
    });
    return verifiedSkills;
  });

  // 2. Submit a new Skill for Community Review
  fastify.post<{ Body: { name: string, description: string, repoUrl: string, codeMock: string } }>(
    '/api/marketplace/submit', 
    async (request, reply) => {
      const { name, description, repoUrl, codeMock } = request.body;

      // Run automated static analysis
      const analysis = SafetyScorer.analyzeSkill(repoUrl, codeMock);

      // Add to Review Queue
      const review = await prisma.skillReview.create({
        data: {
          skillName: name,
          description,
          repoUrl,
          submitterId: 'user_mock_123',
          safetyScore: analysis.score,
          status: analysis.status,
          reportJson: analysis.report
        }
      });

      // (Mock) If auto-approved by high score, insert directly to Registry
      if (analysis.status === 'APPROVED') {
         await prisma.skillRegistry.create({
           data: {
             name,
             description,
             author: 'Community',
             repoUrl,
             isVerified: true,
             safetyScore: analysis.score,
             installs: 0
           }
         });
      }

      return review;
  });

  // 3. Admin: Get Review Queue
  fastify.get('/api/marketplace/queue', async (request, reply) => {
    return prisma.skillReview.findMany({
      orderBy: { createdAt: 'desc' }
    });
  });

  // 4. Admin: Approve a Review manually
  fastify.post<{ Params: { id: string } }>('/api/marketplace/queue/:id/approve', async (request, reply) => {
    const { id } = request.params;
    
    const review = await prisma.skillReview.update({
      where: { id },
      data: { status: 'APPROVED' }
    });

    // Move to Registry
    const newSkill = await prisma.skillRegistry.create({
      data: {
        name: review.skillName,
        description: review.description,
        author: 'Community',
        repoUrl: review.repoUrl,
        isVerified: true,
        safetyScore: review.safetyScore,
        installs: 0
      }
    });

    return newSkill;
  });
};
