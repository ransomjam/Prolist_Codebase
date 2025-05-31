import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, MessageCircle, User, Settings, Heart, LogOut, Menu, Shield, ChevronDown } from "lucide-react";
import { HomeIcon, BuildingStorefrontIcon, TagIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: BuildingStorefrontIcon, label: 'Markets', path: '/markets' },
    { icon: TagIcon, label: 'Listings', path: '/listings' },
    { icon: HomeModernIcon, label: 'Real Estate', path: '/realestate' },
    { icon: CurrencyDollarIcon, label: 'Auctions', path: '/auctions' },
  ];

  return (
    <header className="bg-primary shadow-md sticky top-0 z-50">
      {/* Facebook-style Blue Header */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo and Search */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <Shield className="text-primary" size={20} />
              </div>
              <span className="font-bold text-xl text-white hidden sm:block">ProList</span>
            </div>
            
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search ProList" 
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:bg-white focus:shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
              <Bell className="text-white" size={20} />
            </button>
            <button className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
              <MessageCircle className="text-white" size={20} />
            </button>
            
            <div className="relative group">
              <button className="w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                <User className="text-white" size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <Link href="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">John Doe</div>
                      <div className="text-xs text-gray-500">See your profile</div>
                    </div>
                  </Link>
                  <hr className="my-2" />
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <Settings size={18} className="text-gray-600" />
                    <span className="text-sm">Settings & Privacy</span>
                    <ChevronDown size={16} className="text-gray-400 ml-auto" />
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <Heart size={18} className="text-gray-600" />
                    <span className="text-sm">Help & Support</span>
                    <ChevronDown size={16} className="text-gray-400 ml-auto" />
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-gray-700">
                    <LogOut size={18} />
                    <span className="text-sm">Log Out</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden w-10 h-10 bg-blue-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Facebook-style White Navigation Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4">
          <div className="flex items-center justify-center max-w-4xl mx-auto">
            <div className="hidden lg:flex items-center">
              {navLinks.map(({ icon: Icon, label, path }) => (
                <Link 
                  key={path} 
                  href={path}
                  className={`flex items-center gap-2 px-8 py-4 border-b-4 transition-all duration-200 ${
                    location === path 
                      ? 'border-primary text-primary bg-blue-50' 
                      : 'border-transparent text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="font-medium">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ icon: Icon, label, path }) => (
              <Link 
                key={path} 
                href={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location === path 
                    ? 'bg-blue-50 text-primary' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-6 w-6" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search ProList..." 
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
