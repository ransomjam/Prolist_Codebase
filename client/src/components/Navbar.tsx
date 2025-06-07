import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Plus, User, Settings, Heart, LogOut, Menu, Shield, Users, MessageCircle, Monitor, TrendingUp, Bell, ShoppingBag, List, Building2, Home, Flame, Briefcase, TrendingUp as StockIcon, CheckCircle, Tag } from "lucide-react";
import { HomeIcon, BuildingStorefrontIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import NotificationDropdown from "./NotificationDropdown";
import SearchDropdown from "./SearchDropdown";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [location] = useLocation();
  const { logout, isAuthenticated, user } = useAuth();

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
            <Link href="/product-listing" className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 rounded-full px-3 py-2 transition-colors">
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
                  

                  
                  <div className="grid grid-cols-2 gap-3 p-3">
                    <a href="/products" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-150 hover:from-blue-100 hover:via-blue-150 hover:to-blue-200 transition-all duration-300 border border-blue-200 shadow-sm hover:shadow-md">
                      <ShoppingBag className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-xs font-semibold text-blue-800 text-center">Marketplace</div>
                    </a>
                    <a href="/markets" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-green-50 via-green-100 to-green-150 hover:from-green-100 hover:via-green-150 hover:to-green-200 transition-all duration-300 border border-green-200 shadow-sm hover:shadow-md">
                      <BuildingStorefrontIcon className="w-7 h-7 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-xs font-semibold text-green-800 text-center">Markets</div>
                    </a>
                    <a href="/realestate" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-150 hover:from-purple-100 hover:via-purple-150 hover:to-purple-200 transition-all duration-300 border border-purple-200 shadow-sm hover:shadow-md">
                      <HomeModernIcon className="w-7 h-7 text-purple-600 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-xs font-semibold text-purple-800 text-center">Real Estate</div>
                    </a>
                    <a href="/auctions" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-red-50 via-red-100 to-red-150 hover:from-red-100 hover:via-red-150 hover:to-red-200 transition-all duration-300 border border-red-200 shadow-sm hover:shadow-md">
                      <CurrencyDollarIcon className="w-7 h-7 text-red-600 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-xs font-semibold text-red-800 text-center">Auctions</div>
                    </a>
                    <a href="/investments" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-150 hover:from-yellow-100 hover:via-yellow-150 hover:to-yellow-200 transition-all duration-300 border border-yellow-200 shadow-sm hover:shadow-md">
                      <Briefcase className="w-7 h-7 text-yellow-600 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-xs font-semibold text-yellow-800 text-center">Investments</div>
                    </a>
                    <a href="/stocks" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-150 hover:from-indigo-100 hover:via-indigo-150 hover:to-indigo-200 transition-all duration-300 border border-indigo-200 shadow-sm hover:shadow-md">
                      <StockIcon className="w-7 h-7 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-xs font-semibold text-indigo-800 text-center">Stocks</div>
                    </a>
                    <a href="/professional-services" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-teal-50 via-teal-100 to-teal-150 hover:from-teal-100 hover:via-teal-150 hover:to-teal-200 transition-all duration-300 border border-teal-200 shadow-sm hover:shadow-md">
                      <div className="text-lg group-hover:scale-110 transition-transform duration-200">🔧</div>
                      <div className="text-xs font-semibold text-teal-800 text-center">Services</div>
                    </a>
                    <a href="/verified" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-150 hover:from-emerald-100 hover:via-emerald-150 hover:to-emerald-200 transition-all duration-300 border border-emerald-200 shadow-sm hover:shadow-md">
                      <CheckCircle className="w-7 h-7 text-emerald-600 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-xs font-semibold text-emerald-800 text-center">Verified Directory</div>
                    </a>
                  </div>
                  <hr className="my-2" />
                  <Link href="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <Settings size={18} className="text-gray-600" />
                    <span className="text-sm">Settings & Privacy</span>
                  </Link>
                  <Link href="/help" className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                    <Heart size={18} className="text-gray-600" />
                    <span className="text-sm">Help & Support</span>
                  </Link>
                  <hr className="my-2" />
                  <button 
                    onClick={logout}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg text-gray-700 w-full text-left"
                  >
                    <LogOut size={18} />
                    <span className="text-sm">Log Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search Bar */}
        {isSearchOpen && (
          <div className="mt-3">
            <SearchDropdown />
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

          {/* Marketplace */}
          <Link 
            href="/products"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              location === '/products' 
                ? 'text-primary' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="h-7 w-7" />
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

          {/* Services */}
          <Link 
            href="/services"
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              location === '/services' 
                ? 'text-primary' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="h-7 w-7" />
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
              <Tag className="h-6 w-6" />
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
            
            {/* Mobile Notifications */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700">
              <Bell className="h-6 w-6" />
              <span className="font-medium">Notifications</span>
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">4</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
