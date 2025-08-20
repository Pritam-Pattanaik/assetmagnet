// API endpoints for services CRUD operations
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Types for API requests/responses
export interface CreateServiceRequest {
  title: string;
  shortDescription: string;
  description: string;
  icon?: string;
  features: string[];
  category: string;
  status: 'active' | 'inactive' | 'draft';
  price: {
    basic: number;
    premium: number;
    enterprise: number;
  };
  popularity?: number;
  clients?: number;
  rating?: number;
}

export interface ServiceResponse {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  category: string;
  status: 'active' | 'inactive' | 'draft';
  price: {
    basic: number;
    premium: number;
    enterprise: number;
  };
  popularity: number;
  clients: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// Helper functions to convert between database and API formats
function convertServiceToResponse(service: any): ServiceResponse {
  return {
    id: service.id,
    title: service.title,
    shortDescription: service.shortDescription,
    description: service.description,
    icon: service.icon || '🛠️',
    features: service.features,
    category: service.category,
    status: service.status.toLowerCase() as 'active' | 'inactive' | 'draft',
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

function convertRequestToDatabase(request: CreateServiceRequest) {
  return {
    title: request.title,
    shortDescription: request.shortDescription,
    description: request.description,
    icon: request.icon || '🛠️',
    features: request.features,
    category: request.category,
    status: request.status.toUpperCase() as 'ACTIVE' | 'INACTIVE' | 'DRAFT',
    basicPrice: request.price.basic,
    premiumPrice: request.price.premium,
    enterprisePrice: request.price.enterprise,
    popularity: request.popularity || 0,
    clients: request.clients || 0,
    rating: request.rating || 0
  };
}

// API handlers
export const servicesAPI = {
  // GET /api/services
  async getAll(): Promise<ServiceResponse[]> {
    try {
      const services = await prisma.service.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return services.map(convertServiceToResponse);
    } catch (error) {
      console.error('Error fetching services:', error);
      throw new Error('Failed to fetch services');
    }
  },

  // GET /api/services/:id
  async getById(id: string): Promise<ServiceResponse | null> {
    try {
      const service = await prisma.service.findUnique({
        where: { id }
      });
      return service ? convertServiceToResponse(service) : null;
    } catch (error) {
      console.error('Error fetching service:', error);
      throw new Error('Failed to fetch service');
    }
  },

  // POST /api/services
  async create(data: CreateServiceRequest): Promise<ServiceResponse> {
    try {
      const dbData = convertRequestToDatabase(data);
      const service = await prisma.service.create({
        data: dbData
      });
      return convertServiceToResponse(service);
    } catch (error) {
      console.error('Error creating service:', error);
      throw new Error('Failed to create service');
    }
  },

  // PUT /api/services/:id
  async update(id: string, data: Partial<CreateServiceRequest>): Promise<ServiceResponse> {
    try {
      const dbData = convertRequestToDatabase(data as CreateServiceRequest);
      const service = await prisma.service.update({
        where: { id },
        data: dbData
      });
      return convertServiceToResponse(service);
    } catch (error) {
      console.error('Error updating service:', error);
      throw new Error('Failed to update service');
    }
  },

  // DELETE /api/services/:id
  async delete(id: string): Promise<boolean> {
    try {
      await prisma.service.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw new Error('Failed to delete service');
    }
  }
};

// Initialize default data
export async function initializeDefaultData() {
  try {
    const servicesCount = await prisma.service.count();
    
    if (servicesCount === 0) {
      const defaultServices = [
        {
          title: 'AI Consulting',
          shortDescription: 'Expert AI strategy and implementation guidance for businesses',
          description: 'Comprehensive AI strategy and implementation consulting for businesses looking to leverage artificial intelligence. Our expert consultants help you identify opportunities, assess technology requirements, and develop implementation roadmaps.',
          icon: '🤖',
          features: ['AI Strategy Development', 'Technology Assessment', 'Implementation Planning', 'ROI Analysis'],
          category: 'Consulting',
          status: 'ACTIVE' as const,
          basicPrice: 5000,
          premiumPrice: 15000,
          enterprisePrice: 50000,
          popularity: 95,
          clients: 150,
          rating: 4.8
        },
        {
          title: 'Machine Learning Development',
          shortDescription: 'Custom ML models and algorithms for your business needs',
          description: 'Custom machine learning models and algorithms tailored to your specific business needs. From data preprocessing to model deployment, we handle the entire ML development lifecycle.',
          icon: '🧠',
          features: ['Custom ML Models', 'Data Pipeline Setup', 'Model Training', 'Performance Optimization'],
          category: 'Development',
          status: 'ACTIVE' as const,
          basicPrice: 10000,
          premiumPrice: 25000,
          enterprisePrice: 75000,
          popularity: 88,
          clients: 120,
          rating: 4.7
        },
        {
          title: 'AI Training Programs',
          shortDescription: 'Comprehensive training to upskill your team in AI technologies',
          description: 'Comprehensive training programs to upskill your team in AI and machine learning technologies. Our expert instructors provide hands-on learning experiences with real-world applications.',
          icon: '🎓',
          features: ['Hands-on Workshops', 'Certification Programs', 'Custom Curriculum', 'Expert Instructors'],
          category: 'Training',
          status: 'ACTIVE' as const,
          basicPrice: 2500,
          premiumPrice: 7500,
          enterprisePrice: 20000,
          popularity: 92,
          clients: 200,
          rating: 4.9
        }
      ];

      for (const service of defaultServices) {
        await prisma.service.create({ data: service });
      }
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
}
