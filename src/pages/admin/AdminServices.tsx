import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  Star,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  X
} from 'lucide-react';
import { Card, Button, Modal, Input, Textarea } from '../../components/ui';
import { databaseService, type Service } from '../../services/httpClient';
import { exportService } from '../../services/exportService';

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    icon: '',
    features: [''],
    category: '',
    basicPrice: 0,
    premiumPrice: 0,
    enterprisePrice: 0,
    status: 'draft' as 'active' | 'inactive' | 'draft'
  });

  // Load services from database
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);

      try {
        const dbServices = await databaseService.getServices();
        setServices(dbServices);
        setFilteredServices(dbServices);
      } catch (error) {
        console.error('Error loading services:', error);
        // Fallback to mock data
        setTimeout(() => {
        const mockServices: Service[] = [
          {
            id: '1',
            title: 'AI Consulting',
            description: 'Comprehensive AI strategy and implementation consulting for businesses looking to leverage artificial intelligence.',
            shortDescription: 'Expert AI strategy and implementation guidance',
            icon: '🤖',
            features: ['AI Strategy Development', 'Technology Assessment', 'Implementation Planning', 'ROI Analysis'],
            price: { basic: 5000, premium: 15000, enterprise: 50000 },
            category: 'Consulting',
            status: 'active',
            popularity: 95,
            clients: 150,
            rating: 4.8,
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-07-20T14:30:00Z'
          },
          {
            id: '2',
            title: 'Machine Learning Development',
            description: 'Custom machine learning model development and deployment for specific business needs.',
            shortDescription: 'Custom ML models for your business',
            icon: '⚙️',
            features: ['Custom Model Development', 'Data Processing', 'Model Training', 'Deployment Support'],
            price: { basic: 10000, premium: 25000, enterprise: 75000 },
            category: 'Development',
            status: 'active',
            popularity: 88,
            clients: 89,
            rating: 4.9,
            createdAt: '2024-02-10T09:00:00Z',
            updatedAt: '2024-07-25T16:45:00Z'
          },
          {
            id: '3',
            title: 'Data Analytics',
            description: 'Advanced data analytics and visualization services to help businesses make data-driven decisions.',
            shortDescription: 'Transform your data into insights',
            icon: '📊',
            features: ['Data Analysis', 'Visualization', 'Reporting', 'Predictive Analytics'],
            price: { basic: 3000, premium: 8000, enterprise: 25000 },
            category: 'Analytics',
            status: 'active',
            popularity: 92,
            clients: 234,
            rating: 4.7,
            createdAt: '2024-03-05T11:00:00Z',
            updatedAt: '2024-07-18T13:20:00Z'
          },
          {
            id: '4',
            title: 'AI Training Programs',
            description: 'Comprehensive training programs to upskill your team in AI and machine learning technologies.',
            shortDescription: 'Upskill your team with AI expertise',
            icon: '🎓',
            features: ['Custom Curriculum', 'Hands-on Training', 'Certification', 'Ongoing Support'],
            price: { basic: 2000, premium: 5000, enterprise: 15000 },
            category: 'Training',
            status: 'active',
            popularity: 85,
            clients: 67,
            rating: 4.6,
            createdAt: '2024-04-12T08:00:00Z',
            updatedAt: '2024-07-30T10:15:00Z'
          },
          {
            id: '5',
            title: 'Automation Solutions',
            description: 'Business process automation using AI and machine learning to improve efficiency and reduce costs.',
            shortDescription: 'Automate your business processes',
            icon: '🔄',
            features: ['Process Analysis', 'Automation Design', 'Implementation', 'Monitoring'],
            price: { basic: 8000, premium: 20000, enterprise: 60000 },
            category: 'Automation',
            status: 'draft',
            popularity: 78,
            clients: 45,
            rating: 4.5,
            createdAt: '2024-05-20T14:00:00Z',
            updatedAt: '2024-07-30T09:30:00Z'
          }
        ];

          setServices(mockServices);
          setFilteredServices(mockServices);
          setIsLoading(false);
        }, 1000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Filter services based on search term, category, and status
  useEffect(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(service => service.status === selectedStatus);
    }

    setFilteredServices(filtered);
  }, [services, searchTerm, selectedCategory, selectedStatus]);

  const categories = [...new Set(services.map(service => service.category))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'inactive': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return XCircle;
      case 'draft': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const handleDeleteService = async (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        console.log('🗑️ Deleting service:', serviceId);
        await databaseService.deleteService(serviceId);
        console.log('✅ Service deleted successfully');

        // Update both services and filteredServices state
        const updatedServices = services.filter(service => service.id !== serviceId);
        setServices(updatedServices);
        setFilteredServices(updatedServices);

        alert('Service deleted successfully!');
      } catch (error) {
        console.error('❌ Error deleting service:', error);
        console.error('Error details:', error instanceof Error ? error.message : error);
        alert(`Failed to delete service: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
  };

  const handleAddService = async () => {
    try {
      console.log('🚀 Starting service creation...');
      console.log('📊 Form data:', formData);

      // Validate required fields
      if (!formData.title || !formData.description || !formData.shortDescription || !formData.category) {
        alert('Please fill in all required fields (Title, Description, Short Description, Category)');
        return;
      }

      const serviceData = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        icon: formData.icon || '🛠️',
        features: formData.features.filter(f => f.trim() !== ''),
        price: {
          basic: formData.basicPrice || 0,
          premium: formData.premiumPrice || 0,
          enterprise: formData.enterprisePrice || 0
        },
        category: formData.category,
        status: (formData.status || 'draft') as "active" | "inactive" | "draft",
        popularity: 0,
        clients: 0,
        rating: 0
      };

      console.log('📊 Service data to create:', serviceData);

      const newService = await databaseService.createService(serviceData);

      console.log('✅ Service created successfully:', newService);

      setServices([...services, newService]);
      setFilteredServices([...services, newService]);
      setShowAddModal(false);
      resetForm();
      alert('Service created successfully!');
    } catch (error) {
      console.error('❌ Error creating service:', error);
      console.error('Error details:', error instanceof Error ? error.message : error);
      console.error('Stack trace:', error instanceof Error ? error.stack : "No stack trace");
      alert(`Failed to create service: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Test function to verify database connection
  const testDatabaseConnection = async () => {
    try {
      console.log('🧪 Testing database connection...');
      const testService = {
        title: 'Test Connection Service',
        description: 'This is a test service to verify database connection.',
        shortDescription: 'Test connection service',
        icon: '🧪',
        features: ['Test Feature'],
        price: { basic: 100, premium: 200, enterprise: 300 },
        category: 'Testing',
        status: 'draft' as "active" | "inactive" | "draft",
        popularity: 0,
        clients: 0,
        rating: 0
      };

      const result = await databaseService.createService(testService);
      console.log('✅ Test service created:', result);

      // Delete the test service
      await databaseService.deleteService(result.id);
      console.log('✅ Test service deleted');

      alert('Database connection test successful!');
    } catch (error) {
      console.error('❌ Database connection test failed:', error);
      alert(`Database connection test failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  // Export services function
  const handleExportServices = async () => {
    try {
      console.log('📊 Exporting services...');
      await exportService.exportData('services');
      console.log('✅ Services exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleEditService = async () => {
    if (!selectedService) return;

    try {
      const updatedService = await databaseService.updateService(selectedService.id, {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        icon: formData.icon,
        features: formData.features.filter(f => f.trim() !== ''),
        price: {
          basic: formData.basicPrice,
          premium: formData.premiumPrice,
          enterprise: formData.enterprisePrice
        },
        category: formData.category,
        status: formData.status as "active" | "inactive" | "draft"
      });

      setServices(services.map(service =>
        service.id === selectedService.id ? updatedService : service
      ));
      setShowEditModal(false);
      setSelectedService(null);
      resetForm();
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Failed to update service. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      shortDescription: '',
      icon: '',
      features: [''],
      category: '',
      basicPrice: 0,
      premiumPrice: 0,
      enterprisePrice: 0,
      status: 'draft'
    });
  };

  const openEditModal = (service: Service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      shortDescription: service.shortDescription,
      icon: service.icon,
      features: service.features.length > 0 ? service.features : [''],
      category: service.category,
      basicPrice: service.price.basic,
      premiumPrice: service.price.premium,
      enterprisePrice: service.price.enterprise,
      status: service.status
    });
    setShowEditModal(true);
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, '']
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({
      ...formData,
      features: newFeatures
    });
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Services Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage website services and offerings
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportServices}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white ml-2"
            onClick={testDatabaseConnection}
          >
            Test DB
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Services</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{services.length}</p>
            </div>
            <Wrench className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Services</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {services.filter(s => s.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {services.reduce((sum, service) => sum + service.clients, 0)}
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
                {services.length > 0 ? (services.reduce((sum, service) => sum + service.rating, 0) / services.length).toFixed(1) : '0.0'}
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
              placeholder="Search services..."
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Services Grid */}
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
        ) : filteredServices.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Wrench className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No services found</p>
          </div>
        ) : (
          filteredServices.map((service) => {
            const StatusIcon = getStatusIcon(service.status);
            return (
              <Card key={service.id} className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0 group">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{service.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors duration-200">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{service.category}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                  </span>
                </div>

                {/* Service Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Starting from</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${service.price.basic.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{service.clients} clients</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{service.rating}</span>
                    </div>
                  </div>
                  <div className="text-xs">
                    {service.popularity}% popularity
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEditModal(service)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => openEditModal(service)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Add/Edit Service Modal */}
      <Modal
        isOpen={showAddModal || showEditModal}
        onClose={() => {
          setShowAddModal(false);
          setShowEditModal(false);
          setSelectedService(null);
          resetForm();
        }}
        title={selectedService ? 'Edit Service' : 'Add New Service'}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          selectedService ? handleEditService() : handleAddService();
        }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service Title *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter service title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select category</option>
                <option value="Consulting">Consulting</option>
                <option value="Development">Development</option>
                <option value="Analytics">Analytics</option>
                <option value="Training">Training</option>
                <option value="Automation">Automation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Short Description *
            </label>
            <Input
              type="text"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Brief description for cards"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Description *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed service description"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon (Emoji)
              </label>
              <Input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="🤖"
                maxLength={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Features
            </label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    disabled={formData.features.length <= 1}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFeature}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Pricing
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Basic Price ($)</label>
                <Input
                  type="number"
                  value={formData.basicPrice}
                  onChange={(e) => setFormData({ ...formData, basicPrice: parseInt(e.target.value) || 0 })}
                  placeholder="5000"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Premium Price ($)</label>
                <Input
                  type="number"
                  value={formData.premiumPrice}
                  onChange={(e) => setFormData({ ...formData, premiumPrice: parseInt(e.target.value) || 0 })}
                  placeholder="15000"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Enterprise Price ($)</label>
                <Input
                  type="number"
                  value={formData.enterprisePrice}
                  onChange={(e) => setFormData({ ...formData, enterprisePrice: parseInt(e.target.value) || 0 })}
                  placeholder="50000"
                  min="0"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setShowEditModal(false);
                setSelectedService(null);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {selectedService ? 'Update Service' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
