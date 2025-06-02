import { Compass, Store, MapPin, Building, Gavel, Utensils, Shirt, Laptop, Wrench, ShoppingBag, Plus, TrendingUp } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { markets } from "../data/demoData";
import { useAuth } from "../hooks/useAuth";
import heroImage from "@assets/upstation-hill.jpg";

export default function Homepage() {
  const { user } = useAuth();

  const quickActions = [
    { icon: ShoppingBag, label: "Browse Products", href: "/products", color: "from-blue-500 to-blue-600" },
    { icon: Gavel, label: "Live Auctions", href: "/auctions", color: "from-orange-500 to-red-500" },
    { icon: Plus, label: "Add Listing", href: "/product-listing", color: "from-green-500 to-emerald-600" },
    { icon: TrendingUp, label: "My Orders", href: "/buyer-orders", color: "from-purple-500 to-purple-600" }
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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 rounded-2xl p-6 lg:p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Welcome back, {user?.name || user?.username}! 👋
          </h1>
          <p className="text-blue-100 mb-6">
            Ready to explore the marketplace? Check out what's new in your community.
          </p>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <a
                  key={index}
                  href={action.href}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
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
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <div className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Markets */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Markets</h2>
          <a href="/markets" className="text-neonBlue font-semibold hover:text-blue-600 transition-colors">
            View All →
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.slice(0, 3).map((market) => (
            <a key={market.id} href={`/markets/${market.id}`} className="block">
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <a 
                key={index}
                href="/listings"
                className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-neonBlue transition-all duration-300 transform hover:scale-105 cursor-pointer block"
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
