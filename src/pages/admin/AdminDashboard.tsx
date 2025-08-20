import React, { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  Briefcase,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  BarChart3,
  Calendar,
  DollarSign,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import { Card, Button, Modal } from '../../components/ui';
import { exportService } from '../../services/exportService';

interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalJobs: number;
  totalRevenue: number;
  newUsersThisMonth: number;
  activeJobs: number;
  completedCourses: number;
  pendingApplications: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'course' | 'job' | 'application';
  action: string;
  user: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalJobs: 0,
    totalRevenue: 0,
    newUsersThisMonth: 0,
    activeJobs: 0,
    completedCourses: 0,
    pendingApplications: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuickAddModal, setShowQuickAddModal] = useState(false);

  // Export dashboard report function
  const handleExportReport = async () => {
    try {
      console.log('📊 Exporting dashboard report...');
      await exportService.exportData('all');
      console.log('✅ Dashboard report exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Mock data - In real app, this would come from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        setStats({
          totalUsers: 1247,
          totalCourses: 45,
          totalJobs: 23,
          totalRevenue: 125000,
          newUsersThisMonth: 89,
          activeJobs: 18,
          completedCourses: 342,
          pendingApplications: 67
        });

        setRecentActivity([
          {
            id: '1',
            type: 'user',
            action: 'New user registered',
            user: 'John Doe',
            timestamp: '2 minutes ago',
            status: 'success'
          },
          {
            id: '2',
            type: 'course',
            action: 'Course completed',
            user: 'Jane Smith',
            timestamp: '5 minutes ago',
            status: 'success'
          },
          {
            id: '3',
            type: 'job',
            action: 'New job application',
            user: 'Mike Johnson',
            timestamp: '10 minutes ago',
            status: 'pending'
          },
          {
            id: '4',
            type: 'application',
            action: 'Application reviewed',
            user: 'Sarah Wilson',
            timestamp: '15 minutes ago',
            status: 'success'
          },
          {
            id: '5',
            type: 'course',
            action: 'Course enrollment',
            user: 'David Brown',
            timestamp: '20 minutes ago',
            status: 'success'
          }
        ]);

        setIsLoading(false);
      }, 1000);
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: `+${stats.newUsersThisMonth} this month`,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      changeType: 'positive' as const
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses.toString(),
      change: `${stats.completedCourses} completions`,
      icon: BookOpen,
      color: 'from-green-500 to-green-600',
      changeType: 'positive' as const
    },
    {
      title: 'Active Jobs',
      value: stats.activeJobs.toString(),
      change: `${stats.pendingApplications} applications`,
      icon: Briefcase,
      color: 'from-orange-500 to-orange-600',
      changeType: 'neutral' as const
    },
    {
      title: 'Revenue',
      value: `$${(stats.totalRevenue / 1000).toFixed(0)}K`,
      change: '+12% from last month',
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600',
      changeType: 'positive' as const
    }
  ];

  console.log('AdminDashboard rendering:', { isLoading, stats, recentActivity });

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Here's what's happening with ASSETMAGNETS today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportReport}
            >
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
              onClick={() => setShowQuickAddModal(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mb-3 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                </div>
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              </div>
            </Card>
          ))
        ) : (
          statCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card key={index} className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {card.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                      {card.value}
                    </p>
                    <p className={`text-sm mt-2 ${
                      card.changeType === 'positive' ? 'text-green-600 dark:text-green-400' :
                      card.changeType === 'neutral' ? 'text-gray-600 dark:text-gray-400' :
                      'text-red-600 dark:text-red-400'
                    }`}>
                      {card.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h3>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
                    </div>
                  </div>
                ))
              ) : (
                recentActivity.map((activity) => {
                  const getActivityIcon = () => {
                    switch (activity.type) {
                      case 'user': return Users;
                      case 'course': return BookOpen;
                      case 'job': return Briefcase;
                      case 'application': return UserCheck;
                      default: return AlertCircle;
                    }
                  };

                  const getStatusIcon = () => {
                    switch (activity.status) {
                      case 'success': return CheckCircle;
                      case 'pending': return Clock;
                      case 'error': return AlertCircle;
                      default: return Clock;
                    }
                  };

                  const ActivityIcon = getActivityIcon();
                  const StatusIcon = getStatusIcon();

                  return (
                    <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                        <ActivityIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          by {activity.user} • {activity.timestamp}
                        </p>
                      </div>
                      <StatusIcon className={`w-5 h-5 ${
                        activity.status === 'success' ? 'text-green-500' :
                        activity.status === 'pending' ? 'text-yellow-500' :
                        'text-red-500'
                      }`} />
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Quick Actions
            </h3>

            <div className="space-y-3">
              <Button
                className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                onClick={() => window.location.href = '/admin/users'}
              >
                <Users className="w-4 h-4 mr-3" />
                Manage Users
              </Button>

              <Button
                className="w-full justify-start bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                onClick={() => window.location.href = '/admin/courses'}
              >
                <BookOpen className="w-4 h-4 mr-3" />
                Add New Course
              </Button>

              <Button
                className="w-full justify-start bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
                onClick={() => window.location.href = '/admin/jobs'}
              >
                <Briefcase className="w-4 h-4 mr-3" />
                Post New Job
              </Button>

              <Button
                className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
                onClick={() => window.location.href = '/admin/analytics'}
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                View Analytics
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                System Status
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Server Status</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Database</span>
                  <span className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Connected
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Backup</span>
                  <span className="text-gray-600 dark:text-gray-400">2 hours ago</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Add Modal */}
      <Modal
        isOpen={showQuickAddModal}
        onClose={() => setShowQuickAddModal(false)}
        title="Quick Add"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            What would you like to add?
          </p>

          <div className="grid grid-cols-1 gap-3">
            <Button
              className="w-full justify-start bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
              onClick={() => {
                setShowQuickAddModal(false);
                window.location.href = '/admin/services';
              }}
            >
              <Plus className="w-4 h-4 mr-3" />
              Add New Service
            </Button>

            <Button
              className="w-full justify-start bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
              onClick={() => {
                setShowQuickAddModal(false);
                window.location.href = '/admin/courses';
              }}
            >
              <BookOpen className="w-4 h-4 mr-3" />
              Add New Course
            </Button>

            <Button
              className="w-full justify-start bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700"
              onClick={() => {
                setShowQuickAddModal(false);
                window.location.href = '/admin/jobs';
              }}
            >
              <Briefcase className="w-4 h-4 mr-3" />
              Post New Job
            </Button>

            <Button
              className="w-full justify-start bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
              onClick={() => {
                setShowQuickAddModal(false);
                window.location.href = '/admin/users';
              }}
            >
              <Users className="w-4 h-4 mr-3" />
              Add New User
            </Button>

            <Button
              className="w-full justify-start bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700"
              onClick={() => {
                setShowQuickAddModal(false);
                window.location.href = '/admin/contact';
              }}
            >
              <Plus className="w-4 h-4 mr-3" />
              Add Contact Info
            </Button>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setShowQuickAddModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
