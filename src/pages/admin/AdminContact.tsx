import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Save,
  X,
  User,
  Calendar,
  Send,
  Globe,
  Building,
  HelpCircle,
  Tag,
  ArrowUp,
  ArrowDown,
  Star
} from 'lucide-react';
import { Card, Button, Modal, Input, Textarea } from '../../components/ui';
import { databaseService } from '../../services/httpClient';
import { exportService } from '../../services/exportService';

// Type definitions for contact management
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
  latitude?: number;
  longitude?: number;
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

export default function AdminContact() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [globalOffices, setGlobalOffices] = useState<GlobalOffice[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'messages' | 'contact-info' | 'global-offices' | 'faq'>('messages');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showContactInfoModal, setShowContactInfoModal] = useState(false);
  const [showOfficeModal, setShowOfficeModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [selectedContactInfo, setSelectedContactInfo] = useState<ContactInfo | null>(null);
  const [selectedOffice, setSelectedOffice] = useState<GlobalOffice | null>(null);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [replyText, setReplyText] = useState('');
  const [contactFormData, setContactFormData] = useState({
    type: 'address' as 'address' | 'phone' | 'email' | 'hours',
    title: '',
    value: '',
    icon: '',
    isActive: true,
    order: 0
  });

  const [officeFormData, setOfficeFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
    phone: '',
    email: '',
    timezone: '',
    isHeadquarters: false,
    isActive: true,
    workingHours: '',
    coordinates: { lat: 0, lng: 0 }
  });

  const [faqFormData, setFaqFormData] = useState({
    question: '',
    answer: '',
    category: '',
    order: 0,
    isActive: true,
    tags: [] as string[]
  });

  // Load data from database
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        await databaseService.initializeDefaultData();
        const dbMessages = await databaseService.getContactMessages();
        const dbContactInfo = await databaseService.getContactInfo();
        const dbGlobalOffices = await databaseService.getGlobalOffices();
        const dbFaqs = await databaseService.getFAQs();

        setMessages(dbMessages);
        setContactInfo(dbContactInfo);
        setGlobalOffices(dbGlobalOffices);
        setFaqs(dbFaqs);
        setFilteredMessages(dbMessages);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to mock data
        setTimeout(() => {
        const mockMessages: ContactMessage[] = [
          {
            id: '1',
            name: 'John Smith',
            email: 'john.smith@email.com',
            phone: '+1 (555) 123-4567',
            subject: 'AI Consulting Inquiry',
            message: 'Hi, I\'m interested in your AI consulting services for my startup. Could you provide more information about your packages and pricing?',
            status: 'new',
            priority: 'high',
            createdAt: '2024-07-30T10:30:00Z',
            updatedAt: '2024-07-30T10:30:00Z'
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            email: 'sarah.j@company.com',
            phone: '+1 (555) 987-6543',
            subject: 'Training Program Details',
            message: 'We\'re looking to train our team of 20 developers in machine learning. What training programs do you offer?',
            status: 'read',
            priority: 'medium',
            createdAt: '2024-07-29T14:15:00Z',
            updatedAt: '2024-07-30T09:00:00Z'
          },
          {
            id: '3',
            name: 'Michael Brown',
            email: 'mbrown@tech.com',
            subject: 'Partnership Opportunity',
            message: 'Hello, I represent a tech company interested in exploring partnership opportunities with ASSETMAGNETS.',
            status: 'replied',
            priority: 'high',
            createdAt: '2024-07-28T16:45:00Z',
            updatedAt: '2024-07-29T11:30:00Z',
            reply: 'Thank you for your interest! We\'d love to discuss partnership opportunities. I\'ll have our business development team reach out to you.',
            repliedAt: '2024-07-29T11:30:00Z',
            repliedBy: 'Admin User'
          },
          {
            id: '4',
            name: 'Emily Davis',
            email: 'emily.davis@startup.io',
            phone: '+1 (555) 456-7890',
            subject: 'Data Analytics Service',
            message: 'Can you help us implement data analytics for our e-commerce platform? We need insights into customer behavior.',
            status: 'new',
            priority: 'medium',
            createdAt: '2024-07-30T08:20:00Z',
            updatedAt: '2024-07-30T08:20:00Z'
          },
          {
            id: '5',
            name: 'Robert Wilson',
            email: 'rwilson@enterprise.com',
            subject: 'Enterprise AI Solution',
            message: 'We\'re a large enterprise looking for comprehensive AI solutions. Please contact us to discuss our requirements.',
            status: 'archived',
            priority: 'low',
            createdAt: '2024-07-25T12:00:00Z',
            updatedAt: '2024-07-26T15:30:00Z'
          }
        ];

        const mockContactInfo: ContactInfo[] = [
          {
            id: '1',
            type: 'address',
            title: 'Office Address',
            value: '123 AI Street, Tech Valley, CA 94000',
            icon: '📍',
            isActive: true,
            order: 1
          },
          {
            id: '2',
            type: 'phone',
            title: 'Phone Number',
            value: '+1 (555) 123-ASSET',
            icon: '📞',
            isActive: true,
            order: 2
          },
          {
            id: '3',
            type: 'email',
            title: 'Email Address',
            value: 'contact@assetmagnets.com',
            icon: '✉️',
            isActive: true,
            order: 3
          },
          {
            id: '4',
            type: 'hours',
            title: 'Business Hours',
            value: 'Mon-Fri: 9:00 AM - 6:00 PM PST',
            icon: '🕒',
            isActive: true,
            order: 4
          }
        ];

          setMessages(mockMessages);
          setContactInfo(mockContactInfo);
          setFilteredMessages(mockMessages);
          setIsLoading(false);
        }, 1000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter messages based on search term, status, and priority
  useEffect(() => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(message => 
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(message => message.status === selectedStatus);
    }

    if (selectedPriority !== 'all') {
      filtered = filtered.filter(message => message.priority === selectedPriority);
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm, selectedStatus, selectedPriority]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'read': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'replied': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return AlertCircle;
      case 'read': return Eye;
      case 'replied': return CheckCircle;
      case 'archived': return XCircle;
      default: return AlertCircle;
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await databaseService.deleteContactMessage(messageId);
        setMessages(messages.filter(message => message.id !== messageId));
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Failed to delete message. Please try again.');
      }
    }
  };

  const handleReplyMessage = async () => {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      const updatedMessage = await databaseService.updateContactMessage(selectedMessage.id, {
        status: 'replied',
        reply: replyText,
        repliedAt: new Date().toISOString(),
        repliedBy: 'Admin User'
      });

      setMessages(messages.map(message =>
        message.id === selectedMessage.id ? updatedMessage : message
      ));
      setShowReplyModal(false);
      setSelectedMessage(null);
      setReplyText('');
    } catch (error) {
      console.error('Error replying to message:', error);
      alert('Failed to send reply. Please try again.');
    }
  };

  const handleStatusChange = async (messageId: string, newStatus: 'new' | 'read' | 'replied' | 'archived') => {
    try {
      const updatedMessage = await databaseService.updateContactMessage(messageId, {
        status: newStatus
      });

      setMessages(messages.map(message =>
        message.id === messageId ? updatedMessage : message
      ));
    } catch (error) {
      console.error('Error updating message status:', error);
      alert('Failed to update message status. Please try again.');
    }
  };

  const openReplyModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    setReplyText(message.reply || '');
    setShowReplyModal(true);
    
    // Mark as read if it's new
    if (message.status === 'new') {
      handleStatusChange(message.id, 'read');
    }
  };

  const handleAddContactInfo = async () => {
    try {
      const newContactInfo = await databaseService.createContactInfo({
        type: contactFormData.type,
        title: contactFormData.title,
        value: contactFormData.value,
        icon: contactFormData.icon,
        isActive: contactFormData.isActive,
        order: contactInfo.length + 1
      });

      setContactInfo([...contactInfo, newContactInfo]);
      setShowContactInfoModal(false);
      resetContactForm();
    } catch (error) {
      console.error('Error creating contact info:', error);
      alert('Failed to create contact info. Please try again.');
    }
  };

  const handleEditContactInfo = async () => {
    if (!selectedContactInfo) return;

    try {
      const updatedContactInfo = await databaseService.updateContactInfo(selectedContactInfo.id, {
        type: contactFormData.type,
        title: contactFormData.title,
        value: contactFormData.value,
        icon: contactFormData.icon,
        isActive: contactFormData.isActive
      });

      setContactInfo(contactInfo.map(info =>
        info.id === selectedContactInfo.id ? updatedContactInfo : info
      ));
      setShowContactInfoModal(false);
      setSelectedContactInfo(null);
      resetContactForm();
    } catch (error) {
      console.error('Error updating contact info:', error);
      alert('Failed to update contact info. Please try again.');
    }
  };

  const handleDeleteContactInfo = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact info?')) return;

    try {
      await databaseService.deleteContactInfo(id);
      setContactInfo(contactInfo.filter(info => info.id !== id));
    } catch (error) {
      console.error('Error deleting contact info:', error);
      alert('Failed to delete contact info. Please try again.');
    }
  };

  const resetContactForm = () => {
    setContactFormData({
      type: 'address',
      title: '',
      value: '',
      icon: '',
      isActive: true,
      order: 0
    });
  };

  // Export functions
  const handleExportMessages = async () => {
    try {
      console.log('📧 Exporting contact messages...');
      await exportService.exportData('contact-messages');
      console.log('✅ Contact messages exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleExportContactInfo = async () => {
    try {
      console.log('📞 Exporting contact info...');
      await exportService.exportData('contact-info');
      console.log('✅ Contact info exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleExportGlobalOffices = async () => {
    try {
      console.log('🌍 Exporting global offices...');
      await exportService.exportData('global-offices');
      console.log('✅ Global offices exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleExportFAQs = async () => {
    try {
      console.log('❓ Exporting FAQs...');
      await exportService.exportData('faqs');
      console.log('✅ FAQs exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleExportAll = async () => {
    try {
      console.log('📊 Exporting all contact data...');
      await exportService.exportData('all');
      console.log('✅ All contact data exported successfully');
    } catch (error) {
      console.error('❌ Export failed:', error);
      alert(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const openContactInfoModal = (info?: ContactInfo) => {
    if (info) {
      setSelectedContactInfo(info);
      setContactFormData({
        type: info.type,
        title: info.title,
        value: info.value,
        icon: info.icon,
        isActive: info.isActive,
        order: info.order
      });
    } else {
      setSelectedContactInfo(null);
      resetContactForm();
    }
    setShowContactInfoModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contact Management
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage contact messages, contact information, global offices, and FAQs
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportAll}
          >
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            onClick={() => openContactInfoModal()}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Contact Info
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('messages')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'messages'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <MessageSquare className="w-4 h-4 mr-2 inline" />
            Messages
          </button>
          <button
            onClick={() => setActiveTab('contact-info')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contact-info'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Phone className="w-4 h-4 mr-2 inline" />
            Contact Info
          </button>
          <button
            onClick={() => setActiveTab('global-offices')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'global-offices'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Globe className="w-4 h-4 mr-2 inline" />
            Global Offices
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'faq'
                ? 'border-orange-500 text-orange-600 dark:text-orange-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <HelpCircle className="w-4 h-4 mr-2 inline" />
            FAQ
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'messages' && (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Messages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{messages.length}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Messages</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(m => m.status === 'new').length}
              </p>
            </div>
            <AlertCircle className="w-8 h-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Replied</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(m => m.status === 'replied').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">High Priority</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {messages.filter(m => m.priority === 'high').length}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Contact Information Management */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Contact Information</h3>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportContactInfo}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={() => openContactInfoModal()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Info
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map((info) => (
            <div key={info.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{info.icon}</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{info.title}</span>
                </div>
                <div className="flex space-x-1">
                  <Button size="sm" variant="outline" onClick={() => openContactInfoModal(info)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to delete this contact info?')) {
                        try {
                          await databaseService.deleteContactInfo(info.id);
                          setContactInfo(contactInfo.filter(c => c.id !== info.id));
                        } catch (error) {
                          console.error('Error deleting contact info:', error);
                          alert('Failed to delete contact info. Please try again.');
                        }
                      }
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{info.value}</p>
              <div className="mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  info.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                  {info.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Filters and Search */}
      <Card className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex space-x-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
              <option value="archived">Archived</option>
            </select>

            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            </Card>
          ))
        ) : filteredMessages.length === 0 ? (
          <Card className="p-12 bg-white dark:bg-gray-800 shadow-lg border-0 text-center">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No messages found</p>
          </Card>
        ) : (
          filteredMessages.map((message) => {
            const StatusIcon = getStatusIcon(message.status);
            return (
              <Card key={message.id} className="p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                {/* Message Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{message.name}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}>
                        {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)} Priority
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{message.email}</span>
                      </div>
                      {message.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{message.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">{message.subject}</h4>
                </div>

                {/* Message */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{message.message}</p>
                </div>

                {/* Reply */}
                {message.reply && (
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">Reply from {message.repliedBy}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {message.repliedAt && new Date(message.repliedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{message.reply}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openReplyModal(message)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {message.reply ? 'Update Reply' : 'Reply'}
                  </Button>
                  <select
                    value={message.status}
                    onChange={(e) => handleStatusChange(message.id, e.target.value as any)}
                    className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    onClick={() => handleDeleteMessage(message.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>


        </>
      )}

      {/* Contact Info Tab */}
      {activeTab === 'contact-info' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
            <Button
              onClick={() => openContactInfoModal()}
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact Info
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactInfo.map((info) => (
              <Card key={info.id} className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{info.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{info.value}</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${
                        info.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {info.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openContactInfoModal(info)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteContactInfo(info.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Global Offices Tab */}
      {activeTab === 'global-offices' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Global Offices</h2>
            <Button
              onClick={() => setShowOfficeModal(true)}
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Office
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {globalOffices.map((office) => (
              <Card key={office.id} className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <Building className="w-8 h-8 text-orange-500" />
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                        {office.name}
                        {office.isHeadquarters && (
                          <Star className="w-4 h-4 text-yellow-500 ml-2" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{office.city}, {office.country}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedOffice(office);
                        setOfficeFormData({
                          name: office.name,
                          address: office.address,
                          city: office.city,
                          country: office.country,
                          phone: office.phone,
                          email: office.email,
                          timezone: office.timezone,
                          isHeadquarters: office.isHeadquarters,
                          isActive: office.isActive,
                          workingHours: office.workingHours,
                          coordinates: office.coordinates || { lat: 0, lng: 0 }
                        });
                        setShowOfficeModal(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this office?')) {
                          try {
                            await databaseService.deleteGlobalOffice(office.id);
                            const updatedOffices = await databaseService.getGlobalOffices();
                            setGlobalOffices(updatedOffices);
                          } catch (error) {
                            console.error('Error deleting office:', error);
                          }
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {office.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    {office.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    {office.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {office.workingHours}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{office.timezone}</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      office.isActive
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {office.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
            <Button
              onClick={() => setShowFaqModal(true)}
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={faq.id} className="p-6 bg-white dark:bg-gray-800 shadow-lg border-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <HelpCircle className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {faq.category} • Order: {faq.order}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        faq.isActive
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {faq.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{faq.answer}</p>
                    <div className="flex flex-wrap gap-2">
                      {faq.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedFaq(faq);
                          setFaqFormData({
                            question: faq.question,
                            answer: faq.answer,
                            category: faq.category,
                            order: faq.order,
                            isActive: faq.isActive,
                            tags: faq.tags
                          });
                          setShowFaqModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          if (window.confirm('Are you sure you want to delete this FAQ?')) {
                            try {
                              await databaseService.deleteFAQ(faq.id);
                              const updatedFaqs = await databaseService.getFAQs();
                              setFaqs(updatedFaqs);
                            } catch (error) {
                              console.error('Error deleting FAQ:', error);
                            }
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          try {
                            await databaseService.updateFAQ(faq.id, { order: faq.order - 1 });
                            const updatedFaqs = await databaseService.getFAQs();
                            setFaqs(updatedFaqs);
                          } catch (error) {
                            console.error('Error updating FAQ order:', error);
                          }
                        }}
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          try {
                            await databaseService.updateFAQ(faq.id, { order: faq.order + 1 });
                            const updatedFaqs = await databaseService.getFAQs();
                            setFaqs(updatedFaqs);
                          } catch (error) {
                            console.error('Error updating FAQ order:', error);
                          }
                        }}
                        disabled={index === faqs.length - 1}
                      >
                        <ArrowDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Global Office Modal */}
      <Modal
        isOpen={showOfficeModal}
        onClose={() => {
          setShowOfficeModal(false);
          setSelectedOffice(null);
          setOfficeFormData({
            name: '',
            address: '',
            city: '',
            country: '',
            phone: '',
            email: '',
            timezone: '',
            isHeadquarters: false,
            isActive: true,
            workingHours: '',
            coordinates: { lat: 0, lng: 0 }
          });
        }}
        title={selectedOffice ? 'Edit Global Office' : 'Add Global Office'}
      >
        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (selectedOffice) {
              await databaseService.updateGlobalOffice(selectedOffice.id, officeFormData);
            } else {
              await databaseService.createGlobalOffice(officeFormData);
            }
            const updatedOffices = await databaseService.getGlobalOffices();
            setGlobalOffices(updatedOffices);
            setShowOfficeModal(false);
            setSelectedOffice(null);
            setOfficeFormData({
              name: '',
              address: '',
              city: '',
              country: '',
              phone: '',
              email: '',
              timezone: '',
              isHeadquarters: false,
              isActive: true,
              workingHours: '',
              coordinates: { lat: 0, lng: 0 }
            });
          } catch (error) {
            console.error('Error saving office:', error);
          }
        }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Office Name *
              </label>
              <Input
                type="text"
                value={officeFormData.name}
                onChange={(e) => setOfficeFormData({ ...officeFormData, name: e.target.value })}
                placeholder="e.g., Headquarters - Silicon Valley"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address *
              </label>
              <Input
                type="text"
                value={officeFormData.address}
                onChange={(e) => setOfficeFormData({ ...officeFormData, address: e.target.value })}
                placeholder="Street address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                City *
              </label>
              <Input
                type="text"
                value={officeFormData.city}
                onChange={(e) => setOfficeFormData({ ...officeFormData, city: e.target.value })}
                placeholder="City"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Country *
              </label>
              <Input
                type="text"
                value={officeFormData.country}
                onChange={(e) => setOfficeFormData({ ...officeFormData, country: e.target.value })}
                placeholder="Country"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Phone *
              </label>
              <Input
                type="tel"
                value={officeFormData.phone}
                onChange={(e) => setOfficeFormData({ ...officeFormData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <Input
                type="email"
                value={officeFormData.email}
                onChange={(e) => setOfficeFormData({ ...officeFormData, email: e.target.value })}
                placeholder="office@assetmagnets.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Timezone *
              </label>
              <Input
                type="text"
                value={officeFormData.timezone}
                onChange={(e) => setOfficeFormData({ ...officeFormData, timezone: e.target.value })}
                placeholder="PST (UTC-8)"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Working Hours *
              </label>
              <Input
                type="text"
                value={officeFormData.workingHours}
                onChange={(e) => setOfficeFormData({ ...officeFormData, workingHours: e.target.value })}
                placeholder="Mon-Fri: 9:00 AM - 6:00 PM"
                required
              />
            </div>
            <div className="md:col-span-2 flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={officeFormData.isHeadquarters}
                  onChange={(e) => setOfficeFormData({ ...officeFormData, isHeadquarters: e.target.checked })}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Headquarters</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={officeFormData.isActive}
                  onChange={(e) => setOfficeFormData({ ...officeFormData, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowOfficeModal(false);
                setSelectedOffice(null);
                setOfficeFormData({
                  name: '',
                  address: '',
                  city: '',
                  country: '',
                  phone: '',
                  email: '',
                  timezone: '',
                  isHeadquarters: false,
                  isActive: true,
                  workingHours: '',
                  coordinates: { lat: 0, lng: 0 }
                });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {selectedOffice ? 'Update Office' : 'Add Office'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* FAQ Modal */}
      <Modal
        isOpen={showFaqModal}
        onClose={() => {
          setShowFaqModal(false);
          setSelectedFaq(null);
          setFaqFormData({
            question: '',
            answer: '',
            category: '',
            order: 0,
            isActive: true,
            tags: []
          });
        }}
        title={selectedFaq ? 'Edit FAQ' : 'Add FAQ'}
      >
        <form onSubmit={async (e) => {
          e.preventDefault();
          try {
            if (selectedFaq) {
              await databaseService.updateFAQ(selectedFaq.id, faqFormData);
            } else {
              await databaseService.createFAQ(faqFormData);
            }
            const updatedFaqs = await databaseService.getFAQs();
            setFaqs(updatedFaqs);
            setShowFaqModal(false);
            setSelectedFaq(null);
            setFaqFormData({
              question: '',
              answer: '',
              category: '',
              order: 0,
              isActive: true,
              tags: []
            });
          } catch (error) {
            console.error('Error saving FAQ:', error);
          }
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question *
            </label>
            <Input
              type="text"
              value={faqFormData.question}
              onChange={(e) => setFaqFormData({ ...faqFormData, question: e.target.value })}
              placeholder="What is your question?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Answer *
            </label>
            <textarea
              value={faqFormData.answer}
              onChange={(e) => setFaqFormData({ ...faqFormData, answer: e.target.value })}
              placeholder="Provide a detailed answer..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <Input
                type="text"
                value={faqFormData.category}
                onChange={(e) => setFaqFormData({ ...faqFormData, category: e.target.value })}
                placeholder="e.g., Services, Pricing, Support"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order
              </label>
              <Input
                type="number"
                value={faqFormData.order}
                onChange={(e) => setFaqFormData({ ...faqFormData, order: parseInt(e.target.value) || 0 })}
                placeholder="Display order"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags (comma-separated)
            </label>
            <Input
              type="text"
              value={faqFormData.tags.join(', ')}
              onChange={(e) => setFaqFormData({
                ...faqFormData,
                tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
              })}
              placeholder="AI, services, consulting, pricing"
            />
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={faqFormData.isActive}
                onChange={(e) => setFaqFormData({ ...faqFormData, isActive: e.target.checked })}
                className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Active</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowFaqModal(false);
                setSelectedFaq(null);
                setFaqFormData({
                  question: '',
                  answer: '',
                  category: '',
                  order: 0,
                  isActive: true,
                  tags: []
                });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {selectedFaq ? 'Update FAQ' : 'Add FAQ'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modals */}
      {/* Reply Modal */}
      <Modal
        isOpen={showReplyModal}
        onClose={() => {
          setShowReplyModal(false);
          setSelectedMessage(null);
          setReplyText('');
        }}
        title={`Reply to ${selectedMessage?.name}`}
      >
        <div className="space-y-4">
          {selectedMessage && (
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Original Message:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                <strong>Subject:</strong> {selectedMessage.subject}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedMessage.message}
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Reply *
            </label>
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply here..."
              rows={6}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={() => {
                setShowReplyModal(false);
                setSelectedMessage(null);
                setReplyText('');
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReplyMessage}
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
              disabled={!replyText.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </div>
      </Modal>

      {/* Contact Info Modal */}
      <Modal
        isOpen={showContactInfoModal}
        onClose={() => {
          setShowContactInfoModal(false);
          setSelectedContactInfo(null);
          resetContactForm();
        }}
        title={selectedContactInfo ? 'Edit Contact Info' : 'Add Contact Info'}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          selectedContactInfo ? handleEditContactInfo() : handleAddContactInfo();
        }} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type *
              </label>
              <select
                value={contactFormData.type}
                onChange={(e) => setContactFormData({ ...contactFormData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="address">Address</option>
                <option value="phone">Phone</option>
                <option value="email">Email</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon (Emoji)
              </label>
              <Input
                type="text"
                value={contactFormData.icon}
                onChange={(e) => setContactFormData({ ...contactFormData, icon: e.target.value })}
                placeholder="📍"
                maxLength={2}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <Input
              type="text"
              value={contactFormData.title}
              onChange={(e) => setContactFormData({ ...contactFormData, title: e.target.value })}
              placeholder="Office Address"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Value *
            </label>
            <Input
              type="text"
              value={contactFormData.value}
              onChange={(e) => setContactFormData({ ...contactFormData, value: e.target.value })}
              placeholder="123 Main St, City, State 12345"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={contactFormData.isActive}
              onChange={(e) => setContactFormData({ ...contactFormData, isActive: e.target.checked })}
              className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Active (visible on website)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowContactInfoModal(false);
                setSelectedContactInfo(null);
                resetContactForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {selectedContactInfo ? 'Update Info' : 'Add Info'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
