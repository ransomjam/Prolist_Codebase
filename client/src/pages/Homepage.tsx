import { Compass, Store, MapPin, Building, Gavel, Utensils, Shirt, Laptop, Wrench, ShoppingBag, Plus, TrendingUp, Users } from "lucide-react";
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
    <div className="space-y-8 scroll-smooth">
      {/* Welcome Section */}
      <div 
        ref={(el) => setElementRef('welcome-section', el)}
        data-animation-id="welcome-section"
        className={`bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-6 lg:p-8 text-white gpu-accelerated will-change-transform ${getAnimationClass('welcome-section', 0)}`}
        style={getAnimationStyle(0)}
      >
        <div className="max-w-4xl">
          <h1 
            ref={(el) => setElementRef('welcome-title', el)}
            data-animation-id="welcome-title"
            className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${getAnimationClass('welcome-title', 1)}`}
            style={getAnimationStyle(1)}
          >
            Welcome back, {user?.name || user?.username}! 👋
          </h1>
          <p 
            ref={(el) => setElementRef('welcome-text', el)}
            data-animation-id="welcome-text"
            className={`text-blue-100 mb-6 ${getAnimationClass('welcome-text', 2)}`}
            style={getAnimationStyle(2)}
          >
            Ready to explore the marketplace? Check out what's new in your community.
          </p>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  ref={(el) => setElementRef(`quick-action-${index}`, el)}
                  data-animation-id={`quick-action-${index}`}
                  href={action.href}
                  className={`bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105 gpu-accelerated will-change-transform ${getAnimationClass(`quick-action-${index}`, index + 3)}`}
                  style={getAnimationStyle(index + 3)}
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${action.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                    <Icon className="text-white" size={18} />
                  </div>
                  <div className="text-sm font-medium">{action.label}</div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            ref={(el) => setElementRef(`stat-${index}`, el)}
            data-animation-id={`stat-${index}`}
            className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center gpu-accelerated will-change-transform hover:scale-105 transition-transform duration-300 ${getAnimationClass(`stat-${index}`, index + 7)}`}
            style={getAnimationStyle(index + 7)}
          >
            <div className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Markets */}
      <section>
        <div 
          ref={(el) => setElementRef('markets-header', el)}
          data-animation-id="markets-header"
          className={`flex items-center justify-between mb-6 ${getAnimationClass('markets-header', 11)}`}
          style={getAnimationStyle(11)}
        >
          <h2 className="text-2xl font-bold text-gray-800">Featured Markets</h2>
          <a href="/markets" className="text-neonBlue font-semibold hover:text-blue-600 transition-colors">
            View All →
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.slice(0, 3).map((market, index) => (
            <a 
              key={market.id} 
              ref={(el) => setElementRef(`market-${market.id}`, el)}
              data-animation-id={`market-${market.id}`}
              href={`/markets/${market.id}`} 
              className={`block gpu-accelerated will-change-transform ${getAnimationClass(`market-${market.id}`, index + 12)}`}
              style={getAnimationStyle(index + 12)}
            >
              <Card
                title={market.name}
                description={`${market.shops.length} shops, ${market.importers.length} importers, ${market.vendors.length} vendors`}
                image={market.image}
                neonColor={market.id % 2 === 0 ? 'green' : 'blue'}
                verified={true}
                rating={4.8}
                reviews={120}
                badge="Open Now"
                badgeColor="bg-emerald"
              />
            </a>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section>
        <h2 
          ref={(el) => setElementRef('categories-header', el)}
          data-animation-id="categories-header"
          className={`text-2xl font-bold text-gray-800 mb-6 ${getAnimationClass('categories-header', 15)}`}
          style={getAnimationStyle(15)}
        >
          Popular Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a 
                key={index}
                ref={(el) => setElementRef(`category-${index}`, el)}
                data-animation-id={`category-${index}`}
                href="/listings"
                className={`bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-neonBlue transition-all duration-300 transform hover:scale-105 cursor-pointer block gpu-accelerated will-change-transform ${getAnimationClass(`category-${index}`, index + 16)}`}
                style={getAnimationStyle(index + 16)}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                  <Icon className="text-white" size={20} />
                </div>
                <h3 className="font-semibold text-gray-800">{category.label}</h3>
                <p className="text-xs text-gray-500 mt-1">{category.count}</p>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}
