import { Compass, Store, MapPin, Building, Gavel, Utensils, Shirt, Laptop, Wrench, ShoppingBag, Plus, Users, Star, Shield } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import MessagingDemo from "../components/MessagingDemo";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import heroImage from "@assets/upstation-hill.jpg";

export default function Homepage() {
  const { user } = useAuth();

  // Fetch top vendors
  const { data: topVendors = [], isLoading: vendorsLoading } = useQuery<any[]>({
    queryKey: ['/api/top-vendors'],
    retry: 2,
    refetchOnWindowFocus: false
  });

  const quickActions = [
    { icon: ShoppingBag, label: "Browse Products", href: "/products", color: "from-blue-500 to-blue-600" },
    { icon: Gavel, label: "Live Auctions", href: "/auctions", color: "from-orange-500 to-red-500" },
    { icon: Users, label: "Find Services", href: "/professional-services", color: "from-teal-500 to-cyan-600" },
    { icon: Plus, label: "Add Listing", href: "/product-listing", color: "from-green-500 to-emerald-600" }
  ];

  const stats = [
    { label: "Local Businesses", value: "150+", color: "text-primary", icon: Store },
    { label: "Products Listed", value: "1.2K+", color: "text-emerald", icon: ShoppingBag },
    { label: "Active Auctions", value: "45+", color: "text-neonBlue", icon: Gavel },
    { label: "Satisfied Users", value: "850+", color: "text-teal", icon: Users }
  ];

  const categories = [
    { icon: Utensils, label: "Food & Dining", count: "120+ places", color: "from-orange-500 to-red-500" },
    { icon: Shirt, label: "Fashion", count: "85+ stores", color: "from-pink-500 to-purple-500" },
    { icon: Laptop, label: "Electronics", count: "65+ vendors", color: "from-blue-500 to-cyan-500" },
    { icon: Building, label: "Real Estate", count: "200+ listings", color: "from-green-500 to-emerald-500" },
    { icon: Wrench, label: "Services", count: "180+ professionals", color: "from-yellow-500 to-orange-500" },
    { icon: Store, label: "Retail", count: "240+ shops", color: "from-indigo-500 to-purple-500" },
    { icon: MapPin, label: "Local Guides", count: "95+ guides", color: "from-teal-500 to-cyan-500" },
    { icon: Compass, label: "Explore", count: "Discover more", color: "from-gray-500 to-gray-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-grayLight via-white to-grayLight">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-600 to-teal-600 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4 py-16 sm:py-20 lg:py-24">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight max-w-5xl mx-auto">
            Welcome back, <span className="text-yellow-300">{user?.username}</span>! 
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <span className="text-sm font-medium">
                {user?.role === 'buyer' && 'Buyer Account'}
                {user?.role === 'vendor' && 'Vendor Account'}
                {user?.role === 'admin' && 'Admin Account'}
                {!user?.role && 'User Account'}
              </span>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              user?.verificationStatus === 'verified' 
                ? 'bg-green-500/20 text-green-100' 
                : user?.verificationStatus === 'premium_verified'
                ? 'bg-blue-500/20 text-blue-100'
                : 'bg-gray-500/20 text-gray-100'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                user?.verificationStatus === 'verified' 
                  ? 'bg-green-400' 
                  : user?.verificationStatus === 'premium_verified'
                  ? 'bg-blue-400'
                  : 'bg-gray-400'
              }`}></div>
              <span className="text-sm font-medium">
                {user?.verificationStatus === 'verified' && 'Verified'}
                {user?.verificationStatus === 'premium_verified' && 'Premium Verified'}
                {!user?.verificationStatus && 'Standard User'}
              </span>
            </div>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto text-blue-100 leading-relaxed">
            Discover amazing deals, connect with local vendors, and explore Bamenda's vibrant marketplace ecosystem
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-4xl mx-auto">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a 
                  key={index}
                  href={action.href}
                  className={`group bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20`}
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${action.color} rounded-xl mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold mb-1 group-hover:text-yellow-300 transition-colors">
                    {action.label}
                  </h3>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 lg:mb-4 max-w-4xl mx-auto">
              ProList Marketplace Statistics
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">Live statistics from your local marketplace</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-100 text-center transition-all duration-500 relative overflow-hidden"
              >
                <div className="relative z-10">
                  <div className={`text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold ${stat.color} mb-2 lg:mb-3 group-hover:scale-125 transition-all duration-500 relative`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 uppercase tracking-wider leading-tight group-hover:text-gray-900 transition-colors duration-300">{stat.label}</div>
                  
                  <div className="mt-3 lg:mt-4 w-full bg-gray-200 rounded-full h-2 lg:h-3 overflow-hidden shadow-inner">
                    <div 
                      className={`h-full bg-gradient-to-r ${stat.color === 'text-primary' ? 'from-blue-400 via-blue-500 to-blue-600' : stat.color === 'text-emerald' ? 'from-emerald-400 via-emerald-500 to-emerald-600' : stat.color === 'text-neonBlue' ? 'from-cyan-400 via-cyan-500 to-cyan-600' : 'from-teal-400 via-teal-500 to-teal-600'} rounded-full transition-all duration-1000 ease-out relative`}
                      style={{ width: `${75 + index * 5}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-80 transition-all duration-500">
                    <div className="w-10 h-10 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/20">
                      <stat.icon className={`w-5 h-5 ${stat.color.replace('text-', 'text-')}`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Vendors Directory */}
      <section className="relative max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 lg:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 lg:mb-4 max-w-4xl mx-auto">
            Top Vendors
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Meet our most active vendors with the highest number of product listings
          </p>
        </div>
        
        {vendorsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 px-4 sm:px-0">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-lg animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 px-4 sm:px-0">
            {topVendors.slice(0, 10).map((vendor: any, index: number) => (
              <div 
                key={vendor.id}
                className="group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer border border-gray-100 relative overflow-hidden"
              >
                {/* Rank Badge */}
                <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  #{index + 1}
                </div>
                
                {/* Profile Picture */}
                <div className="relative mb-4">
                  {vendor.profilePictureUrl ? (
                    <img 
                      src={vendor.profilePictureUrl} 
                      alt={vendor.username}
                      className="w-16 h-16 rounded-full mx-auto object-cover border-4 border-blue-100 group-hover:border-blue-300 transition-colors"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto flex items-center justify-center border-4 border-blue-100 group-hover:border-blue-300 transition-colors">
                      <span className="text-white text-xl font-bold">
                        {vendor.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  {/* Verification Badge */}
                  {vendor.verificationStatus === 'verified' && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                
                {/* Vendor Info */}
                <h3 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors truncate">
                  {vendor.fullName}
                </h3>
                <p className="text-xs text-gray-500 mb-2 flex items-center justify-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {vendor.location}
                </p>
                
                {/* Stats */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 mb-3">
                  <div className="text-lg font-bold text-blue-600 mb-1">
                    {vendor.productCount}
                  </div>
                  <div className="text-xs text-gray-600">Products Listed</div>
                </div>
                
                {/* Rating */}
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700 ml-1">
                    {parseFloat(vendor.rating).toFixed(1)}
                  </span>
                </div>
                
                {/* View Profile Button */}
                <button 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
                  onClick={() => window.location.href = `/shop/${vendor.id}`}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popular Categories */}
      <section className="relative max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 lg:mb-12 px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 lg:mb-4 max-w-4xl mx-auto">
            Popular Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Explore diverse business categories across Bamenda's vibrant marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a 
                key={index}
                href="/listings"
                className="group bg-white rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer block border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-br from-transparent to-gray-50 rounded-full -translate-y-8 sm:-translate-y-10 lg:-translate-y-12 translate-x-8 sm:translate-x-10 lg:translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${category.color} rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                    <Icon className="text-white w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                    {category.label}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-500 mb-3">{category.count}</p>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs lg:text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
                      Explore Now
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* Messaging Demo Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <MessagingDemo />
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-blue-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            Ready to Start Your Business Journey?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-6 lg:mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of successful vendors on ProList and reach customers across Bamenda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => window.location.href = '/vendor-registration'}
            >
              Become a Vendor
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = '/products'}
            >
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}