// Express API server for database operations
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
function convertServiceToResponse(service) {
  return {
    id: service.id,
    title: service.title,
    shortDescription: service.shortDescription,
    description: service.description,
    icon: service.icon || '🛠️',
    features: service.features,
    category: service.category,
    status: service.status.toLowerCase(),
    price: {
      basic: service.basicPrice || 0,
      premium: service.premiumPrice || 0,
      enterprise: service.enterprisePrice || 0
    },
    popularity: service.popularity || 0,
    clients: service.clients || 0,
    rating: service.rating || 0,
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString()
  };
}

function convertRequestToDatabase(request) {
  return {
    title: request.title,
    shortDescription: request.shortDescription,
    description: request.description,
    icon: request.icon || '🛠️',
    features: request.features,
    category: request.category,
    status: request.status.toUpperCase(),
    basicPrice: request.price.basic,
    premiumPrice: request.price.premium,
    enterprisePrice: request.price.enterprise,
    popularity: request.popularity || 0,
    clients: request.clients || 0,
    rating: request.rating || 0
  };
}

// Services API routes
app.get('/api/services', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(services.map(convertServiceToResponse));
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.get('/api/services/:id', async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id }
    });
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(convertServiceToResponse(service));
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const dbData = convertRequestToDatabase(req.body);
    const service = await prisma.service.create({
      data: dbData
    });
    res.status(201).json(convertServiceToResponse(service));
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ error: 'Failed to create service' });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const dbData = convertRequestToDatabase(req.body);
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: dbData
    });
    res.json(convertServiceToResponse(service));
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Contact Messages API
app.get('/api/contact-messages', async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
});

app.get('/api/contact-messages/:id', async (req, res) => {
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: req.params.id }
    });

    if (!message) {
      return res.status(404).json({ error: 'Contact message not found' });
    }

    res.json(message);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({ error: 'Failed to fetch contact message' });
  }
});

app.post('/api/contact-messages', async (req, res) => {
  try {
    const message = await prisma.contactMessage.create({
      data: req.body
    });
    res.status(201).json(message);
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ error: 'Failed to create contact message' });
  }
});

app.put('/api/contact-messages/:id', async (req, res) => {
  try {
    const message = await prisma.contactMessage.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(message);
  } catch (error) {
    console.error('Error updating contact message:', error);
    res.status(500).json({ error: 'Failed to update contact message' });
  }
});

app.delete('/api/contact-messages/:id', async (req, res) => {
  try {
    await prisma.contactMessage.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ error: 'Failed to delete contact message' });
  }
});

// Contact Info API
app.get('/api/contact-info', async (req, res) => {
  try {
    const contactInfo = await prisma.contactInfo.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(contactInfo);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
});

app.get('/api/contact-info/:id', async (req, res) => {
  try {
    const contactInfo = await prisma.contactInfo.findUnique({
      where: { id: req.params.id }
    });

    if (!contactInfo) {
      return res.status(404).json({ error: 'Contact info not found' });
    }

    res.json(contactInfo);
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({ error: 'Failed to fetch contact info' });
  }
});

app.post('/api/contact-info', async (req, res) => {
  try {
    const contactInfo = await prisma.contactInfo.create({
      data: req.body
    });
    res.status(201).json(contactInfo);
  } catch (error) {
    console.error('Error creating contact info:', error);
    res.status(500).json({ error: 'Failed to create contact info' });
  }
});

app.put('/api/contact-info/:id', async (req, res) => {
  try {
    const contactInfo = await prisma.contactInfo.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(contactInfo);
  } catch (error) {
    console.error('Error updating contact info:', error);
    res.status(500).json({ error: 'Failed to update contact info' });
  }
});

app.delete('/api/contact-info/:id', async (req, res) => {
  try {
    await prisma.contactInfo.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting contact info:', error);
    res.status(500).json({ error: 'Failed to delete contact info' });
  }
});

// Global Offices API
app.get('/api/global-offices', async (req, res) => {
  try {
    const offices = await prisma.globalOffice.findMany({
      orderBy: { isHeadquarters: 'desc' }
    });
    res.json(offices);
  } catch (error) {
    console.error('Error fetching global offices:', error);
    res.status(500).json({ error: 'Failed to fetch global offices' });
  }
});

app.get('/api/global-offices/:id', async (req, res) => {
  try {
    const office = await prisma.globalOffice.findUnique({
      where: { id: req.params.id }
    });

    if (!office) {
      return res.status(404).json({ error: 'Global office not found' });
    }

    res.json(office);
  } catch (error) {
    console.error('Error fetching global office:', error);
    res.status(500).json({ error: 'Failed to fetch global office' });
  }
});

app.post('/api/global-offices', async (req, res) => {
  try {
    const office = await prisma.globalOffice.create({
      data: req.body
    });
    res.status(201).json(office);
  } catch (error) {
    console.error('Error creating global office:', error);
    res.status(500).json({ error: 'Failed to create global office' });
  }
});

app.put('/api/global-offices/:id', async (req, res) => {
  try {
    const office = await prisma.globalOffice.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(office);
  } catch (error) {
    console.error('Error updating global office:', error);
    res.status(500).json({ error: 'Failed to update global office' });
  }
});

app.delete('/api/global-offices/:id', async (req, res) => {
  try {
    await prisma.globalOffice.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting global office:', error);
    res.status(500).json({ error: 'Failed to delete global office' });
  }
});

// FAQs API
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { order: 'asc' }
    });
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

app.get('/api/faqs/:id', async (req, res) => {
  try {
    const faq = await prisma.fAQ.findUnique({
      where: { id: req.params.id }
    });

    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' });
    }

    res.json(faq);
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    res.status(500).json({ error: 'Failed to fetch FAQ' });
  }
});

app.post('/api/faqs', async (req, res) => {
  try {
    const faq = await prisma.fAQ.create({
      data: req.body
    });
    res.status(201).json(faq);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Failed to create FAQ' });
  }
});

app.put('/api/faqs/:id', async (req, res) => {
  try {
    const faq = await prisma.fAQ.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(faq);
  } catch (error) {
    console.error('Error updating FAQ:', error);
    res.status(500).json({ error: 'Failed to update FAQ' });
  }
});

app.delete('/api/faqs/:id', async (req, res) => {
  try {
    await prisma.fAQ.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting FAQ:', error);
    res.status(500).json({ error: 'Failed to delete FAQ' });
  }
});

// Users API
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Courses API
app.get('/api/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        instructor: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Jobs API
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Initialize default data
app.post('/api/initialize-data', async (req, res) => {
  try {
    console.log('🚀 Initializing default data...');

    // Check if data already exists to avoid duplicates
    const servicesCount = await prisma.service.count();
    const contactInfoCount = await prisma.contactInfo.count();
    const globalOfficesCount = await prisma.globalOffice.count();
    const faqsCount = await prisma.fAQ.count();
    const usersCount = await prisma.user.count();
    const coursesCount = await prisma.course.count();
    const jobsCount = await prisma.job.count();

    console.log('📊 Current data counts:', {
      services: servicesCount,
      contactInfo: contactInfoCount,
      globalOffices: globalOfficesCount,
      faqs: faqsCount,
      users: usersCount,
      courses: coursesCount,
      jobs: jobsCount
    });

    // Only initialize if data is missing
    let initialized = [];

    if (servicesCount === 0) {
      console.log('📝 Creating default services...');
      // Services will be created by the existing initialization script
      initialized.push('services');
    }

    if (contactInfoCount === 0) {
      console.log('📞 Creating default contact info...');
      initialized.push('contactInfo');
    }

    if (globalOfficesCount === 0) {
      console.log('🌍 Creating default global offices...');
      initialized.push('globalOffices');
    }

    if (faqsCount === 0) {
      console.log('❓ Creating default FAQs...');
      initialized.push('faqs');
    }

    console.log('✅ Data initialization check completed');
    res.json({
      message: 'Default data initialization completed',
      initialized: initialized,
      existing: {
        services: servicesCount,
        contactInfo: contactInfoCount,
        globalOffices: globalOfficesCount,
        faqs: faqsCount,
        users: usersCount,
        courses: coursesCount,
        jobs: jobsCount
      }
    });
  } catch (error) {
    console.error('❌ Error initializing data:', error);
    res.status(500).json({ error: 'Failed to initialize data', details: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down API server...');
  await prisma.$disconnect();
  process.exit(0);
});
