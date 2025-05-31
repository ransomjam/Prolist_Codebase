import { useState } from "react";
import { Search, MapPin, User, Settings, Heart, LogOut, Menu } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 lg:px-6 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
          <div className="hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Search local businesses, markets..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neonBlue focus:border-transparent outline-none w-96"
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <MapPin className="text-emerald" size={16} />
            <span className="text-sm text-gray-600">Bamenda, Cameroon</span>
          </div>
          
          <div className="relative group">
            <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <User size={16} />
              <span className="hidden sm:inline">Menu</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg flex items-center gap-2">
                <User size={16} />
                Profile
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                <Settings size={16} />
                Settings
              </a>
              <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                <Heart size={16} />
                Favorites
              </a>
              <hr className="my-1" />
              <a href="#" className="block px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg flex items-center gap-2">
                <LogOut size={16} />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Search */}
      <div className="lg:hidden mt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-neonBlue focus:border-transparent outline-none"
          />
        </div>
      </div>
    </header>
  );
}
