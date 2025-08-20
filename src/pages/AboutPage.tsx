import React, { useState } from 'react';
import {
  Target,
  Users,
  Award,
  TrendingUp,
  Sparkles,
  Brain,
  Rocket,
  Globe,
  Heart,
  Zap,
  ArrowRight,
  Star,
  CheckCircle
} from 'lucide-react';
import { Card, Button } from '../components/ui';

export default function AboutPage() {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10"></div>
          {/* Animated floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-amber-200 rounded-full opacity-30 animate-float animation-delay-200"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-25 animate-float animation-delay-400"></div>
          <div className="absolute bottom-40 right-1/3 w-18 h-18 bg-orange-300 rounded-full opacity-20 animate-float animation-delay-600"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-8 shadow-sm animate-fade-in">
              <Sparkles className="w-4 h-4 mr-2" />
              Pioneering AI Innovation Since 2020
            </div>

            <div className="flex justify-center mb-8 animate-slide-up">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
                  <span className="text-white font-bold text-4xl">AM</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl opacity-20 animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up animation-delay-200">
              Transforming Tomorrow with{' '}
              <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                AI Innovation
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 animate-slide-up animation-delay-400">
              We are a leading AI solutions company dedicated to helping businesses harness the power of
              artificial intelligence to attract, optimize, and maximize their digital assets.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-600">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Our Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              Our Purpose & Vision
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Driving the future of AI innovation with purpose and vision
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-fade-in-up animation-delay-400">
              <Card className="p-8 h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-orange-600 transition-colors duration-300">
                  Our Mission
                </h3>

                <div className="space-y-4">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    To democratize artificial intelligence by providing cutting-edge AI solutions,
                    comprehensive training programs, and expert consulting services that empower
                    businesses of all sizes to thrive in the digital age.
                  </p>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Making AI accessible and practical for every organization
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Driving sustainable growth through intelligent solutions
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="animate-fade-in-up animation-delay-600">
              <Card className="p-8 h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                  <Rocket className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 group-hover:text-orange-600 transition-colors duration-300">
                  Our Vision
                </h3>

                <div className="space-y-4">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    To become the global leader in AI-powered asset optimization, creating a world
                    where every business can leverage intelligent technologies to attract, manage,
                    and maximize the value of their digital assets.
                  </p>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300">
                      AI as a magnet for business success and opportunities
                    </p>
                  </div>

                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300">
                      Optimizing outcomes for businesses worldwide
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              These principles guide everything we do at ASSETMAGNETS
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Brain,
                title: "Innovation",
                description: "Continuously pushing the boundaries of what's possible with AI technology.",
                gradient: "from-orange-500 to-red-500",
                delay: "0ms"
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Working closely with our clients to understand and solve their unique challenges.",
                gradient: "from-orange-500 to-amber-500",
                delay: "150ms"
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Delivering the highest quality solutions and maintaining the highest standards.",
                gradient: "from-amber-500 to-yellow-500",
                delay: "300ms"
              },
              {
                icon: TrendingUp,
                title: "Growth",
                description: "Committed to the continuous growth and success of our clients and team.",
                gradient: "from-orange-600 to-orange-400",
                delay: "450ms"
              }
            ].map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: value.delay }}
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                >
                  <Card className="p-8 text-center h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform transition-all duration-500 ${hoveredValue === index ? 'scale-110 rotate-6' : ''}`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 transition-colors duration-300">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Measurable results that speak to our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Businesses Transformed", icon: Globe },
              { number: "50+", label: "Countries Served", icon: Users },
              { number: "99%", label: "Client Satisfaction", icon: Heart },
              { number: "24/7", label: "AI-Powered Support", icon: Zap }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2 transform transition-all duration-300 ${hoveredStat === index ? 'scale-110' : ''}`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Our Story
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">The Beginning</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      ASSETMAGNETS was founded with a simple yet powerful vision: to make artificial
                      intelligence accessible and transformative for businesses worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Global Expansion</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Today, we serve thousands of clients across 50+ countries, helping them leverage
                      AI to attract new opportunities and optimize their operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Future Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      Our commitment remains unchanged: to be the magnetic force that attracts success
                      to every business we serve, turning digital assets into powerful engines of growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in-up animation-delay-400">
              <Card className="p-8 bg-white dark:bg-gray-700 shadow-xl border-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10"></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                      <Star className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Award-Winning Innovation
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">AI Innovation Award 2023</span>
                      <Star className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Best AI Company 2022</span>
                      <Star className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">Tech Excellence Award</span>
                      <Star className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
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
              Join thousands of companies who trust ASSETMAGNETS to power their AI transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Contact Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
