import Fastify from 'fastify';
import dotenv from 'dotenv';
import { prisma } from '@clawcloud/db';
import { DopplerMockService } from './services/apiKeyService';

dotenv.config();

const fastify = Fastify({
  logger: true
});

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
  const { tokensUsed, cost } = request.body as { tokensUsed: number; cost: number };
  
  // Here we would validate the instance exists and add usage
  return { status: 'recorded' };
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
    await fastify.listen({ port, host: '0.0.0.0' });
    console.log(\`Server listening at http://localhost:\${port}\`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
