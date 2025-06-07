import { Link, useLocation } from "wouter";
import { HomeIcon, BuildingStorefrontIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { ShoppingBag, Briefcase } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();

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
    </div>
  );
}