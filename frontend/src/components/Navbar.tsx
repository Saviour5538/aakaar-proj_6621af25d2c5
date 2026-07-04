import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              TaskFlow
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/tasks" className="hover:text-gray-300">
              Tasks
            </Link>
            {isAuthenticated && (
              <button
                onClick={logout}
                className="hover:text-gray-300 focus:outline-none"
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/dashboard" className="block hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/tasks" className="block hover:text-gray-300">
              Tasks
            </Link>
            {isAuthenticated && (
              <button
                onClick={logout}
                className="block w-full text-left hover:text-gray-300 focus:outline-none"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;