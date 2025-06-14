import { Compass, Store, MapPin, Building, Gavel, Utensils, Shirt, Laptop, Wrench, ShoppingBag, Plus, TrendingUp, Users, Shield } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
// Using actual Bamenda markets data
const actualMarkets = [
  {
    id: 'main-market',
    name: 'Main Market',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    description: 'Bamenda\'s busiest commercial hub with diverse sections offering everything from textiles to electronics.',
    vendors: 555,
    rating: 4.8,
    location: 'Central Bamenda'
  },
  {
    id: 'food-market',
    name: 'Food Market',
    image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    description: 'Fresh produce and food items at competitive prices. The best place for organic vegetables and local spices.',
    vendors: 280,
    rating: 4.9,
    location: 'Near Main Market'
  },
  {
    id: 'mile-4-market',
    name: 'Mile 4 Market',
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300',
    description: 'Vibrant commercial hub serving the Mile 4 community with diverse goods and services.',
    vendors: 180,
    rating: 4.6,
    location: 'Mile 4, Bamenda'
  }
];
import { useAuth } from "../hooks/useAuth";
import heroImage from "@assets/upstation-hill.jpg";

export default function Homepage() {
  const { user } = useAuth();

  const quickActions = [
    { icon: ShoppingBag, label: "Browse Products", href: "/products", color: "from-blue-500 to-blue-600" },
    { icon: Gavel, label: "Live Auctions", href: "/auctions", color: "from-orange-500 to-red-500" },
    { icon: Users, label: "Find Services", href: "/professional-services", color: "from-teal-500 to-cyan-600" },
    { icon: Plus, label: "Add Listing", href: "/product-listing", color: "from-green-500 to-emerald-600" }
  ];

  const stats = [
    { label: "Local Businesses", value: "150+", color: "text-primary", icon: Store },
    { label: "Active Markets", value: "12", color: "text-emerald", icon: MapPin },
    { label: "Properties", value: "89", color: "text-neonBlue", icon: Building },
    { label: "Live Auctions", value: "24", color: "text-neonGreen", icon: Gavel }
  ];

  const categories = [
    { icon: Utensils, label: "Food & Dining", count: "45+ restaurants", color: "from-neonBlue to-primary" },
    { icon: Shirt, label: "Fashion", count: "32+ boutiques", color: "from-neonGreen to-emerald" },
    { icon: Laptop, label: "Electronics", count: "28+ shops", color: "from-neonBlue to-primary" },
    { icon: Wrench, label: "Services", count: "67+ providers", color: "from-neonGreen to-emerald" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 space-y-12 scroll-smooth px-4 sm:px-6 lg:px-8">
      {/* Hero Welcome Section */}
      <div 
        ref={(el) => setElementRef('hero-section', el)}
        data-animation-id="hero-section"
        className={`relative morphing-bg rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 text-white overflow-hidden gpu-accelerated hover-lift ${getAnimationClass('hero-section', 0)}`}
        style={getAnimationStyle(0)}
      >
        {/* Floating Particles */}
        <div className="particles">
          <div className="particle w-3 h-3 animate-particle-float" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
          <div className="particle w-2 h-2 animate-particle-float" style={{ top: '60%', left: '80%', animationDelay: '1s' }}></div>
          <div className="particle w-4 h-4 animate-particle-float" style={{ top: '30%', left: '70%', animationDelay: '2s' }}></div>
          <div className="particle w-1 h-1 animate-particle-float" style={{ top: '80%', left: '20%', animationDelay: '3s' }}></div>
          <div className="particle w-2 h-2 animate-particle-float" style={{ top: '40%', left: '90%', animationDelay: '4s' }}></div>
        </div>

        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float animate-pulse-glow"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-pink-300 to-purple-400 rounded-full animate-bounce-in" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full animate-rotate-3d opacity-60"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 
            ref={(el) => setElementRef('hero-title', el)}
            data-animation-id="hero-title"
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight max-w-5xl mx-auto ${getAnimationClass('hero-title', 1)}`}
            style={getAnimationStyle(1)}
          >
            Welcome back, <span className="text-yellow-300">{user?.username}</span>! 
          </h1>
          
          {/* Account Type and Verification Status */}
          <div 
            ref={(el) => setElementRef('account-info', el)}
            data-animation-id="account-info"
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 ${getAnimationClass('account-info', 1.5)}`}
            style={getAnimationStyle(1.5)}
          >
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
              <Shield size={16} />
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
                  ? 'bg-blue-400 animate-pulse'
                  : 'bg-gray-400'
              }`}></div>
              <span className="text-sm font-medium">
                {user?.verificationStatus === 'verified' && 'Verified'}
                {user?.verificationStatus === 'premium_verified' && 'Premium Verified'}
                {!user?.verificationStatus && 'Standard User'}
              </span>
            </div>
          </div>
          <p 
            ref={(el) => setElementRef('hero-subtitle', el)}
            data-animation-id="hero-subtitle"
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 mb-2 sm:mb-3 font-light max-w-4xl mx-auto ${getAnimationClass('hero-subtitle', 2)}`}
            style={getAnimationStyle(2)}
          >
            Your Local Marketplace Awaits
          </p>
          <p 
            ref={(el) => setElementRef('hero-description', el)}
            data-animation-id="hero-description"
            className={`text-blue-100 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 lg:mb-10 max-w-4xl mx-auto leading-relaxed px-4 ${getAnimationClass('hero-description', 3)}`}
            style={getAnimationStyle(3)}
          >
            Discover amazing deals, connect with verified vendors, and explore Bamenda's vibrant marketplace ecosystem.
          </p>
          
          {/* Enhanced Quick Actions */}
          <div 
            ref={(el) => setElementRef('quick-actions-grid', el)}
            data-animation-id="quick-actions-grid"
            className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto px-2 sm:px-4 ${getAnimationClass('quick-actions-grid', 4)}`}
            style={getAnimationStyle(4)}
          >
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  ref={(el) => setElementRef(`action-${index}`, el)}
                  data-animation-id={`action-${index}`}
                  href={action.href}
                  className={`group bg-white/20 backdrop-blur-lg rounded-3xl p-4 sm:p-5 lg:p-6 text-center hover:bg-white/30 transition-all duration-500 hover-tilt border border-white/30 gpu-accelerated relative overflow-hidden ${getAnimationClass(`action-${index}`, index + 5, 'slide')}`}
                  style={getAnimationStyle(index + 5)}
                >
                  {/* Floating particles for each action */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="particle w-1 h-1 animate-particle-float" style={{ top: '20%', left: '20%', animationDelay: `${index * 0.5}s` }}></div>
                    <div className="particle w-1 h-1 animate-particle-float" style={{ top: '70%', left: '80%', animationDelay: `${index * 0.5 + 1}s` }}></div>
                  </div>
                  
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-18 lg:h-18 bg-gradient-to-br ${action.color} rounded-3xl mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl animate-pulse-glow relative`}>
                    <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 animate-bounce-in" style={{ animationDelay: `${index * 200}ms` }} />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg font-bold mb-1 leading-tight group-hover:text-yellow-200 transition-colors duration-300">{action.label}</div>
                  <div className="text-xs sm:text-sm text-blue-200 opacity-90 group-hover:opacity-100 transition-opacity duration-300">Explore now</div>
                  
                  {/* Cool border glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <section className="max-w-7xl mx-auto">
        <div 
          ref={(el) => setElementRef('stats-header', el)}
          data-animation-id="stats-header"
          className={`text-center mb-8 lg:mb-12 px-4 ${getAnimationClass('stats-header', 9)}`}
          style={getAnimationStyle(9)}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 lg:mb-4 max-w-4xl mx-auto">Market Overview</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">Live statistics from your local marketplace</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              ref={(el) => setElementRef(`stat-${index}`, el)}
              data-animation-id={`stat-${index}`}
              className={`group bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-100 text-center gpu-accelerated hover-lift transition-all duration-500 relative overflow-hidden ${getAnimationClass(`stat-${index}`, index + 10, 'slide')}`}
              style={getAnimationStyle(index + 10)}
            >
              {/* Animated Background Particles */}
              <div className="absolute inset-0 opacity-20">
                <div className="particle w-2 h-2 animate-particle-float bg-gradient-to-br from-blue-400 to-purple-500 rounded-full" style={{ top: '15%', left: '80%', animationDelay: `${index * 0.3}s` }}></div>
                <div className="particle w-1 h-1 animate-particle-float bg-gradient-to-br from-pink-400 to-red-500 rounded-full" style={{ top: '70%', left: '20%', animationDelay: `${index * 0.3 + 1}s` }}></div>
              </div>

              {/* Dynamic Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-purple-50/60 to-teal-50/80 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-gradient-shift"></div>
              
              <div className="relative z-10">
                <div className={`text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-bold ${stat.color} mb-2 lg:mb-3 group-hover:scale-125 transition-all duration-500 animate-bounce-in animate-float-number relative`} style={{ animationDelay: `${index * 100}ms` }}>
                  {stat.value}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-gradient-shift"></div>
                </div>
                <div className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 uppercase tracking-wider leading-tight group-hover:text-gray-900 transition-colors duration-300">{stat.label}</div>
                
                {/* Enhanced Progress indicator with glow */}
                <div className="mt-3 lg:mt-4 w-full bg-gray-200 rounded-full h-2 lg:h-3 overflow-hidden shadow-inner">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color === 'text-primary' ? 'from-blue-400 via-blue-500 to-blue-600' : stat.color === 'text-emerald' ? 'from-emerald-400 via-emerald-500 to-emerald-600' : stat.color === 'text-neonBlue' ? 'from-cyan-400 via-cyan-500 to-cyan-600' : 'from-teal-400 via-teal-500 to-teal-600'} rounded-full transition-all duration-1000 ease-out animate-pulse-glow animate-slide-up-bounce relative`}
                    style={{ width: `${75 + index * 5}%`, animationDelay: `${index * 200}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                  </div>
                </div>

                {/* Floating stat icon */}
                <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-80 transition-all duration-500">
                  <div className="w-10 h-10 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-full flex items-center justify-center animate-float-icon shadow-lg border border-white/20" style={{ animationDelay: `${index * 0.2}s` }}>
                    <stat.icon className={`w-5 h-5 ${stat.color.replace('text-', 'text-')}`} />
                  </div>
                </div>
                
                {/* Additional floating elements */}
                <div className="absolute top-6 left-4 opacity-20 group-hover:opacity-50 transition-opacity duration-700">
                  <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-float-gentle" style={{ animationDelay: `${index * 0.5 + 1}s` }}></div>
                </div>
                
                <div className="absolute bottom-6 right-6 opacity-15 group-hover:opacity-40 transition-opacity duration-600">
                  <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full animate-float-icon" style={{ animationDelay: `${index * 0.3 + 2}s` }}></div>
                </div>
                
                {/* Animated particles around numbers */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <div className="w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-float-gentle opacity-30" style={{ 
                    position: 'absolute', 
                    top: '-30px', 
                    left: '-20px',
                    animationDelay: `${index * 0.4 + 0.5}s` 
                  }}></div>
                  <div className="w-1 h-1 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full animate-float-icon opacity-25" style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    right: '-15px',
                    animationDelay: `${index * 0.6 + 1.2}s` 
                  }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Markets */}
      <section className="relative max-w-7xl mx-auto">
        <div 
          ref={(el) => setElementRef('markets-header', el)}
          data-animation-id="markets-header"
          className={`text-center mb-8 lg:mb-12 px-4 ${getAnimationClass('markets-header', 14)}`}
          style={getAnimationStyle(14)}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 lg:mb-4 max-w-4xl mx-auto">Featured Markets</h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 lg:mb-8 max-w-3xl mx-auto">Discover the bustling markets of Bamenda</p>
          <a 
            href="/markets" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg"
          >
            Explore All Markets
            <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6" />
          </a>
        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-4 sm:px-0">
          {actualMarkets.map((market, index) => (
            <div
              key={market.id} 
              ref={(el) => setElementRef(`market-${market.id}`, el)}
              data-animation-id={`market-${market.id}`}
              className={`group relative gpu-accelerated will-change-transform ${getAnimationClass(`market-${market.id}`, index + 15, 'slide')}`}
              style={getAnimationStyle(index + 15)}
            >
              <a 
                href={`/markets/bamenda-markets/${market.id}`} 
                className="block transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 group-hover:shadow-3xl transition-all duration-500 hover-lift relative">
                  {/* Floating particles */}
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="particle w-2 h-2 animate-particle-float bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full" style={{ top: '20%', left: '10%', animationDelay: `${index * 0.4}s` }}></div>
                    <div className="particle w-1 h-1 animate-particle-float bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full" style={{ top: '70%', left: '85%', animationDelay: `${index * 0.4 + 1.5}s` }}></div>
                  </div>

                  {/* Market Image */}
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    <img 
                      src={market.image} 
                      alt={market.name}
                      className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700 filter group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                    
                    {/* Animated status badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse-glow">
                        Open Now
                      </span>
                    </div>
                    
                    {/* Enhanced shield icon */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/95 backdrop-blur-md rounded-full p-3 shadow-lg animate-float">
                        <Shield className="text-blue-600 w-5 h-5 animate-bounce-in" style={{ animationDelay: `${index * 150}ms` }} />
                      </div>
                    </div>

                    {/* Cool overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  {/* Market Info */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {market.name}
                    </h3>
                    <p className="text-gray-600 text-sm lg:text-base mb-4">
                      {market.vendors} vendors • {market.location}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400 text-sm lg:text-base">
                          {"★".repeat(5)}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600">{market.rating} rating</span>
                      </div>
                      <div className="text-blue-600 font-semibold text-sm lg:text-base">
                        Visit →
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-12 px-4">
          <h2 
            ref={(el) => setElementRef('categories-header', el)}
            data-animation-id="categories-header"
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 lg:mb-4 max-w-4xl mx-auto ${getAnimationClass('categories-header', 18)}`}
            style={getAnimationStyle(18)}
          >
            Popular Categories
          </h2>
          <p 
            ref={(el) => setElementRef('categories-subtitle', el)}
            data-animation-id="categories-subtitle"
            className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto ${getAnimationClass('categories-subtitle', 19)}`}
            style={getAnimationStyle(19)}
          >
            Explore diverse business categories across Bamenda's vibrant marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-0">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a 
                key={index}
                ref={(el) => setElementRef(`category-${index}`, el)}
                data-animation-id={`category-${index}`}
                href="/listings"
                className={`group bg-white rounded-2xl p-4 sm:p-6 lg:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 cursor-pointer block gpu-accelerated will-change-transform border border-gray-100 relative overflow-hidden ${getAnimationClass(`category-${index}`, index + 20)}`}
                style={getAnimationStyle(index + 20)}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-br from-transparent to-gray-50 rounded-full -translate-y-8 sm:-translate-y-10 lg:-translate-y-12 translate-x-8 sm:translate-x-10 lg:translate-x-12 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${category.color} rounded-2xl mx-auto mb-3 sm:mb-4 lg:mb-6 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <Icon className="text-white w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                    {category.label}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-500 mb-3">{category.count}</p>
                  
                  {/* Call to action */}
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
        
        {/* Bottom CTA */}
        <div 
          ref={(el) => setElementRef('bottom-cta', el)}
          data-animation-id="bottom-cta"
          className={`text-center mt-12 lg:mt-16 px-4 ${getAnimationClass('bottom-cta', 24)}`}
          style={getAnimationStyle(24)}
        >
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 text-white max-w-5xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 lg:mb-4">Ready to Start Trading?</h3>
            <p className="text-base sm:text-lg lg:text-xl text-teal-100 mb-6 lg:mb-8 max-w-3xl mx-auto">Join thousands of vendors and buyers in Bamenda's digital marketplace</p>
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center max-w-md sm:max-w-lg mx-auto">
              <a 
                href="/signup" 
                className="bg-white text-blue-600 px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base lg:text-lg"
              >
                Join as Vendor
              </a>
              <a 
                href="/products" 
                className="bg-transparent border-2 border-white text-white px-6 lg:px-8 py-3 lg:py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base lg:text-lg"
              >
                Start Shopping
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
