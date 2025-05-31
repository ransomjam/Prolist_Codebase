import { Search, Filter, Star, MapPin } from "lucide-react";
import { useState } from "react";

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "restaurants", label: "Restaurants" },
    { value: "retail", label: "Retail Shops" },
    { value: "services", label: "Services" },
    { value: "healthcare", label: "Healthcare" }
  ];

  const businesses = [
    {
      id: 1,
      name: "Mama's Kitchen",
      category: "restaurants",
      description: "Authentic Cameroonian cuisine in the heart of Bamenda",
      location: "Commercial Avenue",
      rating: 4.7,
      reviews: 89,
      status: "Open Now",
      image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    },
    {
      id: 2,
      name: "Style Boutique",
      category: "retail",
      description: "Modern fashion and accessories for men and women",
      location: "Nkwen",
      rating: 4.5,
      reviews: 56,
      status: "Verified",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    },
    {
      id: 3,
      name: "TechFix Solutions",
      category: "services",
      description: "Computer and phone repair services with warranty",
      location: "Up Station",
      rating: 4.8,
      reviews: 124,
      status: "Trusted",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
    }
  ];

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Business Listings</h1>
        <p className="text-gray-600 text-lg">Find local businesses and services in Bamenda</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search businesses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neonBlue"
            />
          </div>
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Filter size={16} />
            Search
          </button>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((business) => (
          <div key={business.id} className="bg-white rounded-xl shadow-lg hover:shadow-neonBlue transition-all duration-300">
            <img src={business.image} alt={business.name} className="h-48 w-full object-cover rounded-t-xl" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-primary">{business.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="text-neonYellow fill-current" size={16} />
                  <span className="text-sm font-semibold">{business.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{business.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="text-gray-400" size={16} />
                  <span className="text-sm text-gray-500">{business.location}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  business.status === 'Open Now' ? 'bg-emerald text-white' :
                  business.status === 'Verified' ? 'bg-neonBlue text-white' :
                  'bg-neonGreen text-white'
                }`}>
                  {business.status}
                </span>
              </div>
              <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No businesses found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search terms or filters.</p>
        </div>
      )}
    </div>
  );
}
