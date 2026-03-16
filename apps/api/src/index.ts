import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { prisma } from '@clawcloud/db';
import { DopplerMockService } from './services/apiKeyService';
import { initSocket, broadcastTokenUsage } from './services/socketService';
import { TelegramService } from './services/telegramService';
import { dashboardRoutes } from './routes/dashboard';

dotenv.config();

const fastify = Fastify({
  logger: true
});

fastify.register(cors, {
  origin: '*'
});

fastify.register(dashboardRoutes);

fastify.get('/', async (request, reply) => {
  return { hello: 'ClawCloud API running' };
});

fastify.get('/api/instances', async (request, reply) => {
  // In a real app we'd verify clerk token here
  const instances = await prisma.instance.findMany();
  return instances;
});

// Mock endpoint to register usage
fastify.post('/api/instances/:id/usage', async (request, reply) => {
  const { id } = request.params as { id: string };
  const { tokensUsed, inputTokens = 0, outputTokens = 0, costUsd = 0, metadata = null } 
    = request.body as any; // Using any for fast prototyping, in reality use TypeBox
  
  // Find instance to get userId
  const instance = await prisma.instance.findUnique({
    where: { id },
    include: { user: true }
  });

  if (!instance) {
    return reply.status(404).send({ error: 'Instance not found' });
  }

  // Save usage record
  const usageRecord = await prisma.tokenUsage.create({
    data: {
      tokensUsed,
      inputTokens,
      outputTokens,
      costUsd,
      metadata,
      instanceId: id,
      userId: instance.userId,
    }
  });

  // Calculate today's total cost for this user
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaysUsages = await prisma.tokenUsage.findMany({
    where: {
      userId: instance.userId,
      date: { gte: today }
    }
  });
  
  const totalCostToday = todaysUsages.reduce((sum: number, u: { costUsd: number }) => sum + u.costUsd, 0);

  // Broadcast real-time update
  broadcastTokenUsage(id, {
    newRecord: usageRecord,
    totalCostToday
  });

  // Check budget limits
  const budget = instance.user.dailyBudget || 0;
  if (budget > 0) {
    if (totalCostToday > budget) {
      await TelegramService.sendBudgetAlert(
        instance.user.telegramHandle || '',
        instance.name,
        totalCostToday,
        budget
      );
    }
    
    // Auto-pruning flag
    if (totalCostToday > budget * 0.8) {
       return { status: 'recorded', pruneRecommended: true };
    }
  }

  return { status: 'recorded', pruneRecommended: false };
});

fastify.post('/api/instances/:id/rotate-key', async (request, reply) => {
  const { id } = request.params as { id: string };
  try {
    const newKey = await DopplerMockService.rotateInstanceKey(id);
    // Real implementation would safely update and deploy the instance
    return { status: 'success', message: 'API Key rotated securely' };
  } catch (err) {
    return reply.status(500).send({ error: 'Failed to rotate API Key' });
  }
});

const start = async () => {
  try {
    const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
    
    // Initialize Socket.io attached to the fastify server
    initSocket(fastify.server);
    
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
