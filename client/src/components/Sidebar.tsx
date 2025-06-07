import { useState } from 'react';
import { Link, useLocation } from "wouter";
import { HomeIcon, BuildingStorefrontIcon, TagIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { User, Shield, ShoppingBag, Briefcase } from "lucide-react";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [location] = useLocation();

  const links = [
    { icon: HomeIcon, label: 'Home', path: '/app' },
    { icon: ShoppingBag, label: 'Products', path: '/products' },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
    { icon: TagIcon, label: 'Listings', path: '/listings' },
    { icon: BuildingStorefrontIcon, label: 'Markets', path: '/markets' },
    { icon: Briefcase, label: 'Services', path: '/services' },
    { icon: HomeModernIcon, label: 'Real Estate', path: '/realestate' },
    { icon: CurrencyDollarIcon, label: 'Auctions', path: '/auctions' },
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
          {links.map(({ icon: Icon, label, path }) => (
            <Link 
              key={path} 
              href={path}
              className={`flex items-center gap-4 px-4 py-3 hover:bg-neonBlue hover:shadow-softGlow transition-all duration-200 ${
                location === path ? 'bg-neonBlue shadow-softGlow' : ''
              }`}
            >
              <Icon className="h-5 w-5 min-w-[20px]" />
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

        {/* Verification Banner in Sidebar */}
        <div className={`mt-6 mx-4 transition-all duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-3 rounded-lg shadow-lg">
            <h4 className="font-bold text-sm mb-1">Get Verified</h4>
            <p className="text-xs opacity-90 mb-2">Boost your business credibility</p>
            <a 
              href="/vendor-register"
              className="block bg-white text-orange-600 text-center py-1 px-2 rounded text-xs font-semibold hover:bg-gray-100 transition-all"
            >
              Apply Now
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
