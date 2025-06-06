import { Compass, Store, MapPin, Building, Gavel, Utensils, Shirt, Laptop, Wrench, ShoppingBag, Plus, TrendingUp, Users, Shield } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { markets } from "../data/demoData";
import { useAuth } from "../hooks/useAuth";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import heroImage from "@assets/upstation-hill.jpg";

export default function Homepage() {
  const { user } = useAuth();
  const { setElementRef, getAnimationClass, getAnimationStyle } = useScrollAnimations();

  const quickActions = [
    { icon: ShoppingBag, label: "Browse Products", href: "/products", color: "from-blue-500 to-blue-600" },
    { icon: Gavel, label: "Live Auctions", href: "/auctions", color: "from-orange-500 to-red-500" },
    { icon: Users, label: "Find Services", href: "/professional-services", color: "from-teal-500 to-cyan-600" },
    { icon: Plus, label: "Add Listing", href: "/product-listing", color: "from-green-500 to-emerald-600" }
  ];

  const stats = [
    { label: "Local Businesses", value: "150+", color: "text-primary" },
    { label: "Active Markets", value: "12", color: "text-emerald" },
    { label: "Properties", value: "89", color: "text-neonBlue" },
    { label: "Live Auctions", value: "24", color: "text-neonGreen" }
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
        className={`relative bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-3xl p-6 sm:p-8 lg:p-12 xl:p-16 text-white overflow-hidden gpu-accelerated will-change-transform ${getAnimationClass('hero-section', 0)}`}
        style={getAnimationStyle(0)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <h1 
            ref={(el) => setElementRef('hero-title', el)}
            data-animation-id="hero-title"
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight max-w-5xl mx-auto ${getAnimationClass('hero-title', 1)}`}
            style={getAnimationStyle(1)}
          >
            Welcome back, <span className="text-yellow-300">{user?.name || user?.username}</span>! 
          </h1>
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
                  className={`group bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-5 lg:p-6 text-center hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:rotate-1 border border-white/20 gpu-accelerated will-change-transform ${getAnimationClass(`action-${index}`, index + 5)}`}
                  style={getAnimationStyle(index + 5)}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${action.color} rounded-2xl mx-auto mb-3 sm:mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg font-semibold mb-1 leading-tight">{action.label}</div>
                  <div className="text-xs sm:text-sm text-blue-200 opacity-80">Explore now</div>
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
              className={`group bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100 text-center gpu-accelerated will-change-transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${getAnimationClass(`stat-${index}`, index + 10)}`}
              style={getAnimationStyle(index + 10)}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className={`text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold ${stat.color} mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm lg:text-base font-medium text-gray-600 uppercase tracking-wide leading-tight">{stat.label}</div>
                
                {/* Progress indicator */}
                <div className="mt-3 lg:mt-4 w-full bg-gray-200 rounded-full h-1.5 lg:h-2 overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color === 'text-primary' ? 'from-blue-400 to-blue-600' : stat.color === 'text-emerald' ? 'from-emerald-400 to-emerald-600' : stat.color === 'text-neonBlue' ? 'from-cyan-400 to-cyan-600' : 'from-teal-400 to-teal-600'} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${75 + index * 5}%` }}
                  ></div>
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
          {markets.slice(0, 3).map((market, index) => (
            <div
              key={market.id} 
              ref={(el) => setElementRef(`market-${market.id}`, el)}
              data-animation-id={`market-${market.id}`}
              className={`group relative gpu-accelerated will-change-transform ${getAnimationClass(`market-${market.id}`, index + 15)}`}
              style={getAnimationStyle(index + 15)}
            >
              <a 
                href={`/markets/${market.id}`} 
                className="block transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                  {/* Market Image */}
                  <div className="relative h-48 lg:h-56 overflow-hidden">
                    <img 
                      src={market.image} 
                      alt={market.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Open Now
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                        <Shield className="text-blue-600 w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Market Info */}
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">
                      {market.name}
                    </h3>
                    <p className="text-gray-600 text-sm lg:text-base mb-4">
                      {market.shops.length} shops • {market.importers.length} importers • {market.vendors.length} vendors
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400 text-sm lg:text-base">
                          {"★".repeat(5)}
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600">4.8 (120 reviews)</span>
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
