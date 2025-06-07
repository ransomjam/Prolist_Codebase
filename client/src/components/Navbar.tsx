import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Search, Plus, User, Settings, Heart, LogOut, Menu, Shield, Users, MessageCircle, Monitor, TrendingUp, Bell, ShoppingBag, List, Building2, Home, Flame, Briefcase, TrendingUp as StockIcon, CheckCircle, Tag, MessageSquare, DollarSign, AlertTriangle } from "lucide-react";
import { HomeIcon, BuildingStorefrontIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import NotificationDropdown from "./NotificationDropdown";
import SearchDropdown from "./SearchDropdown";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [location] = useLocation();
  const { logout, isAuthenticated, user } = useAuth();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsChatOpen(false);
        setIsNotificationsOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

            {/* Chat Button */}
            <button 
              className="relative w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <MessageSquare className="text-gray-700" size={20} />
              <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </div>
            </button>

            {/* Notifications Button */}
            <button 
              className="relative w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="text-gray-700" size={20} />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                7
              </div>
            </button>
            
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
                    <a href="/professional-services" className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-teal-50 via-teal-100 to-teal-150 hover:from-teal-100 hover:via-teal-150 hover:to-teal-200 transition-all duration-300 border border-teal-200 shadow-sm hover:shadow-md">
                      <div className="text-lg group-hover:scale-110 transition-transform duration-200">🔧</div>
                      <div className="text-xs font-semibold text-teal-800 text-center">Services</div>
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

        {/* Chat Dropdown */}
        {isChatOpen && (
          <div className="dropdown-container absolute top-full right-4 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Platform Chat</h3>
              <p className="text-sm text-gray-600">Recent discussions</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">MK</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-gray-900">Market Discussion</h4>
                      <span className="text-xs text-gray-500">2m ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Anyone know where to find fresh tomatoes in Bamenda Main Market?</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-blue-600 font-medium">3 replies</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-500">General</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">AG</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-gray-900">Vendor Support</h4>
                      <span className="text-xs text-gray-500">15m ago</span>
                    </div>
                    <p className="text-sm text-gray-600">How long does verification usually take?</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-green-600 font-medium">1 reply</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-500">Support</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">RW</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm text-gray-900">Real Estate Tips</h4>
                      <span className="text-xs text-gray-500">1h ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Best neighborhoods for investment properties in Bamenda?</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-purple-600 font-medium">7 replies</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-500">Real Estate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Discussions
              </button>
            </div>
          </div>
        )}

        {/* Notifications Dropdown */}
        {isNotificationsOpen && (
          <div className="dropdown-container absolute top-full right-4 mt-2 w-80 bg-white rounded-lg shadow-xl border z-50">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">Recent platform activity</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-l-4 border-blue-500">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Your product listing "Nike Air Force 1" has been approved</p>
                    <span className="text-xs text-gray-500">5 minutes ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-l-4 border-green-500">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">You received a new order for 275,000 FCFA</p>
                    <span className="text-xs text-gray-500">12 minutes ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-l-4 border-purple-500">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New message from buyer about your product</p>
                    <span className="text-xs text-gray-500">23 minutes ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-l-4 border-orange-500">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Your vendor verification status has been updated</p>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-l-4 border-red-500">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Payment reminder: Complete escrow transaction</p>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-l-4 border-teal-500">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Your product views increased by 45% this week</p>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-l-4 border-indigo-500">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Welcome to ProList! Complete your profile setup</p>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Notifications
              </button>
            </div>
          </div>
        )}
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
            
            {/* About Section */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="px-4 py-2">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">About ProList</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Your trusted marketplace for Bamenda & Kumba communities</p>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span>© 2024 ProList</span>
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span>Support: help@prolist.cm</span>
                    <span>Contact: +237 6XX XXX XXX</span>
                  </div>
                  <p className="text-xs">Empowering local commerce through trust and verification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
