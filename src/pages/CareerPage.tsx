import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Users,
  TrendingUp,
  Brain,
  Code,
  Database,
  Zap,
  ArrowRight,
  Star,
  Award,
  Globe,
  Heart,
  Coffee,
  Building,
  Calendar
} from 'lucide-react';
import { Card, Button } from '../components/ui';
import { databaseService } from '../services/httpClient';

interface Job {
  id: string;
  title: string;
  company?: string;
  location: string;
  type: string;
  level?: string;
  salary?: {
    min: number;
    max: number;
  };
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  description: string;
  requirements: string[] | string;
  responsibilities?: string[];
  benefits?: string;
  department: string;
  status?: string;
  isActive?: boolean;
  applications?: number;
  views?: number;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  category?: string;
  experience?: string;
}

export default function CareerPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [hoveredJob, setHoveredJob] = useState<string | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [departments, setDepartments] = useState([
    { id: 'all', name: 'All Positions', count: 0 }
  ]);

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const jobsData = await databaseService.getJobs();

        // Filter only active jobs for public display
        const activeJobs = jobsData.filter((job: Job) =>
          job.isActive === true || job.status === 'active'
        );
        setJobs(activeJobs);

        // Calculate department counts
        const deptCounts: { [key: string]: number } = {};
        activeJobs.forEach((job: Job) => {
          const dept = job.department?.toLowerCase() || 'other';
          deptCounts[dept] = (deptCounts[dept] || 0) + 1;
        });

        // Update departments with counts
        const updatedDepartments = [
          { id: 'all', name: 'All Positions', count: activeJobs.length },
          ...Object.entries(deptCounts).map(([dept, count]) => ({
            id: dept,
            name: dept.charAt(0).toUpperCase() + dept.slice(1),
            count
          }))
        ];
        setDepartments(updatedDepartments);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Helper function to get icon for job department
  const getJobIcon = (department: string) => {
    switch (department?.toLowerCase()) {
      case 'engineering': return Code;
      case 'research': return Database;
      case 'business': return TrendingUp;
      case 'design': return Zap;
      case 'ai': return Brain;
      default: return Briefcase;
    }
  };

  // Helper function to get gradient for job department
  const getJobGradient = (department: string) => {
    switch (department?.toLowerCase()) {
      case 'engineering': return 'from-blue-500 to-blue-600';
      case 'research': return 'from-purple-500 to-purple-600';
      case 'business': return 'from-green-500 to-green-600';
      case 'design': return 'from-pink-500 to-pink-600';
      case 'ai': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredJobs = selectedDepartment === 'all'
    ? jobs
    : jobs.filter(job => job.department === selectedDepartment);

  const benefits = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance and wellness programs" },
    { icon: TrendingUp, title: "Career Growth", description: "Continuous learning opportunities and career advancement" },
    { icon: Globe, title: "Remote Flexibility", description: "Work from anywhere with flexible schedules" },
    { icon: Coffee, title: "Great Perks", description: "Free meals, gym membership, and team events" }
  ];

  const team = [
    { name: "Dr. Sarah Chen", role: "Chief AI Officer", image: "👩‍💼", quote: "Innovation thrives in our collaborative environment" },
    { name: "Michael Rodriguez", role: "VP Engineering", image: "👨‍💻", quote: "We build the future of AI together" },
    { name: "Emily Watson", role: "Head of Research", image: "👩‍🔬", quote: "Pushing the boundaries of what's possible" },
    { name: "David Kim", role: "Product Director", image: "👨‍💼", quote: "Creating AI solutions that matter" }
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
              <Briefcase className="w-4 h-4 mr-2" />
              Join the AI Revolution
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
              Build the Future of{' '}
              <span className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                AI with Us
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12 animate-slide-up animation-delay-200">
              Join a team of world-class AI experts, researchers, and innovators who are shaping
              the future of artificial intelligence and transforming industries worldwide.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
              <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                View Open Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Learn About Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {departments.map((dept, index) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 animate-fade-in-up ${
                  selectedDepartment === dept.id
                    ? 'bg-gradient-to-r from-orange-600 to-orange-800 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/20'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {dept.name} ({dept.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join our mission to democratize AI and transform the world
            </p>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading job opportunities...</p>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Jobs Available</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedDepartment === 'all'
                    ? 'No job openings are currently available. Check back soon!'
                    : `No jobs available in ${departments.find(d => d.id === selectedDepartment)?.name || selectedDepartment} department.`
                  }
                </p>
              </div>
            ) : (
              filteredJobs.map((job, index) => {
                const IconComponent = getJobIcon(job.department);
                const gradient = getJobGradient(job.department);
                return (
                  <div
                    key={job.id}
                    className="group animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredJob(job.id)}
                    onMouseLeave={() => setHoveredJob(null)}
                  >
                    <Card className="p-6 bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border-0 relative overflow-hidden">
                      {/* Animated background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-lg transform transition-all duration-500 ${hoveredJob === job.id ? 'scale-110 rotate-6' : ''}`}>
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors duration-300">
                                {job.title}
                              </h3>
                              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-0">
                                <Calendar className="w-4 h-4 inline mr-1" />
                                {new Date(job.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
                              <div className="flex items-center">
                                <Building className="w-4 h-4 mr-1 text-orange-500" />
                                {job.company || 'ASSETMAGNETS'}
                              </div>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-orange-500" />
                                {job.location}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1 text-orange-500" />
                                {job.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </div>
                              {(job.salaryMin && job.salaryMax) && (
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-1 text-orange-500" />
                                  ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                                </div>
                              )}
                              {job.experience && (
                                <div className="flex items-center">
                                  <Award className="w-4 h-4 mr-1 text-orange-500" />
                                  {job.experience}
                                </div>
                              )}
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1 text-orange-500" />
                                {job.applications || 0} applications
                              </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                              {job.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {job.requirements && (
                                Array.isArray(job.requirements)
                                  ? job.requirements.map((req, reqIndex) => (
                                      <span
                                        key={reqIndex}
                                        className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm rounded-full"
                                      >
                                        {req}
                                      </span>
                                    ))
                                  : job.requirements.split(',').map((req, reqIndex) => (
                                      <span
                                        key={reqIndex}
                                        className="px-3 py-1 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-sm rounded-full"
                                      >
                                        {req.trim()}
                                      </span>
                                    ))
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <Button
                          className="w-full lg:w-auto bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900 transform hover:scale-105 transition-all duration-300"
                          onClick={() => {
                            // Open contact form with job application subject
                            window.location.href = '/contact?subject=Job Application: ' + encodeURIComponent(job.title);
                          }}
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              );
              })
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Work at ASSETMAGNETS?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We offer more than just a job - we provide a platform for growth, innovation, and impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                  <Card className="p-8 text-center h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {benefit.description}
                    </p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Learn from industry pioneers who are shaping the future of AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <Card className="p-8 text-center h-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300 text-3xl">
                    {member.image}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors duration-300">
                    {member.name}
                  </h3>

                  <p className="text-orange-600 dark:text-orange-400 font-medium mb-4">
                    {member.role}
                  </p>

                  <p className="text-gray-600 dark:text-gray-300 text-sm italic leading-relaxed">
                    "{member.quote}"
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "200+", label: "Team Members", icon: Users },
              { number: "50+", label: "Countries", icon: Globe },
              { number: "4.9/5", label: "Employee Rating", icon: Star },
              { number: "95%", label: "Retention Rate", icon: Award }
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
              Ready to Shape the Future of AI?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join ASSETMAGNETS and be part of a team that's transforming industries and creating the next generation of AI solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                View All Positions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Submit Your Resume
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
