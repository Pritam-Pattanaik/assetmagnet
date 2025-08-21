// Users API endpoint for Vercel
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
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(users);
    }

    if (req.method === 'POST') {
      const user = await prisma.user.create({
        data: req.body
      });
      // Don't return password in response
      const { password, ...userResponse } = user;
      return res.status(201).json(userResponse);
    }

    if (req.method === 'PUT') {
      const { id } = req.query;
      const user = await prisma.user.update({
        where: { id },
        data: req.body
      });
      // Don't return password in response
      const { password, ...userResponse } = user;
      return res.status(200).json(userResponse);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await prisma.user.delete({
        where: { id }
      });
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Users API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Failed to process request'
    });
  } finally {
    await prisma.$disconnect();
  }
}
