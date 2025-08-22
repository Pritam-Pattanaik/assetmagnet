// Login API endpoint for Vercel
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Try to find user in database
    let user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    // If user not found, create demo users for testing
    if (!user) {
      console.log('User not found, creating demo users...');
      
      // Create demo users if they don't exist
      const demoUsers = [
        {
          name: 'Admin User',
          email: 'admin@assetmagnets.com',
          password: await bcrypt.hash('admin123', 10),
          role: 'ADMIN'
        },
        {
          name: 'John Doe',
          email: 'john@example.com',
          password: await bcrypt.hash('password123', 10),
          role: 'STUDENT'
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          password: await bcrypt.hash('password123', 10),
          role: 'INSTRUCTOR'
        }
      ];

      // Create demo users
      for (const demoUser of demoUsers) {
        try {
          await prisma.user.upsert({
            where: { email: demoUser.email },
            update: {},
            create: demoUser
          });
        } catch (error) {
          console.log('Demo user already exists:', demoUser.email);
        }
      }

      // Try to find user again
      user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });
    }

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );

    // Remove password from response
    const { password: _, ...userResponse } = user;

    // Convert role to lowercase for frontend compatibility
    userResponse.role = user.role.toLowerCase();

    return res.status(200).json({
      user: userResponse,
      token
    });

  } catch (error) {
    console.error('Login API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Login failed'
    });
  } finally {
    await prisma.$disconnect();
  }
}
