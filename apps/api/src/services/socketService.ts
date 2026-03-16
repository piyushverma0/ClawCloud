import { Server as SocketIOServer } from 'socket.io';
import { FastifyInstance } from 'fastify';

let io: SocketIOServer;

export const initSocket = (server: any) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*', // In production, restrict to frontend URL
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Socket client connected: ${socket.id}`);

    socket.on('join_instance', (instanceId) => {
      socket.join(`instance_${instanceId}`);
      console.log(`Socket ${socket.id} joined room instance_${instanceId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const broadcastTokenUsage = (instanceId: string, usageData: any) => {
  if (io) {
    io.to(`instance_${instanceId}`).emit('token_usage_update', usageData);
  }
};
