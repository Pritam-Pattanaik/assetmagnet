// Database service using Prisma for PostgreSQL
import { prismaService } from './prismaService';
import type {
  Service,
  ContactMessage,
  ContactInfo,
  GlobalOffice,
  FAQ,
  ContactStatus,
  ContactPriority,
  ContactType,
  CreateService,
  CreateContactMessage,
  CreateContactInfo,
  CreateGlobalOffice,
  CreateFAQ
} from './prismaService';

// Legacy type mappings for backward compatibility
type LegacyContactMessage = Omit<ContactMessage, 'status' | 'priority'> & {
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
};

type LegacyContactInfo = Omit<ContactInfo, 'type'> & {
  type: 'address' | 'phone' | 'email' | 'hours';
};

type LegacyGlobalOffice = Omit<GlobalOffice, 'latitude' | 'longitude'> & {
  coordinates?: {
    lat: number;
    lng: number;
  };
};

// Legacy Service type for backward compatibility
type LegacyService = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
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
};

class DatabaseServicePrisma {
  // Helper methods to convert between legacy and Prisma types
  private convertServiceToPrisma(service: Partial<LegacyService>): Partial<CreateService> {
    return {
      title: service.title,
      shortDescription: service.shortDescription || '',
      description: service.description || '',
      icon: service.icon || '🛠️',
      features: service.features || [],
      category: service.category || '',
      status: service.status === 'active' ? 'ACTIVE' : service.status === 'inactive' ? 'INACTIVE' : 'DRAFT',
      basicPrice: service.price?.basic || 0,
      premiumPrice: service.price?.premium || 0,
      enterprisePrice: service.price?.enterprise || 0,
      popularity: service.popularity || 0,
      clients: service.clients || 0,
      rating: service.rating || 0
    };
  }

  private convertServiceFromPrisma(service: Service): LegacyService {
    return {
      id: service.id,
      title: service.title,
      description: service.description,
      shortDescription: service.shortDescription,
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

  private convertContactMessageFromPrisma(message: ContactMessage): LegacyContactMessage {
    return {
      ...message,
      status: message.status.toLowerCase() as 'new' | 'read' | 'replied' | 'archived',
      priority: message.priority.toLowerCase() as 'low' | 'medium' | 'high',
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    };
  }

  private convertContactInfoFromPrisma(info: ContactInfo): LegacyContactInfo {
    return {
      ...info,
      type: info.type.toLowerCase() as 'address' | 'phone' | 'email' | 'hours'
    };
  }

  private convertGlobalOfficeFromPrisma(office: GlobalOffice): LegacyGlobalOffice {
    return {
      ...office,
      coordinates: office.latitude && office.longitude ? {
        lat: office.latitude,
        lng: office.longitude
      } : undefined,
      createdAt: office.createdAt,
      updatedAt: office.updatedAt
    };
  }

  // Services CRUD Operations
  async getServices(): Promise<LegacyService[]> {
    try {
      const services = await prismaService.getServices();
      return services.map(service => this.convertServiceFromPrisma(service));
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }

  async createService(data: Omit<LegacyService, 'id' | 'createdAt' | 'updatedAt'>): Promise<LegacyService> {
    try {
      const prismaData = this.convertServiceToPrisma(data);
      const service = await prismaService.createService(prismaData as CreateService);
      return this.convertServiceFromPrisma(service);
    } catch (error) {
      console.error('Error creating service:', error);
      throw new Error('Failed to create service');
    }
  }

  async updateService(id: string, data: Partial<LegacyService>): Promise<LegacyService> {
    try {
      const prismaData = this.convertServiceToPrisma(data);
      const service = await prismaService.updateService(id, prismaData);
      return this.convertServiceFromPrisma(service);
    } catch (error) {
      console.error('Error updating service:', error);
      throw new Error('Failed to update service');
    }
  }

  async deleteService(id: string): Promise<boolean> {
    try {
      return await prismaService.deleteService(id);
    } catch (error) {
      console.error('Error deleting service:', error);
      throw new Error('Failed to delete service');
    }
  }

  // Contact Messages CRUD Operations
  async getContactMessages(): Promise<LegacyContactMessage[]> {
    try {
      const messages = await prismaService.getContactMessages();
      return messages.map(message => this.convertContactMessageFromPrisma(message));
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
  }

  async createContactMessage(data: Omit<LegacyContactMessage, 'id' | 'createdAt' | 'updatedAt'>): Promise<LegacyContactMessage> {
    try {
      const prismaData: CreateContactMessage = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
        status: data.status.toUpperCase() as ContactStatus,
        priority: data.priority.toUpperCase() as ContactPriority
      };
      const message = await prismaService.createContactMessage(prismaData);
      return this.convertContactMessageFromPrisma(message);
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw new Error('Failed to create contact message');
    }
  }

  async updateContactMessage(id: string, data: Partial<LegacyContactMessage>): Promise<LegacyContactMessage> {
    try {
      const prismaData: Partial<CreateContactMessage> = {};
      if (data.name) prismaData.name = data.name;
      if (data.email) prismaData.email = data.email;
      if (data.phone) prismaData.phone = data.phone;
      if (data.subject) prismaData.subject = data.subject;
      if (data.message) prismaData.message = data.message;
      if (data.status) prismaData.status = data.status.toUpperCase() as ContactStatus;
      if (data.priority) prismaData.priority = data.priority.toUpperCase() as ContactPriority;

      const message = await prismaService.updateContactMessage(id, prismaData);
      return this.convertContactMessageFromPrisma(message);
    } catch (error) {
      console.error('Error updating contact message:', error);
      throw new Error('Failed to update contact message');
    }
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    try {
      return await prismaService.deleteContactMessage(id);
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw new Error('Failed to delete contact message');
    }
  }

  // Contact Info CRUD Operations
  async getContactInfo(): Promise<LegacyContactInfo[]> {
    try {
      const contactInfo = await prismaService.getContactInfo();
      return contactInfo.map(info => this.convertContactInfoFromPrisma(info));
    } catch (error) {
      console.error('Error fetching contact info:', error);
      return [];
    }
  }

  async createContactInfo(data: Omit<LegacyContactInfo, 'id'>): Promise<LegacyContactInfo> {
    try {
      const prismaData: CreateContactInfo = {
        type: data.type.toUpperCase() as ContactType,
        title: data.title,
        value: data.value,
        icon: data.icon,
        isActive: data.isActive,
        order: data.order
      };
      const info = await prismaService.createContactInfo(prismaData);
      return this.convertContactInfoFromPrisma(info);
    } catch (error) {
      console.error('Error creating contact info:', error);
      throw new Error('Failed to create contact info');
    }
  }

  async updateContactInfo(id: string, data: Partial<LegacyContactInfo>): Promise<LegacyContactInfo> {
    try {
      const prismaData: Partial<CreateContactInfo> = {};
      if (data.type) prismaData.type = data.type.toUpperCase() as ContactType;
      if (data.title) prismaData.title = data.title;
      if (data.value) prismaData.value = data.value;
      if (data.icon) prismaData.icon = data.icon;
      if (data.isActive !== undefined) prismaData.isActive = data.isActive;
      if (data.order !== undefined) prismaData.order = data.order;

      const info = await prismaService.updateContactInfo(id, prismaData);
      return this.convertContactInfoFromPrisma(info);
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw new Error('Failed to update contact info');
    }
  }

  async deleteContactInfo(id: string): Promise<boolean> {
    try {
      return await prismaService.deleteContactInfo(id);
    } catch (error) {
      console.error('Error deleting contact info:', error);
      throw new Error('Failed to delete contact info');
    }
  }

  // Global Offices CRUD Operations
  async getGlobalOffices(): Promise<LegacyGlobalOffice[]> {
    try {
      const offices = await prismaService.getGlobalOffices();
      return offices.map(office => this.convertGlobalOfficeFromPrisma(office));
    } catch (error) {
      console.error('Error fetching global offices:', error);
      return [];
    }
  }

  async createGlobalOffice(data: Omit<LegacyGlobalOffice, 'id' | 'createdAt' | 'updatedAt'>): Promise<LegacyGlobalOffice> {
    try {
      const prismaData: CreateGlobalOffice = {
        name: data.name,
        address: data.address,
        city: data.city,
        country: data.country,
        phone: data.phone,
        email: data.email,
        timezone: data.timezone,
        isHeadquarters: data.isHeadquarters,
        isActive: data.isActive,
        latitude: data.coordinates?.lat ?? null,
        longitude: data.coordinates?.lng ?? null,
        workingHours: data.workingHours
      };
      const office = await prismaService.createGlobalOffice(prismaData);
      return this.convertGlobalOfficeFromPrisma(office);
    } catch (error) {
      console.error('Error creating global office:', error);
      throw new Error('Failed to create global office');
    }
  }

  async updateGlobalOffice(id: string, data: Partial<LegacyGlobalOffice>): Promise<LegacyGlobalOffice> {
    try {
      const prismaData: Partial<CreateGlobalOffice> = {};
      if (data.name) prismaData.name = data.name;
      if (data.address) prismaData.address = data.address;
      if (data.city) prismaData.city = data.city;
      if (data.country) prismaData.country = data.country;
      if (data.phone) prismaData.phone = data.phone;
      if (data.email) prismaData.email = data.email;
      if (data.timezone) prismaData.timezone = data.timezone;
      if (data.isHeadquarters !== undefined) prismaData.isHeadquarters = data.isHeadquarters;
      if (data.isActive !== undefined) prismaData.isActive = data.isActive;
      if (data.coordinates?.lat) prismaData.latitude = data.coordinates.lat;
      if (data.coordinates?.lng) prismaData.longitude = data.coordinates.lng;
      if (data.workingHours) prismaData.workingHours = data.workingHours;

      const office = await prismaService.updateGlobalOffice(id, prismaData);
      return this.convertGlobalOfficeFromPrisma(office);
    } catch (error) {
      console.error('Error updating global office:', error);
      throw new Error('Failed to update global office');
    }
  }

  async deleteGlobalOffice(id: string): Promise<boolean> {
    try {
      return await prismaService.deleteGlobalOffice(id);
    } catch (error) {
      console.error('Error deleting global office:', error);
      throw new Error('Failed to delete global office');
    }
  }

  // FAQ CRUD Operations
  async getFAQs(): Promise<FAQ[]> {
    try {
      return await prismaService.getFAQs();
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
  }

  async createFAQ(data: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> {
    try {
      return await prismaService.createFAQ(data);
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw new Error('Failed to create FAQ');
    }
  }

  async updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ> {
    try {
      return await prismaService.updateFAQ(id, data);
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw new Error('Failed to update FAQ');
    }
  }

  async deleteFAQ(id: string): Promise<boolean> {
    try {
      return await prismaService.deleteFAQ(id);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw new Error('Failed to delete FAQ');
    }
  }

  // Users CRUD Operations
  async getUsers(): Promise<any[]> {
    try {
      return await prismaService.getUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  // Courses CRUD Operations
  async getCourses(): Promise<any[]> {
    try {
      return await prismaService.getCourses();
    } catch (error) {
      console.error('Error fetching courses:', error);
      return [];
    }
  }

  // Jobs CRUD Operations
  async getJobs(): Promise<any[]> {
    try {
      return await prismaService.getJobs();
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  }

  // Initialize default data
  async initializeDefaultData(): Promise<void> {
    try {
      await prismaService.initializeDefaultData();
    } catch (error) {
      console.error('Error initializing default data:', error);
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseServicePrisma();

// Export types for backward compatibility
export type { 
  LegacyService as Service, 
  LegacyContactMessage as ContactMessage, 
  LegacyContactInfo as ContactInfo, 
  LegacyGlobalOffice as GlobalOffice, 
  FAQ 
};
