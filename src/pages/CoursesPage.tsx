import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  Award,
  TrendingUp,
  Brain,
  Code,
  Database,
  Eye,
  MessageSquare,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Card, Button } from '../components/ui';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  const categories = [
    { id: 'all', name: 'All Courses', count: 12 },
    { id: 'beginner', name: 'Beginner', count: 4 },
    { id: 'intermediate', name: 'Intermediate', count: 5 },
    { id: 'advanced', name: 'Advanced', count: 3 }
  ];

  const courses = [
    {
      id: 1,
      title: "AI Fundamentals for Business Leaders",
      description: "Master the basics of AI and learn how to implement AI strategies in your organization.",
      instructor: "Dr. Sarah Chen",
      duration: "8 weeks",
      students: 2847,
      rating: 4.9,
      price: "$299",
      level: "beginner",
      icon: Brain,
      gradient: "from-orange-500 to-red-500",
      modules: 24,
      certificate: true,
      skills: ["AI Strategy", "Business Intelligence", "Data-Driven Decisions"]
    },
    {
      id: 2,
      title: "Machine Learning with Python",
      description: "Build and deploy machine learning models using Python, scikit-learn, and TensorFlow.",
      instructor: "Prof. Michael Rodriguez",
      duration: "12 weeks",
      students: 1923,
      rating: 4.8,
      price: "$499",
      level: "intermediate",
      icon: Code,
      gradient: "from-orange-500 to-amber-500",
      modules: 36,
      certificate: true,
      skills: ["Python Programming", "ML Algorithms", "Model Deployment"]
    },
    {
      id: 3,
      title: "Deep Learning & Neural Networks",
      description: "Advanced deep learning techniques including CNNs, RNNs, and transformer architectures.",
      instructor: "Dr. Emily Watson",
      duration: "16 weeks",
      students: 1456,
      rating: 4.9,
      price: "$699",
      level: "advanced",
      icon: Brain,
      gradient: "from-amber-500 to-yellow-500",
      modules: 48,
      certificate: true,
      skills: ["Deep Learning", "Neural Networks", "Computer Vision"]
    },
    {
      id: 4,
      title: "Data Science & Analytics",
      description: "Transform raw data into actionable insights using statistical analysis and visualization.",
      instructor: "Dr. James Park",
      duration: "10 weeks",
      students: 2156,
      rating: 4.7,
      price: "$399",
      level: "intermediate",
      icon: Database,
      gradient: "from-orange-600 to-orange-400",
      modules: 30,
      certificate: true,
      skills: ["Data Analysis", "Statistics", "Data Visualization"]
    },
    {
      id: 5,
      title: "Computer Vision Applications",
      description: "Build intelligent systems that can see and interpret visual information from the world.",
      instructor: "Dr. Lisa Zhang",
      duration: "14 weeks",
      students: 987,
      rating: 4.8,
      price: "$599",
      level: "advanced",
      icon: Eye,
      gradient: "from-red-500 to-orange-500",
      modules: 42,
      certificate: true,
      skills: ["Image Processing", "Object Detection", "OpenCV"]
    },
    {
      id: 6,
      title: "Natural Language Processing",
      description: "Create AI systems that understand and generate human language with modern NLP techniques.",
      instructor: "Prof. David Kim",
      duration: "12 weeks",
      students: 1234,
      rating: 4.9,
      price: "$549",
      level: "intermediate",
      icon: MessageSquare,
      gradient: "from-orange-500 to-yellow-600",
      modules: 36,
      certificate: true,
      skills: ["Text Processing", "Sentiment Analysis", "Language Models"]
    }
  ];

  const filteredCourses = selectedCategory === 'all'
    ? courses
    : courses.filter(course => course.level === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-amber-600/10"></div>
          {/* Animated floating elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-amber-200 rounded-full opacity-30 animate-float animation-delay-200"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-yellow-200 rounded-full opacity-25 animate-float animation-delay-400"></div>
          <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-orange-300 rounded-full opacity-20 animate-float animation-delay-600"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-800 text-sm font-medium mb-8 shadow-sm animate-fade-in">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn from Industry Experts
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              Master AI with{' '}
              <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Expert-Led Courses
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 animate-slide-up animation-delay-200">
              Transform your career with comprehensive AI courses designed by industry leaders.
              From fundamentals to advanced applications, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Browse All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in-up ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-600 to-orange-800 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/20'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <div
                  key={course.id}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <Card className="h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${course.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                    {/* Course Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${course.gradient} rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${hoveredCourse === course.id ? 'scale-110 rotate-6' : ''}`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{course.rating}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors duration-300">
                        {course.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        {course.description}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="mr-4">By {course.instructor}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                          course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="px-6 pb-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Clock className="w-4 h-4 text-orange-500 mr-1" />
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{course.duration}</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-orange-500 mr-1" />
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{course.students.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-1">
                            <BookOpen className="w-4 h-4 text-orange-500 mr-1" />
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{course.modules} modules</div>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="px-6 pb-4">
                      <div className="flex flex-wrap gap-2">
                        {course.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Course Footer */}
                    <div className="px-6 pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl font-bold text-orange-600">{course.price}</span>
                          {course.certificate && (
                            <div className="ml-3 flex items-center">
                              <Award className="w-4 h-4 text-orange-500 mr-1" />
                              <span className="text-xs text-gray-500 dark:text-gray-400">Certificate</span>
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 transform hover:scale-105 transition-all duration-300"
                        >
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              AI Learning Pathways
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Structured learning paths to guide your AI journey from beginner to expert
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI for Business",
                description: "Perfect for executives and managers looking to implement AI strategies",
                courses: ["AI Fundamentals", "Data Science Basics", "AI Strategy"],
                duration: "3 months",
                icon: "🎯",
                color: "from-orange-500 to-red-500"
              },
              {
                title: "Technical AI Track",
                description: "Comprehensive technical training for developers and engineers",
                courses: ["Machine Learning", "Deep Learning", "Computer Vision"],
                duration: "6 months",
                icon: "⚡",
                color: "from-orange-500 to-amber-500"
              },
              {
                title: "AI Specialist",
                description: "Advanced specialization in cutting-edge AI technologies",
                courses: ["Advanced ML", "NLP", "AI Research"],
                duration: "9 months",
                icon: "🚀",
                color: "from-amber-500 to-yellow-500"
              }
            ].map((path, index) => (
              <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                <Card className="p-8 h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${path.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${path.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                      <span className="text-2xl">{path.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {path.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                      {path.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Included Courses:</h4>
                    <ul className="space-y-2">
                      {path.courses.map((course, courseIndex) => (
                        <li key={courseIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Duration: {path.duration}
                    </span>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 transform hover:scale-105 transition-all duration-300"
                    >
                      Start Path
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50,000+", label: "Students Enrolled", icon: Users },
              { number: "95%", label: "Completion Rate", icon: TrendingUp },
              { number: "4.8/5", label: "Average Rating", icon: Star },
              { number: "24/7", label: "Support Available", icon: Award }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2">
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-600 to-orange-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your AI Learning Journey?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of professionals who have transformed their careers with ASSETMAGNETS AI courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Browse All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
