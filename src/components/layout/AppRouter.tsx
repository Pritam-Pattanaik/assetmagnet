import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Layout Components
import MainLayout from './MainLayout';
import AdminLayout from './AdminLayout';

// Public Pages
import HomePage from '../../pages/HomePage';
import AboutPage from '../../pages/AboutPage';
import ServicesPage from '../../pages/ServicesPage';
import CoursesPage from '../../pages/CoursesPage';
import CourseDetailPage from '../../pages/CourseDetailPage';
import CareerPage from '../../pages/CareerPage';
import JobDetailPage from '../../pages/JobDetailPage';
import ContactPage from '../../pages/ContactPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';

// Protected Pages
import StudentDashboard from '../../pages/StudentDashboard';
import ProfilePage from '../../pages/ProfilePage';

// Admin Pages
import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminCourses from '../../pages/admin/AdminCourses';
import AdminJobs from '../../pages/admin/AdminJobs';
import AdminServices from '../../pages/admin/AdminServices';
import AdminContact from '../../pages/admin/AdminContact';
import AdminUsers from '../../pages/admin/AdminUsers';
import AdminAnalytics from '../../pages/admin/AdminAnalytics';
import AdminSettings from '../../pages/admin/AdminSettings';
import DatabaseViewer from '../../pages/admin/DatabaseViewer';

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  console.log('ProtectedRoute check:', {
    isAuthenticated,
    userRole: user?.role,
    requiredRole,
    isLoading
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    console.log('User role not authorized:', user.role, 'required:', requiredRole);
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute access granted');
  return <>{children}</>;
}

// Public Route Component (redirect if authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    // Redirect based on user role
    if (user.role === 'admin' || user.role === 'editor') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CourseDetailPage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="career/:id" element={<JobDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />


        {/* Protected Student Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={['admin', 'editor']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="contact" element={<AdminContact />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                  Page not found
                </p>
                <a
                  href="/"
                  className="btn-primary inline-block"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
