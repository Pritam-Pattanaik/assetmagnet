export default function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AM</span>
              </div>
              <span className="text-xl font-bold text-orange-400">
                ASSETMAGNETS
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering businesses with cutting-edge AI solutions and comprehensive training programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-orange-400 transition-colors">About Us</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-orange-400 transition-colors">Services</a></li>
              <li><a href="/courses" className="text-gray-300 hover:text-orange-400 transition-colors">Courses</a></li>
              <li><a href="/career" className="text-gray-300 hover:text-orange-400 transition-colors">Career</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-orange-400">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@assetmagnets.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 AI Street, Tech City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">&copy; 2024 ASSETMAGNETS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
