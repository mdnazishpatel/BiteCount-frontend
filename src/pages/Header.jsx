import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { User, Settings, LogOut, Menu, X } from 'lucide-react';
import logo2 from './logo2.png'; // Adjust the path as necessary

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Placeholder user data; replace with actual user data from localStorage or API
  const user = JSON.parse(localStorage.getItem('user')) || {
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    name: 'John Doe',
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors duration-200 overflow-hidden">
              <img src={logo2} alt="BiteCount Logo" className="h-full w-full object-cover" /> {/* Adjusted to fill the circular container */}
            </div>
            <span
              className="text-2xl font-bold text-white hover:text-red-400 transition-colors duration-200 cursor-pointer"
              onClick={() => navigate('/home')}
            >
              BiteCount
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/home"
              className={`font-medium transition-all duration-200 pb-1 ${
                isActive('/home')
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-slate-300 hover:text-red-400 border-b-2 border-transparent hover:border-red-400/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/count"
              className={`font-medium transition-all duration-200 pb-1 ${
                isActive('/count')
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-slate-300 hover:text-red-400 border-b-2 border-transparent hover:border-red-400/50'
              }`}
            >
              CountCalories
            </Link>
            <Link
              to="/premium"
              className={`font-medium transition-all duration-200 pb-1 ${
                isActive('/premium')
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-slate-300 hover:text-red-400 border-b-2 border-transparent hover:border-red-400/50'
              }`}
            >
              Premium
            </Link>
            <Link
              to="/aboutus"
              className={`font-medium transition-all duration-200 pb-1 ${
                isActive('/aboutus')
                  ? 'text-white border-b-2 border-red-600'
                  : 'text-slate-300 hover:text-red-400 border-b-2 border-transparent hover:border-red-400/50'
              }`}
            >
              About Us
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Profile Picture with Dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 focus:outline-none group"
              aria-label="User menu"
            >
              <div className="relative">
                <img
                  src={logo2}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-slate-600 group-hover:border-red-500 object-cover transition-all duration-200 shadow-lg"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
              </div>
              <span className="hidden sm:block text-slate-300 group-hover:text-white text-sm font-medium transition-colors duration-200">
                {user.name || 'User'}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
                <div className="absolute right-0 mt-3 w-56 bg-slate-800/95 backdrop-blur-md border border-slate-600/50 rounded-xl shadow-2xl py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-slate-700/50">
                    <div className="flex items-center space-x-3">
                      <img
                        src={logo2}
                        alt="Profile"
                        className="h-8 w-8 rounded-full border border-slate-600 object-cover"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">{user.name || 'User'}</p>
                        {/* <p className="text-slate-400 text-xs">Premium Member</p> */}
                      </div>
                    </div>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 text-sm text-slate-200 hover:bg-slate-700/50 hover:text-red-400 transition-all duration-200 group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/stng"
                      className="flex items-center px-4 py-3 text-sm text-slate-200 hover:bg-slate-700/50 hover:text-red-400 transition-all duration-200 group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-slate-700/50 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-slate-200 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200 group"
                    >
                      <LogOut className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800/95 border-t border-slate-700/50 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col items-center py-4 space-y-4">
              <Link
                to="/home"
                className={`text-lg font-medium transition-all duration-200 ${
                  isActive('/home')
                    ? 'text-red-400 border-l-4 border-red-600 pl-2'
                    : 'text-slate-300 hover:text-red-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/count"
                className={`text-lg font-medium transition-all duration-200 ${
                  isActive('/count')
                    ? 'text-red-400 border-l-4 border-red-600 pl-2'
                    : 'text-slate-300 hover:text-red-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CountCalories
              </Link>
              <Link
                to="/premium"
                className={`text-lg font-medium transition-all duration-200 ${
                  isActive('/premium')
                    ? 'text-red-400 border-l-4 border-red-600 pl-2'
                    : 'text-slate-300 hover:text-red-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Premium
              </Link>
              <Link
                to="/aboutus"
                className={`text-lg font-medium transition-all duration-200 ${
                  isActive('/aboutus')
                    ? 'text-red-400 border-l-4 border-red-600 pl-2'
                    : 'text-slate-300 hover:text-red-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="border-t border-slate-700/50 w-full my-2"></div>
              <Link
                to="/profile"
                className={`text-lg font-medium transition-all duration-200 ${
                  isActive('/profile')
                    ? 'text-red-400 border-l-4 border-red-600 pl-2'
                    : 'text-slate-300 hover:text-red-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to="/stng"
                className={`text-lg font-medium transition-all duration-200 ${
                  isActive('/settings')
                    ? 'text-red-400 border-l-4 border-red-600 pl-2'
                    : 'text-slate-300 hover:text-red-400'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="text-lg font-medium text-slate-300 hover:text-red-400 transition-all duration-200 w-full text-left pl-4"
              >
                Sign Out
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;