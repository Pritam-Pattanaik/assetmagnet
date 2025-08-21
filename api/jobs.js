// Jobs API endpoint for Vercel
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const jobs = await prisma.job.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(jobs);
    }

    if (req.method === 'POST') {
      const job = await prisma.job.create({
        data: req.body
      });
      return res.status(201).json(job);
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      const job = await prisma.job.update({
        where: { id },
        data: req.body
      });
      return res.status(200).json(job);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await prisma.job.delete({
        where: { id }
      });
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Jobs API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to process request'
    });
  } finally {
    await prisma.$disconnect();
  }
}
