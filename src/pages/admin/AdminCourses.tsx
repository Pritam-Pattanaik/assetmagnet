import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Star,
  Users,
  Clock,
  DollarSign,
  Play,
  Pause,
  BarChart3,
  Calendar,
  Award,
  TrendingUp,
  Save,
  X
} from 'lucide-react';
import { Card, Button, Modal } from '../../components/ui';
import { exportService } from '../../services/exportService';
import { databaseService } from '../../services/httpClient';

interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  instructor?: {
    id: string;
    name: string;
    email: string;
  };
  instructorId?: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  discountPrice?: number;
  rating: number;
  enrollmentCount: number;
  reviewCount?: number;
  isPublished: boolean;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrollmentDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentAmount: number;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function AdminCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseEnrollments, setCourseEnrollments] = useState<Enrollment[]>([]);
  const [courseFormData, setCourseFormData] = useState({
    title: '',
    description: '',
    category: 'programming',
    level: 'beginner',
    duration: '',
    price: '',
    instructor: '',
    status: 'active'
  });

  // Export courses function
  const handleExportCourses = async () => {
    try {
      console.log('🎓 Exporting courses...');
      await exportService.exportData('courses');
      console.log('✅ Courses exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const coursesData = await databaseService.getCourses();
        setCourses(coursesData);
        setFilteredCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);


  // Filter courses based on search term, category, level, and status
  useEffect(() => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (course.instructor?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level.toLowerCase() === selectedLevel);
    }

    if (selectedStatus !== 'all') {
      const statusFilter = selectedStatus === 'published' ? true : false;
      filtered = filtered.filter(course => course.isPublished === statusFilter);
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedStatus]);

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (isPublished: boolean) => {
    return isPublished
      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
  };

  // Handle view course enrollments
  const handleViewCourse = async (course: Course) => {
    setSelectedCourse(course);

    // Fetch enrollment data for this course
    try {
      // For now, we'll simulate enrollment data since the API endpoint doesn't exist yet
      const mockEnrollments: Enrollment[] = [
        {
          id: '1',
          userId: 'user1',
          courseId: course.id,
          enrollmentDate: '2024-07-15T10:00:00Z',
          paymentStatus: 'completed',
          paymentAmount: course.price,
          user: {
            id: 'user1',
            name: 'John Smith',
            email: 'john.smith@example.com',
            avatar: '/avatar1.jpg'
          }
        },
        {
          id: '2',
          userId: 'user2',
          courseId: course.id,
          enrollmentDate: '2024-07-20T14:30:00Z',
          paymentStatus: 'pending',
          paymentAmount: course.price,
          user: {
            id: 'user2',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@example.com',
            avatar: '/avatar2.jpg'
          }
        },
        {
          id: '3',
          userId: 'user3',
          courseId: course.id,
          enrollmentDate: '2024-07-25T09:15:00Z',
          paymentStatus: 'completed',
          paymentAmount: course.discountPrice || course.price,
          user: {
            id: 'user3',
            name: 'Mike Chen',
            email: 'mike.chen@example.com'
          }
        }
      ];

      setCourseEnrollments(mockEnrollments);
      setShowViewModal(true);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      alert('Failed to load enrollment data');
    }
  };

  // Handle edit course
  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setCourseFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level.toLowerCase(),
      duration: course.duration,
      price: course.price.toString(),
      instructor: course.instructor?.name || '',
      status: course.isPublished ? 'published' : 'draft'
    });
    setShowEditModal(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handleStatusChange = (courseId: string, newStatus: 'published' | 'draft' | 'archived') => {
    setCourses(courses.map(course =>
      course.id === courseId ? { ...course, status: newStatus } : course
    ));
  };

  const categories = Array.from(new Set(courses.map(course => course.category)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Course Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create, edit, and manage all courses and learning content
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportCourses}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{courses.length}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Published</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {courses.filter(c => c.isPublished).length}
              </p>
            </div>
            <Play className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {courses.reduce((sum, course) => sum + course.enrollmentCount, 0).toLocaleString()}
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 shadow-lg border-0 overflow-hidden">
              <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </Card>
          ))
        ) : filteredCourses.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No courses found</p>
          </div>
        ) : (
          filteredCourses.map((course) => (
            <Card key={course.id} className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden group">
              {/* Course Thumbnail */}
              <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white opacity-80" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(course.isPublished)}`}>
                    {course.isPublished ? 'Published' : 'Draft'}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                </div>
              </div>

              {/* Course Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                    {course.title}
                  </h3>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Instructor</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.instructor?.name || 'Not assigned'}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Duration</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Enrollments</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.enrollmentCount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{course.rating}</span>
                    </div>
                    <span className="text-lg font-bold text-orange-600">${course.price}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleViewCourse(course)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Course Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setCourseFormData({
            title: '',
            description: '',
            category: 'programming',
            level: 'beginner',
            duration: '',
            price: '',
            instructor: '',
            status: 'active'
          });
        }}
        title="Add New Course"
        size="lg"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Adding new course:', courseFormData);
          // Here you would typically call an API to create the course
          setShowAddModal(false);
          alert('Course added successfully!');
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={courseFormData.title}
                onChange={(e) => setCourseFormData({...courseFormData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g. Complete React Development Course"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={courseFormData.description}
                onChange={(e) => setCourseFormData({...courseFormData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="Describe what students will learn in this course..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={courseFormData.category}
                  onChange={(e) => setCourseFormData({...courseFormData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="data-science">Data Science</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Level
                </label>
                <select
                  value={courseFormData.level}
                  onChange={(e) => setCourseFormData({...courseFormData, level: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={courseFormData.duration}
                  onChange={(e) => setCourseFormData({...courseFormData, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 8 weeks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={courseFormData.price}
                  onChange={(e) => setCourseFormData({...courseFormData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. $299"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={courseFormData.status}
                  onChange={(e) => setCourseFormData({...courseFormData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instructor
              </label>
              <input
                type="text"
                value={courseFormData.instructor}
                onChange={(e) => setCourseFormData({...courseFormData, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g. John Smith"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </div>
        </form>
      </Modal>

      {/* View Course Enrollments Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedCourse(null);
          setCourseEnrollments([]);
        }}
        title={`Course Enrollments - ${selectedCourse?.title || ''}`}
        size="xl"
      >
        <div className="space-y-6">
          {/* Course Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Enrollments</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCourse?.enrollmentCount || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Course Price</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${selectedCourse?.price || 0}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  ${((selectedCourse?.price || 0) * (selectedCourse?.enrollmentCount || 0)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Enrollments List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Enrolled Students ({courseEnrollments.length})
            </h3>

            {courseEnrollments.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No enrollments found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {courseEnrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {enrollment.user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {enrollment.user.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {enrollment.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          ${enrollment.paymentAmount}
                        </p>
                      </div>

                      <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          enrollment.paymentStatus === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : enrollment.paymentStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : enrollment.paymentStatus === 'failed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {enrollment.paymentStatus.charAt(0).toUpperCase() + enrollment.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Summary</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 dark:text-gray-400">Completed</p>
                <p className="font-semibold text-green-600">
                  {courseEnrollments.filter(e => e.paymentStatus === 'completed').length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Pending</p>
                <p className="font-semibold text-yellow-600">
                  {courseEnrollments.filter(e => e.paymentStatus === 'pending').length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Failed</p>
                <p className="font-semibold text-red-600">
                  {courseEnrollments.filter(e => e.paymentStatus === 'failed').length}
                </p>
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${courseEnrollments
                    .filter(e => e.paymentStatus === 'completed')
                    .reduce((sum, e) => sum + e.paymentAmount, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Course Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedCourse(null);
        }}
        title={`Edit Course - ${selectedCourse?.title || ''}`}
        size="lg"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Updating course:', selectedCourse?.id, courseFormData);
          // Here you would typically call an API to update the course
          setShowEditModal(false);
          alert('Course updated successfully!');
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Title *
              </label>
              <input
                type="text"
                required
                value={courseFormData.title}
                onChange={(e) => setCourseFormData({...courseFormData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g. Complete React Development Course"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={courseFormData.description}
                onChange={(e) => setCourseFormData({...courseFormData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="Describe what students will learn in this course..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={courseFormData.category}
                  onChange={(e) => setCourseFormData({...courseFormData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="programming">Programming</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="marketing">Marketing</option>
                  <option value="data-science">Data Science</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Level
                </label>
                <select
                  value={courseFormData.level}
                  onChange={(e) => setCourseFormData({...courseFormData, level: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  value={courseFormData.duration}
                  onChange={(e) => setCourseFormData({...courseFormData, duration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. 8 weeks"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={courseFormData.price}
                  onChange={(e) => setCourseFormData({...courseFormData, price: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. $299"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={courseFormData.status}
                  onChange={(e) => setCourseFormData({...courseFormData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Instructor
              </label>
              <input
                type="text"
                value={courseFormData.instructor}
                onChange={(e) => setCourseFormData({...courseFormData, instructor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g. Dr. Sarah Chen"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Update Course
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
