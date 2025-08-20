import { PrismaClient } from '@prisma/client';
import type {
  Service,
  ContactMessage,
  ContactInfo,
  GlobalOffice,
  FAQ,
  User,
  Course,
  CourseModule,
  Lesson,
  CourseEnrollment,
  Job,
  JobApplication,
  Notification,
  ContactStatus,
  ContactPriority,
  ContactType,
  UserRole,
  CourseLevel,
  JobType,
  ApplicationStatus,
  NotificationType,
  ServiceStatus
} from '@prisma/client';

// Create Prisma client instance
const prisma = new PrismaClient();

// Type definitions for create operations (without id, createdAt, updatedAt)
export type CreateService = Omit<Service, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateContactMessage = Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateContactInfo = Omit<ContactInfo, 'id'>;
export type CreateGlobalOffice = Omit<GlobalOffice, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateFAQ = Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateCourse = Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;
export type CreateJob = Omit<Job, 'id' | 'createdAt' | 'updatedAt'>;

class PrismaService {
  // Services CRUD Operations
  async getServices(): Promise<Service[]> {
    try {
      return await prisma.service.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching services:', error);
      throw new Error('Failed to fetch services');
    }
  }

  async createService(data: CreateService): Promise<Service> {
    try {
      return await prisma.service.create({
        data
      });
    } catch (error) {
      console.error('Error creating service:', error);
      throw new Error('Failed to create service');
    }
  }

  async updateService(id: string, data: Partial<CreateService>): Promise<Service> {
    try {
      return await prisma.service.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('Error updating service:', error);
      throw new Error('Failed to update service');
    }
  }

  async deleteService(id: string): Promise<boolean> {
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

  // Contact Messages CRUD Operations
  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      return await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching contact messages:', error);
      throw new Error('Failed to fetch contact messages');
    }
  }

  async createContactMessage(data: CreateContactMessage): Promise<ContactMessage> {
    try {
      return await prisma.contactMessage.create({
        data
      });
    } catch (error) {
      console.error('Error creating contact message:', error);
      throw new Error('Failed to create contact message');
    }
  }

  async updateContactMessage(id: string, data: Partial<CreateContactMessage>): Promise<ContactMessage> {
    try {
      return await prisma.contactMessage.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('Error updating contact message:', error);
      throw new Error('Failed to update contact message');
    }
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    try {
      await prisma.contactMessage.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting contact message:', error);
      throw new Error('Failed to delete contact message');
    }
  }

  // Contact Info CRUD Operations
  async getContactInfo(): Promise<ContactInfo[]> {
    try {
      return await prisma.contactInfo.findMany({
        orderBy: { order: 'asc' }
      });
    } catch (error) {
      console.error('Error fetching contact info:', error);
      throw new Error('Failed to fetch contact info');
    }
  }

  async createContactInfo(data: CreateContactInfo): Promise<ContactInfo> {
    try {
      return await prisma.contactInfo.create({
        data
      });
    } catch (error) {
      console.error('Error creating contact info:', error);
      throw new Error('Failed to create contact info');
    }
  }

  async updateContactInfo(id: string, data: Partial<CreateContactInfo>): Promise<ContactInfo> {
    try {
      return await prisma.contactInfo.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw new Error('Failed to update contact info');
    }
  }

  async deleteContactInfo(id: string): Promise<boolean> {
    try {
      await prisma.contactInfo.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting contact info:', error);
      throw new Error('Failed to delete contact info');
    }
  }

  // Global Offices CRUD Operations
  async getGlobalOffices(): Promise<GlobalOffice[]> {
    try {
      return await prisma.globalOffice.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching global offices:', error);
      throw new Error('Failed to fetch global offices');
    }
  }

  async createGlobalOffice(data: CreateGlobalOffice): Promise<GlobalOffice> {
    try {
      return await prisma.globalOffice.create({
        data
      });
    } catch (error) {
      console.error('Error creating global office:', error);
      throw new Error('Failed to create global office');
    }
  }

  async updateGlobalOffice(id: string, data: Partial<CreateGlobalOffice>): Promise<GlobalOffice> {
    try {
      return await prisma.globalOffice.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('Error updating global office:', error);
      throw new Error('Failed to update global office');
    }
  }

  async deleteGlobalOffice(id: string): Promise<boolean> {
    try {
      await prisma.globalOffice.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting global office:', error);
      throw new Error('Failed to delete global office');
    }
  }

  // FAQ CRUD Operations
  async getFAQs(): Promise<FAQ[]> {
    try {
      return await prisma.fAQ.findMany({
        orderBy: { order: 'asc' }
      });
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw new Error('Failed to fetch FAQs');
    }
  }

  async createFAQ(data: CreateFAQ): Promise<FAQ> {
    try {
      return await prisma.fAQ.create({
        data
      });
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw new Error('Failed to create FAQ');
    }
  }

  async updateFAQ(id: string, data: Partial<CreateFAQ>): Promise<FAQ> {
    try {
      return await prisma.fAQ.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('Error updating FAQ:', error);
      throw new Error('Failed to update FAQ');
    }
  }

  async deleteFAQ(id: string): Promise<boolean> {
    try {
      await prisma.fAQ.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      throw new Error('Failed to delete FAQ');
    }
  }

  // Users CRUD Operations
  async getUsers(): Promise<User[]> {
    try {
      return await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async createUser(data: CreateUser): Promise<User> {
    try {
      return await prisma.user.create({
        data
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async updateUser(id: string, data: Partial<CreateUser>): Promise<User> {
    try {
      return await prisma.user.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await prisma.user.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  // Courses CRUD Operations
  async getCourses(): Promise<Course[]> {
    try {
      return await prisma.course.findMany({
        include: {
          instructor: true,
          modules: {
            include: {
              lessons: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw new Error('Failed to fetch courses');
    }
  }

  async createCourse(data: CreateCourse): Promise<Course> {
    try {
      return await prisma.course.create({
        data,
        include: {
          instructor: true
        }
      });
    } catch (error) {
      console.error('Error creating course:', error);
      throw new Error('Failed to create course');
    }
  }

  async updateCourse(id: string, data: Partial<CreateCourse>): Promise<Course> {
    try {
      return await prisma.course.update({
        where: { id },
        data,
        include: {
          instructor: true
        }
      });
    } catch (error) {
      console.error('Error updating course:', error);
      throw new Error('Failed to update course');
    }
  }

  async deleteCourse(id: string): Promise<boolean> {
    try {
      await prisma.course.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw new Error('Failed to delete course');
    }
  }

  // Jobs CRUD Operations
  async getJobs(): Promise<Job[]> {
    try {
      return await prisma.job.findMany({
        orderBy: { createdAt: 'desc' }
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
  }

  async createJob(data: CreateJob): Promise<Job> {
    try {
      return await prisma.job.create({
        data
      });
    } catch (error) {
      console.error('Error creating job:', error);
      throw new Error('Failed to create job');
    }
  }

  async updateJob(id: string, data: Partial<CreateJob>): Promise<Job> {
    try {
      return await prisma.job.update({
        where: { id },
        data
      });
    } catch (error) {
      console.error('Error updating job:', error);
      throw new Error('Failed to update job');
    }
  }

  async deleteJob(id: string): Promise<boolean> {
    try {
      await prisma.job.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting job:', error);
      throw new Error('Failed to delete job');
    }
  }

  // Initialize default data
  async initializeDefaultData(): Promise<void> {
    try {
      // Check if data already exists
      const servicesCount = await prisma.service.count();
      const contactInfoCount = await prisma.contactInfo.count();
      const globalOfficesCount = await prisma.globalOffice.count();
      const faqsCount = await prisma.fAQ.count();
      const usersCount = await prisma.user.count();
      const coursesCount = await prisma.course.count();
      const jobsCount = await prisma.job.count();

      // Initialize services if empty
      if (servicesCount === 0) {
        const defaultServices: CreateService[] = [
          {
            title: 'AI Consulting',
            shortDescription: 'Expert AI strategy and implementation guidance for businesses',
            description: 'Strategic AI implementation consulting for businesses looking to leverage artificial intelligence. Our expert consultants help you identify opportunities, assess technology requirements, and develop implementation roadmaps.',
            icon: '🤖',
            features: ['AI Strategy Development', 'Technology Assessment', 'Implementation Roadmap', 'ROI Analysis'],
            category: 'Consulting',
            status: 'ACTIVE',
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
            status: 'ACTIVE',
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
            status: 'ACTIVE',
            basicPrice: 2500,
            premiumPrice: 7500,
            enterprisePrice: 20000,
            popularity: 92,
            clients: 200,
            rating: 4.9
          }
        ];

        for (const service of defaultServices) {
          await this.createService(service);
        }
      }

      // Initialize contact info if empty
      if (contactInfoCount === 0) {
        const defaultContactInfo: CreateContactInfo[] = [
          {
            type: 'ADDRESS',
            title: 'Office Address',
            value: '123 AI Street, Tech Valley, San Francisco, CA 94105',
            icon: '📍',
            isActive: true,
            order: 1
          },
          {
            type: 'PHONE',
            title: 'Phone Number',
            value: '+1 (555) 123-ASSET',
            icon: '📞',
            isActive: true,
            order: 2
          },
          {
            type: 'EMAIL',
            title: 'Email Address',
            value: 'contact@assetmagnets.com',
            icon: '✉️',
            isActive: true,
            order: 3
          },
          {
            type: 'HOURS',
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
      if (globalOfficesCount === 0) {
        const defaultOffices: CreateGlobalOffice[] = [
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
            latitude: 37.7749,
            longitude: -122.4194,
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
            latitude: 51.5074,
            longitude: -0.1278,
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
            latitude: 1.3521,
            longitude: 103.8198,
            workingHours: 'Mon-Fri: 9:00 AM - 6:00 PM SGT'
          }
        ];

        for (const office of defaultOffices) {
          await this.createGlobalOffice(office);
        }
      }

      // Initialize FAQs if empty
      if (faqsCount === 0) {
        const defaultFAQs: CreateFAQ[] = [
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

      // Initialize users if empty
      if (usersCount === 0) {
        const defaultUsers: CreateUser[] = [
          {
            email: 'admin@assetmagnets.com',
            name: 'Admin User',
            passwordHash: '$2b$10$example.hash.for.admin.user', // In real app, hash properly
            role: 'ADMIN',
            avatar: null
          },
          {
            email: 'instructor@assetmagnets.com',
            name: 'Dr. Sarah Chen',
            passwordHash: '$2b$10$example.hash.for.instructor', // In real app, hash properly
            role: 'INSTRUCTOR',
            avatar: null
          },
          {
            email: 'student@assetmagnets.com',
            name: 'John Student',
            passwordHash: '$2b$10$example.hash.for.student', // In real app, hash properly
            role: 'STUDENT',
            avatar: null
          }
        ];

        for (const user of defaultUsers) {
          await this.createUser(user);
        }
      }

      // Initialize courses if empty (need instructor first)
      if (coursesCount === 0) {
        const instructor = await prisma.user.findFirst({
          where: { role: 'INSTRUCTOR' }
        });

        if (instructor) {
          const defaultCourses: CreateCourse[] = [
            {
              title: 'AI Fundamentals for Business Leaders',
              description: 'Master the basics of AI and learn how to implement AI strategies in your organization. This comprehensive course covers AI concepts, business applications, and strategic implementation.',
              shortDescription: 'Master AI basics and implementation strategies for business leaders',
              thumbnail: '/course-ai-fundamentals.jpg',
              price: 299.00,
              discountPrice: 199.00,
              duration: '8 weeks',
              level: 'BEGINNER',
              category: 'AI & Business',
              instructorId: instructor.id,
              rating: 4.9,
              reviewCount: 127,
              enrollmentCount: 2847,
              isPublished: true
            },
            {
              title: 'Machine Learning for Developers',
              description: 'Learn to build and deploy machine learning models using Python, TensorFlow, and modern ML frameworks. Hands-on projects included.',
              shortDescription: 'Build and deploy ML models with Python and TensorFlow',
              thumbnail: '/course-ml-developers.jpg',
              price: 499.00,
              discountPrice: 349.00,
              duration: '12 weeks',
              level: 'INTERMEDIATE',
              category: 'Machine Learning',
              instructorId: instructor.id,
              rating: 4.8,
              reviewCount: 89,
              enrollmentCount: 1456,
              isPublished: true
            },
            {
              title: 'Deep Learning Specialization',
              description: 'Advanced deep learning techniques including neural networks, CNNs, RNNs, and transformers. Real-world applications and projects.',
              shortDescription: 'Advanced deep learning with neural networks and transformers',
              thumbnail: '/course-deep-learning.jpg',
              price: 699.00,
              discountPrice: 499.00,
              duration: '16 weeks',
              level: 'ADVANCED',
              category: 'Deep Learning',
              instructorId: instructor.id,
              rating: 4.9,
              reviewCount: 156,
              enrollmentCount: 892,
              isPublished: true
            }
          ];

          for (const course of defaultCourses) {
            await this.createCourse(course);
          }
        }
      }

      // Initialize jobs if empty
      if (jobsCount === 0) {
        const defaultJobs: CreateJob[] = [
          {
            title: 'Senior AI Engineer',
            description: 'Join our AI team to develop cutting-edge machine learning solutions. Work on large-scale AI systems and contribute to innovative projects.',
            requirements: [
              '5+ years of experience in AI/ML',
              'Strong Python programming skills',
              'Experience with TensorFlow or PyTorch',
              'Knowledge of cloud platforms (AWS, GCP, Azure)',
              'Strong problem-solving skills'
            ],
            responsibilities: [
              'Design and implement ML models',
              'Optimize AI algorithms for production',
              'Collaborate with cross-functional teams',
              'Mentor junior developers',
              'Stay updated with latest AI trends'
            ],
            location: 'San Francisco, CA',
            type: 'FULL_TIME',
            salaryMin: 150000,
            salaryMax: 220000,
            salaryCurrency: 'USD',
            category: 'Engineering',
            department: 'AI Research',
            experience: 'Senior Level',
            deadline: new Date('2024-12-31'),
            isActive: true
          },
          {
            title: 'AI Product Manager',
            description: 'Lead the development of AI-powered products from conception to launch. Work with engineering and design teams to create innovative solutions.',
            requirements: [
              '3+ years of product management experience',
              'Understanding of AI/ML technologies',
              'Strong analytical and communication skills',
              'Experience with agile methodologies',
              'Technical background preferred'
            ],
            responsibilities: [
              'Define product roadmap and strategy',
              'Work with engineering teams on AI features',
              'Conduct market research and analysis',
              'Manage product launches',
              'Gather and analyze user feedback'
            ],
            location: 'Remote',
            type: 'REMOTE',
            salaryMin: 120000,
            salaryMax: 180000,
            salaryCurrency: 'USD',
            category: 'Product',
            department: 'Product Management',
            experience: 'Mid Level',
            deadline: new Date('2024-11-30'),
            isActive: true
          },
          {
            title: 'Data Scientist',
            description: 'Analyze complex datasets and build predictive models to drive business insights. Work with large-scale data and advanced analytics.',
            requirements: [
              'Masters in Data Science, Statistics, or related field',
              'Strong Python/R programming skills',
              'Experience with SQL and databases',
              'Knowledge of statistical modeling',
              'Experience with data visualization tools'
            ],
            responsibilities: [
              'Analyze large datasets for insights',
              'Build predictive models',
              'Create data visualizations and reports',
              'Collaborate with business stakeholders',
              'Present findings to leadership'
            ],
            location: 'New York, NY',
            type: 'FULL_TIME',
            salaryMin: 100000,
            salaryMax: 150000,
            salaryCurrency: 'USD',
            category: 'Data Science',
            department: 'Analytics',
            experience: 'Mid Level',
            deadline: new Date('2024-10-31'),
            isActive: true
          }
        ];

        for (const job of defaultJobs) {
          await this.createJob(job);
        }
      }
    } catch (error) {
      console.error('Error initializing default data:', error);
    }
  }

  // Cleanup method
  async disconnect(): Promise<void> {
    await prisma.$disconnect();
  }
}

// Export singleton instance
export const prismaService = new PrismaService();

// Export types for use in components
export type {
  Service,
  ContactMessage,
  ContactInfo,
  GlobalOffice,
  FAQ,
  User,
  Course,
  CourseModule,
  Lesson,
  CourseEnrollment,
  Job,
  JobApplication,
  Notification,
  ContactStatus,
  ContactPriority,
  ContactType,
  UserRole,
  CourseLevel,
  JobType,
  ApplicationStatus,
  NotificationType,
  ServiceStatus
};
