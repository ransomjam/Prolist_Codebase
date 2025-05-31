import { Compass, Store, MapPin, Building, Gavel, Utensils, Shirt, Laptop, Wrench } from "lucide-react";
import Card from "../components/Card";
import Button from "../components/Button";
import { markets } from "../data/demoData";
import heroImage from "@assets/20250520_0330_Contemporary Cameroonian Hotel Design_simple_compose_01jvpkske3fr7bycqw9n2k38pv.png";

export default function Homepage() {
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
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden h-64 lg:h-80">
        <img 
          src={heroImage} 
          alt="ProList - Contemporary Cameroonian Business Center" 
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center text-white">
          <div className="max-w-2xl px-4">
            <h1 className="text-3xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
              Discover Local Businesses in <span className="text-neonGreen">Bamenda</span>
            </h1>
            <p className="text-lg lg:text-xl mb-6 opacity-90">
              Connect with trusted local markets, vendors, and services in your community
            </p>
            <a href="/markets" className="inline-flex items-center bg-gradient-to-r from-neonBlue to-emerald text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all">
              <Compass className="mr-2" size={20} />
              Explore Now
            </a>
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
