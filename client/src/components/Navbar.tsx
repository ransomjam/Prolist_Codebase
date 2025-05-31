import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Plus, User, Settings, Heart, LogOut, Menu, Shield, Users, MessageCircle, Monitor, Bell, TrendingUp } from "lucide-react";
import { HomeIcon, BuildingStorefrontIcon, TagIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      {/* Top Bar - Facebook style with blue text */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo with Shield */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Shield className="text-white" size={16} />
            </div>
            <span className="font-bold text-2xl text-primary">ProList</span>
          </div>

          {/* Right: 3 Icons */}
          <div className="flex items-center gap-2">
            {/* List Button */}
            <Link href="/new-listing" className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-2 transition-colors">
              <Plus className="text-gray-700" size={16} />
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">List</span>
            </Link>
            
            {/* Search Button */}
            <button 
              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="text-gray-700" size={20} />
            </button>
            
            <div className="relative group">
              <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors">
                <Menu className="text-gray-700" size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border">
                <div className="p-2">
                  <Link href="/profile" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Jam Ransom</div>
                      <div className="text-xs text-gray-500">See your profile</div>
                    </div>
                  </Link>
                  <hr className="my-2" />
                  <a href="/investments" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <span className="text-sm">💼 Investments</span>
                  </a>
                  <a href="/stocks" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <span className="text-sm">📈 Stocks</span>
                  </a>
                  <a href="/verified" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <span className="text-sm">✅ Verified Directory</span>
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <Settings size={18} className="text-gray-600" />
                    <span className="text-sm">Settings & Privacy</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <Heart size={18} className="text-gray-600" />
                    <span className="text-sm">Help & Support</span>
                  </a>
                  <hr className="my-2" />
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-gray-700">
                    <LogOut size={18} />
                    <span className="text-sm">Log Out</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search businesses, markets, properties..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Icons Row - Facebook Lite style */}
      <div className="bg-white px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Home */}
          <Link 
            href="/"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              location === '/' 
                ? 'text-primary' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HomeIcon className="h-7 w-7" />
          </Link>

          {/* Listings */}
          <Link 
            href="/listings"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              location === '/listings' 
                ? 'text-primary' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TagIcon className="h-7 w-7" />
          </Link>

          {/* Markets */}
          <Link 
            href="/markets"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              location === '/markets' 
                ? 'text-primary' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BuildingStorefrontIcon className="h-7 w-7" />
          </Link>

          {/* Real Estate */}
          <Link 
            href="/realestate"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              location === '/realestate' 
                ? 'text-primary' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <HomeModernIcon className="h-7 w-7" />
          </Link>

          {/* Auctions */}
          <Link 
            href="/auctions"
            className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              location === '/auctions' 
                ? 'text-primary' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="relative">
              <CurrencyDollarIcon className="h-7 w-7" />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </div>
            </div>
          </Link>

          {/* Notifications */}
          <button className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200">
            <div className="relative">
              <Bell className="h-7 w-7" />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                7
              </div>
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-1">
            <Link 
              href="/"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location === '/' 
                  ? 'bg-blue-50 text-primary' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <HomeIcon className="h-6 w-6" />
              <span className="font-medium">Home</span>
            </Link>
            <Link 
              href="/listings"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location === '/listings' 
                  ? 'bg-blue-50 text-primary' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <TagIcon className="h-6 w-6" />
              <span className="font-medium">Listings</span>
            </Link>
            <Link 
              href="/markets"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location === '/markets' 
                  ? 'bg-blue-50 text-primary' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <BuildingStorefrontIcon className="h-6 w-6" />
              <span className="font-medium">Markets</span>
            </Link>
            <Link 
              href="/realestate"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location === '/realestate' 
                  ? 'bg-blue-50 text-primary' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <HomeModernIcon className="h-6 w-6" />
              <span className="font-medium">Real Estate</span>
            </Link>
            <Link 
              href="/auctions"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                location === '/auctions' 
                  ? 'bg-blue-50 text-primary' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <CurrencyDollarIcon className="h-6 w-6" />
              <span className="font-medium">Auctions</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
