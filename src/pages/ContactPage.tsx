import React, { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Globe,
  Linkedin,
  Twitter,
  Github,
  ArrowRight,
  CheckCircle,
  Bot,
  Zap,
  Users,
  Award
} from 'lucide-react';
import { Card, Button } from '../components/ui';
import { databaseService } from '../services/httpClient';

// ContactInfo type definition
interface ContactInfo {
  id: string;
  type: 'address' | 'phone' | 'email' | 'hours';
  title: string;
  value: string;
  icon: string;
  isActive: boolean;
  order: number;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    service: 'general'
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [globalOffices, setGlobalOffices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper function to get icon component for contact info type
  const getIconForType = (type: string) => {
    switch (type) {
      case 'address': return MapPin;
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'hours': return Clock;
      default: return MessageSquare;
    }
  };

  // Load contact info and global offices from database
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load contact info
        const dbContactInfo = await databaseService.getContactInfo();
        // Only show active contact info
        const activeContactInfo = dbContactInfo.filter(info => info.isActive);
        setContactInfo(activeContactInfo);

        // Load global offices
        const dbGlobalOffices = await databaseService.getGlobalOffices();
        // Only show active offices
        const activeOffices = dbGlobalOffices.filter(office => office.isActive);
        setGlobalOffices(activeOffices);

      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to static contact info
        setContactInfo([
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
        ]);

        // Fallback to static global offices
        setGlobalOffices([
          {
            id: '1',
            name: 'Headquarters - Silicon Valley',
            address: '123 AI Street, Tech Valley',
            city: 'San Francisco',
            country: 'United States',
            phone: '+1 (555) 123-ASSET',
            email: 'hq@assetmagnets.com',
            isHeadquarters: true
          },
          {
            id: '2',
            name: 'European Office - London',
            address: '456 Innovation Lane, Tech District',
            city: 'London',
            country: 'United Kingdom',
            phone: '+44 20 7946 0958',
            email: 'europe@assetmagnets.com',
            isHeadquarters: false
          },
          {
            id: '3',
            name: 'Asia Pacific - Singapore',
            address: '789 Digital Hub, Marina Bay',
            city: 'Singapore',
            country: 'Singapore',
            phone: '+65 6123 4567',
            email: 'apac@assetmagnets.com',
            isHeadquarters: false
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save message to database
      await databaseService.createContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.company, // Using company field as phone for now
        subject: formData.subject,
        message: formData.message,
        status: 'new',
        priority: 'medium'
      });

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
        subject: '',
        message: '',
        service: 'general'
      });
    }, 3000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const staticContactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@assetmagnets.com",
      description: "Get in touch for general inquiries",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak with our AI experts",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 AI Street, Tech City, TC 12345",
      description: "Our headquarters location",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon-Fri: 9AM-6PM PST",
      description: "We're here to help",
      gradient: "from-orange-600 to-orange-400"
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10"></div>
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-amber-200 rounded-full opacity-30 animate-float animation-delay-200"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-float animation-delay-400"></div>
          <div className="absolute bottom-40 right-1/3 w-18 h-18 bg-orange-300 rounded-full opacity-20 animate-float animation-delay-600"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-8 shadow-sm animate-fade-in">
              <MessageSquare className="w-4 h-4 mr-2" />
              Let's Connect
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              Get in Touch with{' '}
              <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Our AI Experts
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 animate-slide-up animation-delay-200">
              Ready to transform your business with AI? Our team of experts is here to help you
              navigate your AI journey and unlock new possibilities for growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Schedule Consultation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                <Bot className="w-5 h-5 mr-2" />
                Chat with AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Multiple Ways to Connect
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Choose the best way to reach us and we'll get back to you promptly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="p-8 text-center h-full bg-white dark:bg-gray-700 shadow-lg border-0">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-2xl mx-auto animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                  </div>
                </Card>
              ))
            ) : (
              contactInfo.length > 0 ? contactInfo.map((info, index) => {
                const isDbInfo = true; // All items from contactInfo are database items
                const IconComponent = getIconForType(info.type);
                const gradient = 'from-orange-500 to-red-500';

                return (
                  <div key={info.id} className="group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                    <Card className="p-8 text-center h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                        <span className="text-2xl">{info.icon}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {info.title}
                      </h3>

                      <p className="text-lg font-medium text-orange-600 dark:text-orange-400 mb-2">
                        {info.value}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Contact us via {info.type}
                      </p>
                    </Card>
                  </div>
                );
              }) : staticContactInfo.map((info, index) => {
                const IconComponent = info.icon;
                const gradient = info.gradient;

                return (
                  <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                    <Card className="p-8 text-center h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        {info.title}
                      </h3>

                      <p className="text-lg font-medium text-orange-600 dark:text-orange-400 mb-2">
                        {info.details}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {info.description}
                      </p>
                    </Card>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in-up">
              <Card className="p-8 bg-white dark:bg-gray-700 shadow-xl border-0">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Send Us a Message
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Service Interest
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="ml">Machine Learning</option>
                          <option value="consulting">AI Consulting</option>
                          <option value="training">Training & Courses</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300"
                        placeholder="Brief subject of your inquiry"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-all duration-300 resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Map & Office Info */}
            <div className="animate-fade-in-up animation-delay-200">
              <Card className="p-8 bg-white dark:bg-gray-700 shadow-xl border-0 h-full">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Global Offices
                </h3>

                {/* Simulated Map */}
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg p-8 mb-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Interactive map coming soon
                  </p>
                </div>

                <div className="space-y-4">
                  {globalOffices.map((office, index) => (
                    <div key={office.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors duration-300">
                      <div className="flex items-center mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {office.name}
                        </h4>
                        {office.isHeadquarters && (
                          <span className="ml-2 px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                            HQ
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                        📍 {office.address}, {office.city}, {office.country}
                      </p>
                      <p className="text-sm text-orange-600 dark:text-orange-400 mb-1">
                        📞 {office.phone}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        📧 {office.email}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        🕒 {office.workingHours}
                      </p>
                    </div>
                  ))}
                  {globalOffices.length === 0 && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        Loading office locations...
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Quick answers to common questions about our AI services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "How quickly can you implement AI solutions?",
                answer: "Implementation timelines vary based on complexity, but most projects are completed within 3-6 months from initial consultation to deployment."
              },
              {
                question: "Do you provide ongoing support?",
                answer: "Yes, we offer comprehensive support packages including monitoring, maintenance, updates, and 24/7 technical assistance."
              },
              {
                question: "What industries do you serve?",
                answer: "We work across all industries including healthcare, finance, retail, manufacturing, and technology, adapting our solutions to specific sector needs."
              },
              {
                question: "Can you work with our existing systems?",
                answer: "Absolutely! Our AI solutions are designed to integrate seamlessly with your current infrastructure and business processes."
              }
            ].map((faq, index) => (
              <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="p-6 bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social & CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Connect with ASSETMAGNETS
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Follow us on social media for the latest AI insights, company updates, and industry news.
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-12">
              {[
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Github, href: "#", label: "GitHub" },
                { icon: Globe, href: "#", label: "Blog" }
              ].map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transform hover:scale-110 transition-all duration-300"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Schedule a Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
