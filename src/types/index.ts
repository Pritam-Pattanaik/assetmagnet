// User and Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'student' | 'applicant';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  instructor: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
  };
  curriculum: CourseModule[];
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number;
  materials: LessonMaterial[];
  order: number;
  isCompleted?: boolean;
}

export interface LessonMaterial {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'quiz' | 'assignment';
  url: string;
  size?: number;
}

// Job Types
export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  category: string;
  department: string;
  experience: string;
  deadline: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  applicant: {
    name: string;
    email: string;
    phone: string;
  };
  resume: {
    filename: string;
    url: string;
    uploadedAt: string;
  };
  coverLetter: string;
  status: 'pending' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired';
  appliedAt: string;
  updatedAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

// Theme Types
export type Theme = 'light' | 'dark';

// Global App State
export interface AppState {
  user: User | null;
  courses: Course[];
  jobs: Job[];
  notifications: Notification[];
  theme: Theme;
  loading: boolean;
  error: string | null;
}

export type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_COURSES'; payload: Course[] }
  | { type: 'ADD_COURSE'; payload: Course }
  | { type: 'UPDATE_COURSE'; payload: Course }
  | { type: 'DELETE_COURSE'; payload: string }
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'UPDATE_JOB'; payload: Job }
  | { type: 'DELETE_JOB'; payload: string }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

// Analytics Types
export interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  courseEnrollments: number;
  jobApplications: number;
  revenue: number;
  conversionRate: number;
}

// Search and Filter Types
export interface SearchFilters {
  query?: string;
  category?: string;
  level?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  sortBy?: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'rating';
}

export interface JobFilters {
  query?: string;
  location?: string;
  type?: string;
  category?: string;
  experience?: string;
  sortBy?: 'newest' | 'oldest' | 'salary-high' | 'salary-low';
}
