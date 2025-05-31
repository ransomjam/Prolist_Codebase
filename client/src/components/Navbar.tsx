import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, List, User, Settings, Heart, LogOut, Menu, Shield, ChevronDown, Bell } from "lucide-react";
import { HomeIcon, BuildingStorefrontIcon, TagIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { icon: HomeIcon, label: 'Home', path: '/' },
    { icon: TagIcon, label: 'Listings', path: '/listings' },
    { icon: BuildingStorefrontIcon, label: 'Markets', path: '/markets' },
    { icon: HomeModernIcon, label: 'Real Estate', path: '/realestate' },
    { icon: CurrencyDollarIcon, label: 'Auctions', path: '/auctions' },
  ];

  return (
    <header className="bg-primary sticky top-0 z-50">
      {/* Facebook Lite Top Bar */}
      <div className="px-4 py-3 border-b border-blue-600">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Shield className="text-primary" size={16} />
            </div>
            <span className="font-bold text-lg text-white">ProList</span>
          </div>

          {/* Right: 3 Icons */}
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors">
              <List className="text-white" size={20} />
            </button>
            <button className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors">
              <Search className="text-white" size={20} />
            </button>
            
            <div className="relative group">
              <button className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors">
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
              className="lg:hidden w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="text-white" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Icons Row */}
      <div className="bg-primary px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map(({ icon: Icon, label, path }) => (
              <Link 
                key={path} 
                href={path}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 ${
                  location === path 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            ))}
          </div>
          
          {/* Notifications */}
          <div className="hidden lg:flex items-center">
            <button className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-200">
              <Bell className="h-6 w-6" />
              <span className="text-xs font-medium">Notifications</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-blue-600">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map(({ icon: Icon, label, path }) => (
              <Link 
                key={path} 
                href={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  location === path 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-100 hover:bg-blue-600 hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon className="h-6 w-6" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
            <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-200 w-full">
              <Bell className="h-6 w-6" />
              <span className="font-medium">Notifications</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
