import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left Section: Brand/Logo */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-white mb-2">
              Bite<span className="text-red-400">Count</span>
            </h3>
            <p className="text-sm text-gray-400 text-center md:text-left">
              Empowering your health journey with smarter nutrition tracking.
            </p>
          </div>

          {/* Center Section: Social Media Links */}
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/mdnazishpatel"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 hover:border-red-500/50 hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6 text-gray-300 group-hover:text-red-400 transition-colors duration-300" />
            </a>
            <a
              href="https://www.linkedin.com/in/nazish-patel-8a71272a0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 hover:border-red-500/50 hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6 text-gray-300 group-hover:text-red-400 transition-colors duration-300" />
            </a>
            <a
              href="https://x.com/NazishPatel7"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-12 h-12 bg-slate-800 rounded-xl border border-slate-700 hover:border-red-500/50 hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              aria-label="X Profile"
            >
              <Twitter className="h-6 w-6 text-gray-300 group-hover:text-red-400 transition-colors duration-300" />
            </a>
          </div>

          {/* Right Section: Navigation Links */}
          <div className="flex justify-center md:justify-end">
            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <li>
                <a
                  href="/aboutus"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/aboutus"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright with Owner Name */}
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-slate-800 pt-4">
          &copy; {new Date().getFullYear()} BiteCount by Sikandar Patel. All rights reserved.
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-10 w-24 h-24 bg-red-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-16 h-16 bg-slate-600/20 rounded-full blur-2xl"></div>
    </footer>
  );
};

export default Footer;