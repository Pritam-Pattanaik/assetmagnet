// Vercel API route - Main API handler
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true'
};

// Helper function to handle CORS
function handleCors(req, res) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

// Main handler function for Vercel
export default async function handler(req, res) {
  // Handle CORS
  if (handleCors(req, res)) return;

  const { method, url } = req;
  const path = url.replace('/api', '');

  try {
    // Route handling
    if (path === '/health' && method === 'GET') {
      return res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production'
      });
    }

    // Services endpoints
    if (path === '/services' && method === 'GET') {
      const services = await prisma.service.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(services);
    }

    if (path === '/services' && method === 'POST') {
      const service = await prisma.service.create({
        data: req.body
      });
      return res.status(201).json(service);
    }

    // Contact Info endpoints
    if (path === '/contact-info' && method === 'GET') {
      const contactInfo = await prisma.contactInfo.findMany({
        orderBy: { order: 'asc' }
      });
      return res.status(200).json(contactInfo);
    }

    // Global Offices endpoints
    if (path === '/global-offices' && method === 'GET') {
      const offices = await prisma.globalOffice.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(offices);
    }

    // FAQs endpoints
    if (path === '/faqs' && method === 'GET') {
      const faqs = await prisma.fAQ.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
      });
      return res.status(200).json(faqs);
    }

    // Users endpoints
    if (path === '/users' && method === 'GET') {
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

    // Courses endpoints
    if (path === '/courses' && method === 'GET') {
      const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(courses);
    }

    // Jobs endpoints
    if (path === '/jobs' && method === 'GET') {
      const jobs = await prisma.job.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(jobs);
    }

    // Contact Messages endpoints
    if (path === '/contact-messages' && method === 'POST') {
      const message = await prisma.contactMessage.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          subject: req.body.subject,
          message: req.body.message,
          status: 'NEW',
          priority: 'MEDIUM'
        }
      });
      return res.status(201).json(message);
    }

    // 404 handler
    return res.status(404).json({ error: 'API endpoint not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  } finally {
    await prisma.$disconnect();
  }
}
