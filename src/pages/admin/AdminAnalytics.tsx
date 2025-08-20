import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Briefcase,
  DollarSign,
  Eye,
  Download,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';
import { Card, Button } from '../../components/ui';

interface AnalyticsData {
  userGrowth: { month: string; users: number; }[];
  courseEnrollments: { course: string; enrollments: number; }[];
  jobApplications: { job: string; applications: number; }[];
  revenue: { month: string; amount: number; }[];
  topMetrics: {
    totalUsers: number;
    activeUsers: number;
    totalCourses: number;
    totalJobs: number;
    totalRevenue: number;
    conversionRate: number;
  };
}

export default function AdminAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        const mockData: AnalyticsData = {
          userGrowth: [
            { month: 'Jan', users: 1200 },
            { month: 'Feb', users: 1350 },
            { month: 'Mar', users: 1500 },
            { month: 'Apr', users: 1680 },
            { month: 'May', users: 1850 },
            { month: 'Jun', users: 2100 },
            { month: 'Jul', users: 2400 }
          ],
          courseEnrollments: [
            { course: 'Machine Learning', enrollments: 1247 },
            { course: 'Python Programming', enrollments: 892 },
            { course: 'Data Science', enrollments: 1156 },
            { course: 'Web Development', enrollments: 2341 },
            { course: 'AI Ethics', enrollments: 567 }
          ],
          jobApplications: [
            { job: 'Senior AI Engineer', applications: 45 },
            { job: 'Product Manager', applications: 67 },
            { job: 'Data Scientist', applications: 89 },
            { job: 'Frontend Developer', applications: 123 },
            { job: 'DevOps Engineer', applications: 12 }
          ],
          revenue: [
            { month: 'Jan', amount: 45000 },
            { month: 'Feb', amount: 52000 },
            { month: 'Mar', amount: 48000 },
            { month: 'Apr', amount: 61000 },
            { month: 'May', amount: 58000 },
            { month: 'Jun', amount: 67000 },
            { month: 'Jul', amount: 73000 }
          ],
          topMetrics: {
            totalUsers: 2400,
            activeUsers: 1890,
            totalCourses: 45,
            totalJobs: 23,
            totalRevenue: 125000,
            conversionRate: 12.5
          }
        };

        setAnalyticsData(mockData);
        setIsLoading(false);
      }, 1000);
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  if (isLoading || !analyticsData) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Loading analytics data...</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track performance metrics and insights across the platform
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.topMetrics.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.topMetrics.activeUsers.toLocaleString()}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +8% from last month
              </p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${(analyticsData.topMetrics.totalRevenue / 1000).toFixed(0)}K
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15% from last month
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.topMetrics.conversionRate}%
              </p>
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                -2% from last month
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Courses by Enrollment
          </h3>
          <div className="space-y-4">
            {analyticsData.courseEnrollments.map((course, index) => (
              <div key={course.course} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {course.course}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                      style={{ width: `${(course.enrollments / Math.max(...analyticsData.courseEnrollments.map(c => c.enrollments))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                    {course.enrollments}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Jobs */}
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Top Jobs by Applications
          </h3>
          <div className="space-y-4">
            {analyticsData.jobApplications.map((job, index) => (
              <div key={job.job} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {job.job}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      style={{ width: `${(job.applications / Math.max(...analyticsData.jobApplications.map(j => j.applications))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                    {job.applications}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Simple Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            User Growth Trend
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.userGrowth.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg"
                  style={{ height: `${(data.users / Math.max(...analyticsData.userGrowth.map(d => d.users))) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Revenue Trend
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.revenue.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center flex-1">
                <div
                  className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg"
                  style={{ height: `${(data.amount / Math.max(...analyticsData.revenue.map(d => d.amount))) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
