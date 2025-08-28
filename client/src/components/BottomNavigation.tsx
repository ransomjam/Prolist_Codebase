import { Link, useLocation } from "wouter";
import { HomeIcon, BuildingStorefrontIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { ShoppingBag, Briefcase } from "lucide-react";

export default function BottomNavigation() {
  const [location] = useLocation();

  const navItems = [
    {
      href: "/app",
      icon: HomeIcon,
      label: "Home",
      active: location === "/app"
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
      href: "/realestate",
      icon: HomeModernIcon,
      label: "Assets",
      active: location === "/realestate"
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

  const listingItem = navItems.find((item) => item.label === "Listings");
  const otherItems = navItems.filter((item) => item.label !== "Listings");

  const renderItem = (item: typeof navItems[number]) => {
    const IconComponent = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
          item.active
            ? 'text-blue-600'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <IconComponent className={`h-6 w-6 ${item.active ? 'text-blue-600' : 'text-gray-600'}`} />
          {item.badge && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {item.badge}
            </div>
          )}
        </div>
        <span className={`text-xs font-medium text-center leading-tight ${
          item.active ? 'text-blue-600' : 'text-gray-600'
        }`}>
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-pb">
      <div className="relative flex items-center justify-between py-2 px-2 max-w-lg mx-auto">
        {otherItems.slice(0, 2).map(renderItem)}
        <div className="w-16" />
        {otherItems.slice(2).map(renderItem)}
        {listingItem && (
          (() => {
            const ListingIcon = listingItem.icon;
            return (
              <Link
                href={listingItem.href}
                className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center"
              >
                <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-full text-white shadow-lg">
                  <ListingIcon className="h-6 w-6" />
                </div>
                <span className="mt-1 text-xs font-medium text-blue-600">{listingItem.label}</span>
              </Link>
            );
          })()
        )}
      </div>
    </div>
  );
}