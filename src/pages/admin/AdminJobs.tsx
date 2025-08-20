import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Building,
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  X
} from 'lucide-react';
import { Card, Button, Modal } from '../../components/ui';
import { exportService } from '../../services/exportService';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  department: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'active' | 'paused' | 'closed' | 'draft';
  applications: number;
  views: number;
  postedDate: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    level: 'mid',
    salary: '',
    description: '',
    requirements: '',
    benefits: '',
    status: 'active'
  });

  // Export jobs function
  const handleExportJobs = async () => {
    try {
      console.log('💼 Exporting jobs...');
      await exportService.exportData('jobs');
      console.log('✅ Jobs exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Mock data - In real app, this would come from API
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);

      // Simulate API call
      setTimeout(() => {
        const mockJobs: Job[] = [
          {
            id: '1',
            title: 'Senior AI Engineer',
            company: 'ASSETMAGNETS',
            location: 'San Francisco, CA',
            type: 'full-time',
            level: 'senior',
            department: 'Engineering',
            salary: { min: 150000, max: 200000, currency: 'USD' },
            description: 'We are looking for a Senior AI Engineer to join our team and help build the next generation of AI-powered solutions.',
            requirements: ['5+ years of experience in AI/ML', 'Python, TensorFlow, PyTorch', 'PhD in Computer Science or related field'],
            benefits: ['Health insurance', 'Stock options', 'Flexible work hours', 'Remote work'],
            status: 'active',
            applications: 45,
            views: 234,
            postedDate: '2024-07-15',
            deadline: '2024-08-15',
            createdAt: '2024-07-15T10:00:00Z',
            updatedAt: '2024-07-20T14:30:00Z'
          },
          {
            id: '2',
            title: 'Product Manager',
            company: 'ASSETMAGNETS',
            location: 'New York, NY',
            type: 'full-time',
            level: 'mid',
            department: 'Product',
            salary: { min: 120000, max: 160000, currency: 'USD' },
            description: 'Join our product team to drive the development of innovative AI solutions for businesses.',
            requirements: ['3+ years of product management experience', 'Experience with AI/ML products', 'Strong analytical skills'],
            benefits: ['Health insurance', 'Stock options', 'Professional development budget'],
            status: 'active',
            applications: 67,
            views: 456,
            postedDate: '2024-07-20',
            deadline: '2024-08-20',
            createdAt: '2024-07-20T09:00:00Z',
            updatedAt: '2024-07-25T16:45:00Z'
          },
          {
            id: '3',
            title: 'Data Scientist',
            company: 'ASSETMAGNETS',
            location: 'Remote',
            type: 'remote',
            level: 'mid',
            department: 'Data Science',
            salary: { min: 100000, max: 140000, currency: 'USD' },
            description: 'Analyze large datasets and build predictive models to drive business insights.',
            requirements: ['3+ years of data science experience', 'Python, R, SQL', 'Machine learning expertise'],
            benefits: ['Health insurance', 'Remote work', 'Learning stipend'],
            status: 'active',
            applications: 89,
            views: 567,
            postedDate: '2024-07-10',
            deadline: '2024-08-10',
            createdAt: '2024-07-10T11:00:00Z',
            updatedAt: '2024-07-18T13:20:00Z'
          },
          {
            id: '4',
            title: 'Frontend Developer',
            company: 'ASSETMAGNETS',
            location: 'Austin, TX',
            type: 'full-time',
            level: 'entry',
            department: 'Engineering',
            salary: { min: 80000, max: 110000, currency: 'USD' },
            description: 'Build beautiful and responsive user interfaces for our AI-powered applications.',
            requirements: ['2+ years of frontend development', 'React, TypeScript, CSS', 'UI/UX design skills'],
            benefits: ['Health insurance', 'Flexible hours', 'Career growth opportunities'],
            status: 'paused',
            applications: 123,
            views: 789,
            postedDate: '2024-06-25',
            deadline: '2024-07-25',
            createdAt: '2024-06-25T08:00:00Z',
            updatedAt: '2024-07-30T10:15:00Z'
          },
          {
            id: '5',
            title: 'DevOps Engineer',
            company: 'ASSETMAGNETS',
            location: 'Seattle, WA',
            type: 'contract',
            level: 'senior',
            department: 'Infrastructure',
            salary: { min: 130000, max: 170000, currency: 'USD' },
            description: 'Manage and optimize our cloud infrastructure and deployment pipelines.',
            requirements: ['5+ years of DevOps experience', 'AWS, Docker, Kubernetes', 'CI/CD expertise'],
            benefits: ['Competitive hourly rate', 'Flexible schedule', 'Remote work options'],
            status: 'draft',
            applications: 12,
            views: 98,
            postedDate: '2024-07-28',
            deadline: '2024-08-28',
            createdAt: '2024-07-28T14:00:00Z',
            updatedAt: '2024-07-30T09:30:00Z'
          }
        ];

        setJobs(mockJobs);
        setFilteredJobs(mockJobs);
        setIsLoading(false);
      }, 1000);
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search term, type, level, and status
  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(job => job.level === selectedLevel);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(job => job.status === selectedStatus);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedType, selectedLevel, selectedStatus]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'part-time': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'remote': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'entry': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'mid': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'senior': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'executive': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'closed': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'paused': return AlertCircle;
      case 'closed': return XCircle;
      case 'draft': return Clock;
      default: return Clock;
    }
  };

  const handleDeleteJob = (jobId: string) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(job => job.id !== jobId));
    }
  };

  const handleStatusChange = (jobId: string, newStatus: 'active' | 'paused' | 'closed' | 'draft') => {
    setJobs(jobs.map(job =>
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Job Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create, edit, and manage job postings and applications
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportJobs}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Analytics
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Post Job
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{jobs.length}</p>
            </div>
            <Briefcase className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {jobs.filter(j => j.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {jobs.reduce((sum, job) => sum + job.applications, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Views</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {jobs.reduce((sum, job) => sum + job.views, 0).toLocaleString()}
              </p>
            </div>
            <Eye className="w-8 h-8 text-purple-500" />
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
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Levels</option>
              <option value="entry">Entry</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
              <option value="executive">Executive</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
              <div className="space-y-4">
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
        ) : filteredJobs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No jobs found</p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const StatusIcon = getStatusIcon(job.status);
            return (
              <Card key={job.id} className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                {/* Job Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors duration-200">
                      {job.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{job.company}</span>
                      <span className="text-gray-400">•</span>
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{job.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Job Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                        {job.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(job.level)}`}>
                        {job.level.charAt(0).toUpperCase() + job.level.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{job.department}</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{job.applications} applications</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{job.views} views</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedJob(job);
                      setShowEditModal(true);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedJob(job);
                      setShowEditModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Add Job Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setJobFormData({
            title: '',
            company: '',
            location: '',
            type: 'full-time',
            level: 'mid',
            salary: '',
            description: '',
            requirements: '',
            benefits: '',
            status: 'active'
          });
        }}
        title="Post New Job"
        size="lg"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          console.log('Adding new job:', jobFormData);
          // Here you would typically call an API to create the job
          setShowAddModal(false);
          alert('Job posted successfully!');
        }}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={jobFormData.title}
                  onChange={(e) => setJobFormData({...jobFormData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. Senior Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company *
                </label>
                <input
                  type="text"
                  required
                  value={jobFormData.company}
                  onChange={(e) => setJobFormData({...jobFormData, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. ASSETMAGNETS"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  value={jobFormData.location}
                  onChange={(e) => setJobFormData({...jobFormData, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g. New York, NY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Type
                </label>
                <select
                  value={jobFormData.type}
                  onChange={(e) => setJobFormData({...jobFormData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Experience Level
                </label>
                <select
                  value={jobFormData.level}
                  onChange={(e) => setJobFormData({...jobFormData, level: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead/Principal</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Salary Range
              </label>
              <input
                type="text"
                value={jobFormData.salary}
                onChange={(e) => setJobFormData({...jobFormData, salary: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="e.g. $80,000 - $120,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Job Description *
              </label>
              <textarea
                required
                rows={4}
                value={jobFormData.description}
                onChange={(e) => setJobFormData({...jobFormData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="Describe the role, responsibilities, and what you're looking for..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Requirements
              </label>
              <textarea
                rows={3}
                value={jobFormData.requirements}
                onChange={(e) => setJobFormData({...jobFormData, requirements: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="List the required skills, experience, and qualifications..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Benefits
              </label>
              <textarea
                rows={3}
                value={jobFormData.benefits}
                onChange={(e) => setJobFormData({...jobFormData, benefits: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                placeholder="List the benefits, perks, and compensation details..."
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
              Post Job
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
