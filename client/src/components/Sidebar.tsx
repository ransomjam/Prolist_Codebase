import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Home, Store, Tag, Building, Gavel, User, Shield } from "lucide-react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [location] = useLocation();

  const links = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Store, label: 'Markets', path: '/markets' },
    { icon: Tag, label: 'Listings', path: '/listings' },
    { icon: Building, label: 'Real Estate', path: '/realestate' },
    { icon: Gavel, label: 'Auctions', path: '/auctions' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 hidden" />
      
      {/* Sidebar */}
      <nav 
        className={`bg-primary text-white fixed lg:relative h-full z-50 transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-16'} group`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className="p-4 border-b border-blue-800">
          {/* ProList Logo with verification shield */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-neonBlue rounded-lg flex items-center justify-center shadow-neonBlue">
              <Shield className="text-white" size={16} />
            </div>
            <span className={`font-bold text-lg transition-opacity duration-300 whitespace-nowrap ${expanded ? 'opacity-100' : 'opacity-0'}`}>
              ProList
            </span>
          </div>
        </div>
        
        <div className="mt-6">
          {links.slice(0, -1).map(({ icon: Icon, label, path }) => (
            <Link 
              key={path} 
              href={path}
              className={`flex items-center gap-4 px-4 py-3 hover:bg-neonBlue hover:shadow-softGlow transition-all duration-200 ${
                location === path ? 'bg-neonBlue shadow-softGlow' : ''
              }`}
            >
              <Icon size={20} className="min-w-[20px]" />
              <span className={`transition-opacity duration-300 whitespace-nowrap ${expanded ? 'opacity-100' : 'opacity-0'}`}>
                {label}
              </span>
            </Link>
          ))}
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <Link 
            href="/profile"
            className={`flex items-center gap-4 px-4 py-3 hover:bg-neonBlue hover:shadow-softGlow transition-all duration-200 ${
              location === '/profile' ? 'bg-neonBlue shadow-softGlow' : ''
            }`}
          >
            <User size={20} className="min-w-[20px]" />
            <span className={`transition-opacity duration-300 whitespace-nowrap ${expanded ? 'opacity-100' : 'opacity-0'}`}>
              Profile
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
}
