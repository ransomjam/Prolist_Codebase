import { useState } from "react";
import { Link, useLocation } from "wouter";
import { HomeIcon, BuildingStorefrontIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { ShoppingBag, Briefcase, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export default function BottomNavigation() {
  const [location] = useLocation();
  const [showAccountPrompt, setShowAccountPrompt] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleAuthRequired = (e: React.MouseEvent, href: string) => {
    if (!isAuthenticated && href !== "/") {
      e.preventDefault();
      setShowAccountPrompt(true);
      setTimeout(() => setShowAccountPrompt(false), 3000);
    }
  };

  const navItems = [
    {
      href: "/",
      icon: HomeIcon,
      label: "Home",
      active: location === "/"
    },
    {
      href: "/products",
      icon: ShoppingBag,
      label: "Listings",
      active: location === "/products"
    },
    {
      href: "/markets",
      icon: BuildingStorefrontIcon,
      label: "Markets",
      active: location === "/markets"
    },
    {
      href: "/professional-services",
      icon: Briefcase,
      label: "Services",
      active: location === "/professional-services" || location === "/services"
    },
    {
      href: "/auctions",
      icon: CurrencyDollarIcon,
      label: "Auctions",
      active: location === "/auctions",
      badge: 3
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleAuthRequired(e, item.href)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="relative">
                <IconComponent className={`h-6 w-6 ${item.active ? 'text-blue-600' : 'text-gray-600'}`} />
                {item.badge && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge}
                  </div>
                )}
              </div>
              <span className={`text-xs font-medium ${
                item.active ? 'text-blue-600' : 'text-gray-600'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Account Creation Prompt */}
      {showAccountPrompt && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-4 rounded-lg shadow-xl z-50 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <p className="font-semibold text-sm">Create Account Required</p>
              <p className="text-sm opacity-90">Join ProList to access this feature</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <a 
              href="/signup" 
              className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
            >
              Join Now
            </a>
            <a 
              href="/login" 
              className="bg-white/20 text-white px-3 py-1 rounded text-sm font-medium hover:bg-white/30 transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      )}
    </div>
  );
}