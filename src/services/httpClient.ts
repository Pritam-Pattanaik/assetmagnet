// HTTP client for API requests
import type { CreateServiceRequest, ServiceResponse } from '../api/services';

const API_BASE_URL = '/api';

class HttpClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorText = await response.text();
          if (errorText) {
            errorMessage += `: ${errorText}`;
          }
        } catch (e) {
          // If we can't read the error text, just use the status
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // If response is not JSON, return empty object for void responses
        return {} as T;
      }
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Services API methods
  async getServices(): Promise<ServiceResponse[]> {
    return this.request<ServiceResponse[]>('/services');
  }

  async getService(id: string): Promise<ServiceResponse> {
    return this.request<ServiceResponse>(`/services/${id}`);
  }

  async createService(data: CreateServiceRequest): Promise<ServiceResponse> {
    return this.request<ServiceResponse>('/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id: string, data: Partial<CreateServiceRequest>): Promise<ServiceResponse> {
    return this.request<ServiceResponse>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id: string): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Messages API methods
  async getContactMessages(): Promise<any[]> {
    return this.request<any[]>('/contact-messages');
  }

  async getContactMessage(id: string): Promise<any> {
    return this.request<any>(`/contact-messages/${id}`);
  }

  async createContactMessage(data: any): Promise<any> {
    return this.request<any>('/contact-messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContactMessage(id: string, data: any): Promise<any> {
    return this.request<any>(`/contact-messages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteContactMessage(id: string): Promise<void> {
    return this.request<void>(`/contact-messages/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact Info API methods
  async getContactInfo(): Promise<any[]> {
    return this.request<any[]>('/contact-info');
  }

  async getContactInfoById(id: string): Promise<any> {
    return this.request<any>(`/contact-info/${id}`);
  }

  async createContactInfo(data: any): Promise<any> {
    return this.request<any>('/contact-info', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateContactInfo(id: string, data: any): Promise<any> {
    return this.request<any>(`/contact-info/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteContactInfo(id: string): Promise<void> {
    return this.request<void>(`/contact-info/${id}`, {
      method: 'DELETE',
    });
  }

  // Global Offices API methods
  async getGlobalOffices(): Promise<any[]> {
    return this.request<any[]>('/global-offices');
  }

  async getGlobalOffice(id: string): Promise<any> {
    return this.request<any>(`/global-offices/${id}`);
  }

  async createGlobalOffice(data: any): Promise<any> {
    return this.request<any>('/global-offices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateGlobalOffice(id: string, data: any): Promise<any> {
    return this.request<any>(`/global-offices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteGlobalOffice(id: string): Promise<void> {
    return this.request<void>(`/global-offices/${id}`, {
      method: 'DELETE',
    });
  }

  // FAQs API methods
  async getFAQs(): Promise<any[]> {
    return this.request<any[]>('/faqs');
  }

  async getFAQ(id: string): Promise<any> {
    return this.request<any>(`/faqs/${id}`);
  }

  async createFAQ(data: any): Promise<any> {
    return this.request<any>('/faqs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateFAQ(id: string, data: any): Promise<any> {
    return this.request<any>(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteFAQ(id: string): Promise<void> {
    return this.request<void>(`/faqs/${id}`, {
      method: 'DELETE',
    });
  }

  // Users API methods
  async getUsers(): Promise<any[]> {
    return this.request<any[]>('/users');
  }

  // Courses API methods
  async getCourses(): Promise<any[]> {
    return this.request<any[]>('/courses');
  }

  // Jobs API methods
  async getJobs(): Promise<any[]> {
    return this.request<any[]>('/jobs');
  }

  // Initialize default data (manual trigger only)
  async initializeDefaultData(): Promise<{ message: string; initialized: string[]; existing: any }> {
    return this.request<{ message: string; initialized: string[]; existing: any }>('/initialize-data', {
      method: 'POST',
    });
  }
}

export const httpClient = new HttpClient();

// Legacy compatibility types
export interface LegacyService {
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
}

// Database service using HTTP client (browser-compatible)
export class DatabaseServiceHTTP {
  async getServices(): Promise<LegacyService[]> {
    try {
      return await httpClient.getServices();
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  }

  async createService(data: Omit<LegacyService, 'id' | 'createdAt' | 'updatedAt'>): Promise<LegacyService> {
    try {
      const requestData: CreateServiceRequest = {
        title: data.title,
        shortDescription: data.shortDescription,
        description: data.description,
        icon: data.icon,
        features: data.features,
        category: data.category,
        status: data.status,
        price: data.price,
        popularity: data.popularity,
        clients: data.clients,
        rating: data.rating
      };
      
      return await httpClient.createService(requestData);
    } catch (error) {
      console.error('Error creating service:', error);
      throw new Error('Failed to create service');
    }
  }

  async updateService(id: string, data: Partial<LegacyService>): Promise<LegacyService> {
    try {
      const requestData: Partial<CreateServiceRequest> = {
        title: data.title,
        shortDescription: data.shortDescription,
        description: data.description,
        icon: data.icon,
        features: data.features,
        category: data.category,
        status: data.status,
        price: data.price,
        popularity: data.popularity,
        clients: data.clients,
        rating: data.rating
      };
      
      return await httpClient.updateService(id, requestData);
    } catch (error) {
      console.error('Error updating service:', error);
      throw new Error('Failed to update service');
    }
  }

  async deleteService(id: string): Promise<boolean> {
    try {
      await httpClient.deleteService(id);
      return true;
    } catch (error) {
      console.error('Error deleting service:', error);
      throw new Error('Failed to delete service');
    }
  }

  // Contact Messages CRUD
  async getContactMessages(): Promise<any[]> {
    return await httpClient.getContactMessages();
  }

  async createContactMessage(data: any): Promise<any> {
    return await httpClient.createContactMessage(data);
  }

  async updateContactMessage(id: string, data: any): Promise<any> {
    return await httpClient.updateContactMessage(id, data);
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    try {
      await httpClient.deleteContactMessage(id);
      return true;
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw new Error('Failed to delete contact message');
    }
  }

  // Contact Info CRUD
  async getContactInfo(): Promise<any[]> {
    return await httpClient.getContactInfo();
  }

  async createContactInfo(data: any): Promise<any> {
    return await httpClient.createContactInfo(data);
  }

  async updateContactInfo(id: string, data: any): Promise<any> {
    return await httpClient.updateContactInfo(id, data);
  }

  async deleteContactInfo(id: string): Promise<boolean> {
    try {
      await httpClient.deleteContactInfo(id);
      return true;
    } catch (error) {
      console.error('Error deleting contact info:', error);
      throw new Error('Failed to delete contact info');
    }
  }

  // Global Offices CRUD
  async getGlobalOffices(): Promise<any[]> {
    return await httpClient.getGlobalOffices();
  }

  async createGlobalOffice(data: any): Promise<any> {
    return await httpClient.createGlobalOffice(data);
  }

  async updateGlobalOffice(id: string, data: any): Promise<any> {
    return await httpClient.updateGlobalOffice(id, data);
  }

  async deleteGlobalOffice(id: string): Promise<boolean> {
    try {
      await httpClient.deleteGlobalOffice(id);
      return true;
    } catch (error) {
      console.error('Error deleting global office:', error);
      throw new Error('Failed to delete global office');
    }
  }

  // FAQs CRUD
  async getFAQs(): Promise<any[]> {
    return await httpClient.getFAQs();
  }

  async createFAQ(data: any): Promise<any> {
    return await httpClient.createFAQ(data);
  }

  async updateFAQ(id: string, data: any): Promise<any> {
    return await httpClient.updateFAQ(id, data);
  }

  async deleteFAQ(id: string): Promise<boolean> {
    try {
      await httpClient.deleteFAQ(id);
      return true;
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw new Error('Failed to delete FAQ');
    }
  }

  async getUsers(): Promise<any[]> {
    return await httpClient.getUsers();
  }

  async getCourses(): Promise<any[]> {
    return await httpClient.getCourses();
  }

  async getJobs(): Promise<any[]> {
    return await httpClient.getJobs();
  }

  async initializeDefaultData(): Promise<void> {
    const result = await httpClient.initializeDefaultData(); return;
  }
}

// Export singleton instance
export const databaseService = new DatabaseServiceHTTP();
export type { LegacyService as Service };
