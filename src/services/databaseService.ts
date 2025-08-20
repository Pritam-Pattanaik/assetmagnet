// Mock Database Service
// In a real application, this would connect to a real database like PostgreSQL, MongoDB, etc.
// For this demo, we'll use localStorage to simulate database persistence

interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
  price: {
    basic: number;
    premium: number;
    enterprise: number;
  };
  category: string;
  status: 'active' | 'inactive' | 'draft';
  popularity: number;
  clients: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  reply?: string;
  repliedAt?: string;
  repliedBy?: string;
}

interface ContactInfo {
  id: string;
  type: 'address' | 'phone' | 'email' | 'hours';
  title: string;
  value: string;
  icon: string;
  isActive: boolean;
  order: number;
}

interface GlobalOffice {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  timezone: string;
  isHeadquarters: boolean;
  isActive: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  workingHours: string;
  createdAt: string;
  updatedAt: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

class DatabaseService {
  private readonly SERVICES_KEY = 'assetmagnets_services';
  private readonly CONTACT_MESSAGES_KEY = 'assetmagnets_contact_messages';
  private readonly CONTACT_INFO_KEY = 'assetmagnets_contact_info';
  private readonly GLOBAL_OFFICES_KEY = 'assetmagnets_global_offices';
  private readonly FAQ_KEY = 'assetmagnets_faq';

  // Services CRUD Operations
  async getServices(): Promise<Service[]> {
    try {
      const data = localStorage.getItem(this.SERVICES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }

  async createService(service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    try {
      const services = await this.getServices();
      const newService: Service = {
        ...service,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      services.push(newService);
      localStorage.setItem(this.SERVICES_KEY, JSON.stringify(services));
      
      return newService;
    } catch (error) {
      console.error('Error creating service:', error);
      throw new Error('Failed to create service');
    }
  }

  async updateService(id: string, updates: Partial<Service>): Promise<Service> {
    try {
      const services = await this.getServices();
      const index = services.findIndex(service => service.id === id);
      
      if (index === -1) {
        throw new Error('Service not found');
      }
      
      const updatedService = {
        ...services[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      services[index] = updatedService;
      localStorage.setItem(this.SERVICES_KEY, JSON.stringify(services));
      
      return updatedService;
    } catch (error) {
      console.error('Error updating service:', error);
      throw new Error('Failed to update service');
    }
  }

  async deleteService(id: string): Promise<boolean> {
    try {
      const services = await this.getServices();
      const filteredServices = services.filter(service => service.id !== id);
      
      localStorage.setItem(this.SERVICES_KEY, JSON.stringify(filteredServices));
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw new Error('Failed to delete service');
    }
  }

  // Contact Messages CRUD Operations
  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const data = localStorage.getItem(this.CONTACT_MESSAGES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      return [];
    }
  }

  async createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactMessage> {
    try {
      const messages = await this.getContactMessages();
      const newMessage: ContactMessage = {
        ...message,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      messages.unshift(newMessage); // Add to beginning for newest first
      localStorage.setItem(this.CONTACT_MESSAGES_KEY, JSON.stringify(messages));
      
      return newMessage;
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw new Error('Failed to create contact message');
    }
  }

  async updateContactMessage(id: string, updates: Partial<ContactMessage>): Promise<ContactMessage> {
    try {
      const messages = await this.getContactMessages();
      const index = messages.findIndex(message => message.id === id);
      
      if (index === -1) {
        throw new Error('Contact message not found');
      }
      
      const updatedMessage = {
        ...messages[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      messages[index] = updatedMessage;
      localStorage.setItem(this.CONTACT_MESSAGES_KEY, JSON.stringify(messages));
      
      return updatedMessage;
    } catch (error) {
      console.error('Error updating contact message:', error);
      throw new Error('Failed to update contact message');
    }
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    try {
      const messages = await this.getContactMessages();
      const filteredMessages = messages.filter(message => message.id !== id);
      
      localStorage.setItem(this.CONTACT_MESSAGES_KEY, JSON.stringify(filteredMessages));
      return true;
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw new Error('Failed to delete contact message');
    }
  }

  // Contact Info CRUD Operations
  async getContactInfo(): Promise<ContactInfo[]> {
    try {
      const data = localStorage.getItem(this.CONTACT_INFO_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching contact info:', error);
      return [];
    }
  }

  async createContactInfo(info: Omit<ContactInfo, 'id'>): Promise<ContactInfo> {
    try {
      const contactInfos = await this.getContactInfo();
      const newContactInfo: ContactInfo = {
        ...info,
        id: Date.now().toString()
      };
      
      contactInfos.push(newContactInfo);
      // Sort by order
      contactInfos.sort((a, b) => a.order - b.order);
      localStorage.setItem(this.CONTACT_INFO_KEY, JSON.stringify(contactInfos));
      
      return newContactInfo;
    } catch (error) {
      console.error('Error creating contact info:', error);
      throw new Error('Failed to create contact info');
    }
  }

  async updateContactInfo(id: string, updates: Partial<ContactInfo>): Promise<ContactInfo> {
    try {
      const contactInfos = await this.getContactInfo();
      const index = contactInfos.findIndex(info => info.id === id);
      
      if (index === -1) {
        throw new Error('Contact info not found');
      }
      
      const updatedContactInfo = {
        ...contactInfos[index],
        ...updates
      };
      
      contactInfos[index] = updatedContactInfo;
      // Sort by order
      contactInfos.sort((a, b) => a.order - b.order);
      localStorage.setItem(this.CONTACT_INFO_KEY, JSON.stringify(contactInfos));
      
      return updatedContactInfo;
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw new Error('Failed to update contact info');
    }
  }

  async deleteContactInfo(id: string): Promise<boolean> {
    try {
      const contactInfos = await this.getContactInfo();
      const filteredContactInfos = contactInfos.filter(info => info.id !== id);

      localStorage.setItem(this.CONTACT_INFO_KEY, JSON.stringify(filteredContactInfos));
      return true;
    } catch (error) {
      console.error('Error deleting contact info:', error);
      throw new Error('Failed to delete contact info');
    }
  }

  // Global Offices CRUD Operations
  async getGlobalOffices(): Promise<GlobalOffice[]> {
    try {
      const data = localStorage.getItem(this.GLOBAL_OFFICES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching global offices:', error);
      return [];
    }
  }

  async createGlobalOffice(office: Omit<GlobalOffice, 'id' | 'createdAt' | 'updatedAt'>): Promise<GlobalOffice> {
    try {
      const offices = await this.getGlobalOffices();
      const newOffice: GlobalOffice = {
        ...office,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      offices.push(newOffice);
      localStorage.setItem(this.GLOBAL_OFFICES_KEY, JSON.stringify(offices));

      return newOffice;
    } catch (error) {
      console.error('Error creating global office:', error);
      throw new Error('Failed to create global office');
    }
  }

  async updateGlobalOffice(id: string, updates: Partial<GlobalOffice>): Promise<GlobalOffice> {
    try {
      const offices = await this.getGlobalOffices();
      const index = offices.findIndex(office => office.id === id);

      if (index === -1) {
        throw new Error('Global office not found');
      }

      const updatedOffice = {
        ...offices[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      offices[index] = updatedOffice;
      localStorage.setItem(this.GLOBAL_OFFICES_KEY, JSON.stringify(offices));

      return updatedOffice;
    } catch (error) {
      console.error('Error updating global office:', error);
      throw new Error('Failed to update global office');
    }
  }

  async deleteGlobalOffice(id: string): Promise<boolean> {
    try {
      const offices = await this.getGlobalOffices();
      const filteredOffices = offices.filter(office => office.id !== id);

      localStorage.setItem(this.GLOBAL_OFFICES_KEY, JSON.stringify(filteredOffices));
      return true;
    } catch (error) {
      console.error('Error deleting global office:', error);
      throw new Error('Failed to delete global office');
    }
  }

  // FAQ CRUD Operations
  async getFAQs(): Promise<FAQ[]> {
    try {
      const data = localStorage.getItem(this.FAQ_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
  }

  async createFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> {
    try {
      const faqs = await this.getFAQs();
      const newFAQ: FAQ = {
        ...faq,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      faqs.push(newFAQ);
      // Sort by order
      faqs.sort((a, b) => a.order - b.order);
      localStorage.setItem(this.FAQ_KEY, JSON.stringify(faqs));

      return newFAQ;
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw new Error('Failed to create FAQ');
    }
  }

  async updateFAQ(id: string, updates: Partial<FAQ>): Promise<FAQ> {
    try {
      const faqs = await this.getFAQs();
      const index = faqs.findIndex(faq => faq.id === id);

      if (index === -1) {
        throw new Error('FAQ not found');
      }

      const updatedFAQ = {
        ...faqs[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      faqs[index] = updatedFAQ;
      // Sort by order
      faqs.sort((a, b) => a.order - b.order);
      localStorage.setItem(this.FAQ_KEY, JSON.stringify(faqs));

      return updatedFAQ;
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw new Error('Failed to update FAQ');
    }
  }

  async deleteFAQ(id: string): Promise<boolean> {
    try {
      const faqs = await this.getFAQs();
      const filteredFAQs = faqs.filter(faq => faq.id !== id);

      localStorage.setItem(this.FAQ_KEY, JSON.stringify(filteredFAQs));
      return true;
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw new Error('Failed to delete FAQ');
    }
  }

  // Initialize with default data if empty
  async initializeDefaultData(): Promise<void> {
    try {
      // Initialize services if empty
      const services = await this.getServices();
      if (services.length === 0) {
        const defaultServices = [
          {
            title: 'AI Consulting',
            description: 'Comprehensive AI strategy and implementation consulting for businesses looking to leverage artificial intelligence.',
            shortDescription: 'Expert AI strategy and implementation guidance',
            icon: '🤖',
            features: ['AI Strategy Development', 'Technology Assessment', 'Implementation Planning', 'ROI Analysis'],
            price: { basic: 5000, premium: 15000, enterprise: 50000 },
            category: 'Consulting',
            status: 'active' as const,
            popularity: 95,
            clients: 150,
            rating: 4.8
          }
        ];

        for (const service of defaultServices) {
          await this.createService(service);
        }
      }

      // Initialize contact info if empty
      const contactInfo = await this.getContactInfo();
      if (contactInfo.length === 0) {
        const defaultContactInfo = [
          {
            type: 'address' as const,
            title: 'Office Address',
            value: '123 AI Street, Tech Valley, CA 94000',
            icon: '📍',
            isActive: true,
            order: 1
          },
          {
            type: 'phone' as const,
            title: 'Phone Number',
            value: '+1 (555) 123-ASSET',
            icon: '📞',
            isActive: true,
            order: 2
          },
          {
            type: 'email' as const,
            title: 'Email Address',
            value: 'contact@assetmagnets.com',
            icon: '✉️',
            isActive: true,
            order: 3
          },
          {
            type: 'hours' as const,
            title: 'Business Hours',
            value: 'Mon-Fri: 9:00 AM - 6:00 PM PST',
            icon: '🕒',
            isActive: true,
            order: 4
          }
        ];

        for (const info of defaultContactInfo) {
          await this.createContactInfo(info);
        }
      }

      // Initialize global offices if empty
      const globalOffices = await this.getGlobalOffices();
      if (globalOffices.length === 0) {
        const defaultOffices = [
          {
            name: 'Headquarters - Silicon Valley',
            address: '123 AI Street, Tech Valley',
            city: 'San Francisco',
            country: 'United States',
            phone: '+1 (555) 123-ASSET',
            email: 'hq@assetmagnets.com',
            timezone: 'PST (UTC-8)',
            isHeadquarters: true,
            isActive: true,
            coordinates: { lat: 37.7749, lng: -122.4194 },
            workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM PST'
          },
          {
            name: 'European Office - London',
            address: '456 Innovation Lane, Tech District',
            city: 'London',
            country: 'United Kingdom',
            phone: '+44 20 7946 0958',
            email: 'europe@assetmagnets.com',
            timezone: 'GMT (UTC+0)',
            isHeadquarters: false,
            isActive: true,
            coordinates: { lat: 51.5074, lng: -0.1278 },
            workingHours: 'Mon-Fri: 9:00 AM - 5:00 PM GMT'
          },
          {
            name: 'Asia Pacific - Singapore',
            address: '789 Digital Hub, Marina Bay',
            city: 'Singapore',
            country: 'Singapore',
            phone: '+65 6123 4567',
            email: 'apac@assetmagnets.com',
            timezone: 'SGT (UTC+8)',
            isHeadquarters: false,
            isActive: true,
            coordinates: { lat: 1.3521, lng: 103.8198 },
            workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM SGT'
          }
        ];

        for (const office of defaultOffices) {
          await this.createGlobalOffice(office);
        }
      }

      // Initialize FAQs if empty
      const faqs = await this.getFAQs();
      if (faqs.length === 0) {
        const defaultFAQs = [
          {
            question: 'What AI services does ASSETMAGNETS offer?',
            answer: 'We offer comprehensive AI solutions including AI consulting, machine learning implementation, natural language processing, computer vision, predictive analytics, and custom AI model development tailored to your business needs.',
            category: 'Services',
            order: 1,
            isActive: true,
            tags: ['AI', 'services', 'consulting', 'machine learning']
          },
          {
            question: 'How long does an AI implementation project typically take?',
            answer: 'Project timelines vary based on complexity and scope. Simple AI integrations can take 2-4 weeks, while comprehensive enterprise solutions may require 3-6 months. We provide detailed timelines during our initial consultation.',
            category: 'Timeline',
            order: 2,
            isActive: true,
            tags: ['timeline', 'implementation', 'project']
          },
          {
            question: 'Do you provide training for our team?',
            answer: 'Yes! We offer comprehensive training programs including AI fundamentals, hands-on workshops, certification courses, and ongoing support to ensure your team can effectively use and maintain AI solutions.',
            category: 'Training',
            order: 3,
            isActive: true,
            tags: ['training', 'education', 'team', 'support']
          },
          {
            question: 'What industries do you serve?',
            answer: 'We serve various industries including healthcare, finance, retail, manufacturing, technology, education, and more. Our AI solutions are customized to meet specific industry requirements and compliance standards.',
            category: 'Industries',
            order: 4,
            isActive: true,
            tags: ['industries', 'healthcare', 'finance', 'retail']
          },
          {
            question: 'How do you ensure data security and privacy?',
            answer: 'We implement enterprise-grade security measures including data encryption, secure cloud infrastructure, compliance with GDPR/CCPA, regular security audits, and strict access controls to protect your sensitive data.',
            category: 'Security',
            order: 5,
            isActive: true,
            tags: ['security', 'privacy', 'GDPR', 'compliance']
          }
        ];

        for (const faq of defaultFAQs) {
          await this.createFAQ(faq);
        }
      }
    } catch (error) {
      console.error('Error initializing default data:', error);
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();
export type { Service, ContactMessage, ContactInfo, GlobalOffice, FAQ };
