'use client';

import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CostChartProps {
  instanceId: string;
  initialData?: any[];
}

export function CostChart({ instanceId, initialData = [] }: CostChartProps) {
  const [data, setData] = useState(initialData.length > 0 ? initialData : [
    { time: '00:00', cost: 0.00 },
    { time: '04:00', cost: 0.12 },
    { time: '08:00', cost: 0.45 },
    { time: '12:00', cost: 1.25 },
    { time: '16:00', cost: 1.80 }
  ]);
  const [totalCost, setTotalCost] = useState(1.80);

  useEffect(() => {
    // In production, use the actual API URL
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    
    // Connect to Socket.io server
    const socket: Socket = io(API_URL);

    socket.on('connect', () => {
      console.log('Connected to Cost Monitor socket');
      socket.emit('join_instance', instanceId);
    });

    socket.on('token_usage_update', (update: any) => {
      console.log('Live token usage update received:', update);
      
      const { newRecord, totalCostToday } = update;
      
      // Update Total Cost
      setTotalCost(totalCostToday);
      
      // Update Chart Data
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setData((prev) => {
        const newData = [...prev, { time: timeStr, cost: totalCostToday }];
        if (newData.length > 20) newData.shift(); // Keep last 20 ticks
        return newData;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [instanceId]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white">Live Cost (Today)</h3>
        <span className="text-2xl font-bold text-emerald-400">
          ${totalCost.toFixed(4)}
        </span>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="time" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
              itemStyle={{ color: '#34d399' }}
            />
            <Line 
              type="monotone" 
              dataKey="cost" 
              stroke="#34d399" 
              strokeWidth={3}
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
