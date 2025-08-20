import React, { useState, useEffect } from 'react';
import {
  Brain,
  Bot,
  Database,
  Eye,
  MessageSquare,
  TrendingUp,
  Zap,
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  Wrench
} from 'lucide-react';
import { Card, Button } from '../components/ui';
import { databaseService, type Service } from '../services/httpClient';

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load services from database
  useEffect(() => {
    const loadServices = async () => {
      try {
        const dbServices = await databaseService.getServices();
        // Only show active services on the public website
        const activeServices = dbServices.filter(service => service.status === 'active');
        setServices(activeServices);
      } catch (error) {
        console.error('Error loading services:', error);
        // Fallback to empty array if database fails
        setServices([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  // Static fallback services
  const staticServices = [
    {
      id: 1,
      title: "Machine Learning Solutions",
      description: "Custom ML models tailored to your business needs with predictive analytics and intelligent automation.",
      icon: Brain,
      features: ["Predictive Analytics", "Custom Model Development", "Data Pipeline Automation", "Performance Monitoring"],
      price: "Starting at $5,000",
      gradient: "from-orange-500 to-red-500",
      delay: "0ms"
    },
    {
      id: 2,
      title: "AI Chatbots & Virtual Assistants",
      description: "Intelligent conversational AI that enhances customer experience and automates support processes.",
      icon: Bot,
      features: ["Natural Language Processing", "Multi-platform Integration", "24/7 Customer Support", "Analytics Dashboard"],
      price: "Starting at $3,000",
      gradient: "from-orange-500 to-amber-500",
      delay: "100ms"
    },
    {
      id: 3,
      title: "Data Analytics & Insights",
      description: "Transform raw data into actionable insights with advanced analytics and visualization tools.",
      icon: Database,
      features: ["Real-time Analytics", "Custom Dashboards", "Data Visualization", "Business Intelligence"],
      price: "Starting at $4,000",
      gradient: "from-amber-500 to-yellow-500",
      delay: "200ms"
    },
    {
      id: 4,
      title: "Computer Vision",
      description: "Advanced image and video analysis for quality control, security, and automated inspection.",
      icon: Eye,
      features: ["Object Detection", "Image Classification", "Quality Control", "Real-time Processing"],
      price: "Starting at $6,000",
      gradient: "from-orange-600 to-orange-400",
      delay: "300ms"
    },
    {
      id: 5,
      title: "Natural Language Processing",
      description: "Extract meaning from text data with sentiment analysis, document processing, and content generation.",
      icon: MessageSquare,
      features: ["Sentiment Analysis", "Document Processing", "Content Generation", "Language Translation"],
      price: "Starting at $4,500",
      gradient: "from-red-500 to-orange-500",
      delay: "400ms"
    },
    {
      id: 6,
      title: "AI Strategy Consulting",
      description: "Expert guidance on AI adoption, implementation roadmaps, and digital transformation strategies.",
      icon: TrendingUp,
      features: ["AI Readiness Assessment", "Implementation Roadmap", "ROI Analysis", "Change Management"],
      price: "Starting at $2,500",
      gradient: "from-orange-500 to-yellow-600",
      delay: "500ms"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10"></div>
          {/* Animated background elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-amber-200 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-ping"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-8 shadow-sm animate-fade-in">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Solutions
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              Transform Your Business with{' '}
              <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                AI Services
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 animate-slide-up animation-delay-200">
              Harness the power of artificial intelligence to optimize your operations,
              enhance customer experiences, and drive unprecedented growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our AI Solutions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive AI services designed to accelerate your digital transformation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="p-8 h-full bg-white dark:bg-gray-700 shadow-lg border-0">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 animate-pulse"></div>
                  </div>
                </Card>
              ))
            ) : (
              services.map((service, index) => {
                // Check if this is a database service (has string icon) or static service (has component icon)
                const isDbService = typeof service.icon === 'string';
                const IconComponent = isDbService ? Wrench : service.icon;
                const serviceId = typeof service.id === 'string' ? service.id : String(service.id);

                return (
                  <div
                    key={serviceId}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredService(index)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <Card className="p-8 h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden">
                      {/* Animated background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    {/* Floating icon animation */}
                    <div className={`w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform transition-all duration-500 ${hoveredService === index ? 'scale-110 rotate-6' : ''}`}>
                      {isDbService ? (
                        <span className="text-2xl">{service.icon}</span>
                      ) : (
                        <IconComponent className="w-8 h-8 text-white" />
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {isDbService ? service.shortDescription || service.description : service.description}
                    </p>

                    {/* Features list with staggered animation */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-300 animate-slide-in-right"
                          style={{ animationDelay: `${index * 100 + (featureIndex * 100)}ms` }}
                        >
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-orange-600">
                        {isDbService ? `Starting at ${service.price?.basic?.toLocaleString() || '0'}` : String(service.price)}
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 transform hover:scale-105 transition-all duration-300"
                      >
                        Learn More
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })
            )}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our AI Implementation Process
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A proven methodology to ensure successful AI integration
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Analyze your business needs and identify AI opportunities", icon: "🔍" },
              { step: "02", title: "Strategy", description: "Develop a customized AI implementation roadmap", icon: "🎯" },
              { step: "03", title: "Development", description: "Build and train AI models using cutting-edge technology", icon: "⚡" },
              { step: "04", title: "Deployment", description: "Launch and integrate AI solutions into your workflow", icon: "🚀" }
            ].map((process, index) => (
              <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <span className="text-2xl">{process.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {process.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of companies already leveraging ASSETMAGNETS AI solutions to drive growth and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Your AI Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Contact Our Experts
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
