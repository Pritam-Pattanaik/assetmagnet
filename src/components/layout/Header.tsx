import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogIn, ChevronDown, GraduationCap, UserCheck, Shield } from 'lucide-react';
import { ThemeToggle, Button } from '../ui';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showRegisterDropdown, setShowRegisterDropdown] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const loginDropdownRef = useRef<HTMLDivElement>(null);
  const registerDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(event.target as Node)) {
        setShowLoginDropdown(false);
      }
      if (registerDropdownRef.current && !registerDropdownRef.current.contains(event.target as Node)) {
        setShowRegisterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Courses', href: '/courses' },
    { name: 'Career', href: '/career' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">AM</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                ASSETMAGNETS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-orange-600 dark:text-orange-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'}>
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {user?.name}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {/* Login Dropdown */}
                <div className="relative" ref={loginDropdownRef}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowLoginDropdown(!showLoginDropdown);
                      setShowRegisterDropdown(false);
                    }}
                    className="flex items-center"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>

                  {showLoginDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-2">
                        <Link
                          to="/login?role=student"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => setShowLoginDropdown(false)}
                        >
                          <GraduationCap className="w-4 h-4 mr-3 text-blue-500" />
                          Student Login
                        </Link>
                        <Link
                          to="/login?role=applicant"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => setShowLoginDropdown(false)}
                        >
                          <UserCheck className="w-4 h-4 mr-3 text-green-500" />
                          Candidate Login
                        </Link>
                        <Link
                          to="/login?role=admin"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => setShowLoginDropdown(false)}
                        >
                          <Shield className="w-4 h-4 mr-3 text-orange-500" />
                          Admin Login
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Register Dropdown */}
                <div className="relative" ref={registerDropdownRef}>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowRegisterDropdown(!showRegisterDropdown);
                      setShowLoginDropdown(false);
                    }}
                    className="flex items-center bg-gradient-to-r from-orange-600 to-orange-800 text-white hover:from-orange-700 hover:to-orange-900"
                  >
                    Get Started
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>

                  {showRegisterDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50">
                      <div className="p-2">
                        <Link
                          to="/register?role=student"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => setShowRegisterDropdown(false)}
                        >
                          <GraduationCap className="w-4 h-4 mr-3 text-blue-500" />
                          <div>
                            <div className="font-medium">Join as Student</div>
                            <div className="text-xs text-gray-500">Access courses & learning</div>
                          </div>
                        </Link>
                        <Link
                          to="/register?role=applicant"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => setShowRegisterDropdown(false)}
                        >
                          <UserCheck className="w-4 h-4 mr-3 text-green-500" />
                          <div>
                            <div className="font-medium">Join as Candidate</div>
                            <div className="text-xs text-gray-500">Apply for jobs & careers</div>
                          </div>
                        </Link>
                        <Link
                          to="/register?role=admin"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                          onClick={() => setShowRegisterDropdown(false)}
                        >
                          <Shield className="w-4 h-4 mr-3 text-orange-500" />
                          <div>
                            <div className="font-medium">Admin Access</div>
                            <div className="text-xs text-gray-500">Manage platform (approval required)</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
