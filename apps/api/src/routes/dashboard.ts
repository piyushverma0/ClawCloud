import { FastifyInstance } from 'fastify';
import { prisma } from '@clawcloud/db';

export async function dashboardRoutes(fastify: FastifyInstance) {
  // 1. SOUL Profile
  fastify.get('/api/instances/:id/soul', async (request, reply) => {
    const { id } = request.params as { id: string };
    const instance = await prisma.instance.findUnique({ where: { id } });
    if (!instance) return reply.status(404).send({ error: 'Not found' });
    return instance.soulProfile || { name: '', personality: '', goals: '', constraints: '' };
  });

  fastify.put('/api/instances/:id/soul', async (request, reply) => {
    const { id } = request.params as { id: string };
    const soulProfile = request.body as any;
    const instance = await prisma.instance.update({
      where: { id },
      data: { soulProfile }
    });
    return instance.soulProfile;
  });

  // 2. Memories
  fastify.get('/api/instances/:id/memories', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { search } = request.query as { search?: string };
    return await prisma.memory.findMany({
      where: {
        instanceId: id,
        content: search ? { contains: search, mode: 'insensitive' } : undefined
      },
      orderBy: { createdAt: 'desc' }
    });
  });

  fastify.delete('/api/instances/:id/memories/:memoryId', async (request, reply) => {
    const { memoryId } = request.params as { memoryId: string };
    await prisma.memory.delete({ where: { id: memoryId } });
    return { success: true };
  });

  fastify.post('/api/instances/:id/memories/dedupe', async (request, reply) => {
    // Mock background job trigger
    return { status: 'job_started', message: 'Deduplication background job has been triggered.' };
  });

  // 3. Channels
  fastify.get('/api/instances/:id/channels', async (request, reply) => {
    const { id } = request.params as { id: string };
    return await prisma.channel.findMany({ where: { instanceId: id } });
  });

  fastify.post('/api/instances/:id/channels', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { platform, token, isActive } = request.body as any;
    return await prisma.channel.create({
      data: { instanceId: id, platform, token, isActive }
    });
  });

  // 4. Cron Jobs
  fastify.get('/api/instances/:id/cron', async (request, reply) => {
    const { id } = request.params as { id: string };
    return await prisma.cronJob.findMany({ where: { instanceId: id } });
  });

  fastify.post('/api/instances/:id/cron', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, schedule, action } = request.body as any;
    return await prisma.cronJob.create({
      data: { instanceId: id, name, schedule, action }
    });
  });

  fastify.put('/api/instances/:id/cron/:cronId/toggle', async (request, reply) => {
    const { cronId } = request.params as { cronId: string };
    const { status } = request.body as { status: 'ACTIVE' | 'PAUSED' };
    return await prisma.cronJob.update({
      where: { id: cronId },
      data: { status }
    });
  });

  // 5. Skills
  fastify.get('/api/instances/:id/skills', async (request, reply) => {
    const { id } = request.params as { id: string };
    return await prisma.skill.findMany({ where: { instanceId: id } });
  });

  fastify.post('/api/instances/:id/skills', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { name, description, registryId } = request.body as any;

    if (registryId) {
       // Increment install count on the registry
       await prisma.skillRegistry.update({
         where: { id: registryId },
         data: { installs: { increment: 1 } }
       });
    }

    return await prisma.skill.create({
      data: { instanceId: id, name, description, registryId }
    });
  });

  fastify.delete('/api/instances/:id/skills/:skillId', async (request, reply) => {
    const { skillId } = request.params as { skillId: string };
    
    // Decrease install count? Keeping it simple for now or maybe we don't decrement on uninstall.
    await prisma.skill.delete({ where: { id: skillId } });
    return { success: true };
  });

  fastify.get('/api/instances/:id/skills/usage', async (request, reply) => {
    const { id } = request.params as { id: string };
    return await prisma.skillUsage.findMany({
       where: { instanceId: id },
       include: { registry: true }
    });
  });

  // 6. Session Health (Logs)
  fastify.get('/api/instances/:id/logs', async (request, reply) => {
    const { id } = request.params as { id: string };
    return await prisma.sessionLog.findMany({
      where: { instanceId: id },
      orderBy: { createdAt: 'desc' },
      take: 100 // Last 100 logs
    });
  });

  fastify.post('/api/instances/:id/restart', async (request, reply) => {
    const { id } = request.params as { id: string };
    // Log the restart request
    await prisma.sessionLog.create({
      data: {
        instanceId: id,
        level: 'WARN',
        message: 'System restart initiated by user'
      }
    });
    return { status: 'restarting', message: 'Instance restart signal sent' };
  });
}
