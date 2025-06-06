import { Compass, Store, MapPin, Building, Gavel, Utensils, Shirt, Laptop, Wrench, ShoppingBag, Plus, TrendingUp, Users, Shield } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { markets } from "../data/demoData";
import { useAuth } from "../hooks/useAuth";
import { useScrollAnimations } from "../hooks/useScrollAnimations";
import heroImage from "@assets/upstation-hill.jpg";

export default function Homepage() {
  const { user } = useAuth();
  const { setElementRef, getAnimationClass, getAnimationStyle } = useScrollAnimations({
    enableParallax: true,
    staggerDelay: 100
  });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50 space-y-12 scroll-smooth">
      {/* Hero Welcome Section */}
      <div 
        ref={(el) => setElementRef('hero-section', el)}
        data-animation-id="hero-section"
        className={`relative bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-3xl p-8 lg:p-12 text-white overflow-hidden gpu-accelerated will-change-transform ${getAnimationClass('hero-section', 0)}`}
        style={getAnimationStyle(0)}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 
            ref={(el) => setElementRef('hero-title', el)}
            data-animation-id="hero-title"
            className={`text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 leading-tight ${getAnimationClass('hero-title', 1)}`}
            style={getAnimationStyle(1)}
          >
            Welcome back, <span className="text-yellow-300">{user?.name || user?.username}</span>! 
          </h1>
          <p 
            ref={(el) => setElementRef('hero-subtitle', el)}
            data-animation-id="hero-subtitle"
            className={`text-xl sm:text-2xl text-blue-100 mb-2 font-light ${getAnimationClass('hero-subtitle', 2)}`}
            style={getAnimationStyle(2)}
          >
            Your Local Marketplace Awaits
          </p>
          <p 
            ref={(el) => setElementRef('hero-description', el)}
            data-animation-id="hero-description"
            className={`text-blue-100 text-lg mb-8 max-w-3xl mx-auto leading-relaxed ${getAnimationClass('hero-description', 3)}`}
            style={getAnimationStyle(3)}
          >
            Discover amazing deals, connect with verified vendors, and explore Bamenda's vibrant marketplace ecosystem.
          </p>
          
          {/* Enhanced Quick Actions */}
          <div 
            ref={(el) => setElementRef('quick-actions-grid', el)}
            data-animation-id="quick-actions-grid"
            className={`grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto ${getAnimationClass('quick-actions-grid', 4)}`}
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
                  className={`group bg-white/15 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/25 transition-all duration-300 transform hover:scale-105 hover:rotate-1 border border-white/20 gpu-accelerated will-change-transform ${getAnimationClass(`action-${index}`, index + 5)}`}
                  style={getAnimationStyle(index + 5)}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className="text-base font-semibold mb-1">{action.label}</div>
                  <div className="text-sm text-blue-200 opacity-80">Explore now</div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Enhanced Quick Stats */}
      <section>
        <div 
          ref={(el) => setElementRef('stats-header', el)}
          data-animation-id="stats-header"
          className={`text-center mb-8 ${getAnimationClass('stats-header', 9)}`}
          style={getAnimationStyle(9)}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Market Overview</h2>
          <p className="text-gray-600">Live statistics from your local marketplace</p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              ref={(el) => setElementRef(`stat-${index}`, el)}
              data-animation-id={`stat-${index}`}
              className={`group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center gpu-accelerated will-change-transform hover:scale-105 hover:shadow-2xl transition-all duration-300 relative overflow-hidden ${getAnimationClass(`stat-${index}`, index + 10)}`}
              style={getAnimationStyle(index + 10)}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className={`text-4xl lg:text-5xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.label}</div>
                
                {/* Progress indicator */}
                <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
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
      <section className="relative">
        <div 
          ref={(el) => setElementRef('markets-header', el)}
          data-animation-id="markets-header"
          className={`text-center mb-10 ${getAnimationClass('markets-header', 14)}`}
          style={getAnimationStyle(14)}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Featured Markets</h2>
          <p className="text-gray-600 mb-6">Discover the bustling markets of Bamenda</p>
          <a 
            href="/markets" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore All Markets
            <TrendingUp size={20} />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="relative h-48 overflow-hidden">
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
                        <Shield className="text-blue-600" size={16} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Market Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {market.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {market.shops.length} shops • {market.importers.length} importers • {market.vendors.length} vendors
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {"★".repeat(5)}
                        </div>
                        <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
                      </div>
                      <div className="text-blue-600 font-semibold">
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
      <section className="relative">
        <div className="text-center mb-10">
          <h2 
            ref={(el) => setElementRef('categories-header', el)}
            data-animation-id="categories-header"
            className={`text-3xl font-bold text-gray-800 mb-3 ${getAnimationClass('categories-header', 18)}`}
            style={getAnimationStyle(18)}
          >
            Popular Categories
          </h2>
          <p 
            ref={(el) => setElementRef('categories-subtitle', el)}
            data-animation-id="categories-subtitle"
            className={`text-gray-600 max-w-2xl mx-auto ${getAnimationClass('categories-subtitle', 19)}`}
            style={getAnimationStyle(19)}
          >
            Explore diverse business categories across Bamenda's vibrant marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a 
                key={index}
                ref={(el) => setElementRef(`category-${index}`, el)}
                data-animation-id={`category-${index}`}
                href="/listings"
                className={`group bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 cursor-pointer block gpu-accelerated will-change-transform border border-gray-100 relative overflow-hidden ${getAnimationClass(`category-${index}`, index + 20)}`}
                style={getAnimationStyle(index + 20)}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-gray-50 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{category.count}</p>
                  
                  {/* Call to action */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
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
          className={`text-center mt-12 ${getAnimationClass('bottom-cta', 24)}`}
          style={getAnimationStyle(24)}
        >
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-2">Ready to Start Trading?</h3>
            <p className="text-teal-100 mb-6">Join thousands of vendors and buyers in Bamenda's digital marketplace</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/signup" 
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Join as Vendor
              </a>
              <a 
                href="/products" 
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
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
