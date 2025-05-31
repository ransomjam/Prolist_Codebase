import { MapPin, Bed, Bath, Square, Heart } from "lucide-react";

export default function RealEstate() {
  const properties = [
    {
      id: 1,
      title: "3BR House - Ntarikon",
      price: "₦45,000,000",
      location: "Ntarikon, Bamenda",
      bedrooms: 3,
      bathrooms: 2,
      area: "120 sqm",
      description: "Modern house with garden, parking, and mountain views",
      image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      type: "House",
      status: "For Sale"
    },
    {
      id: 2,
      title: "Apartment - Commercial Avenue",
      price: "₦25,000,000",
      location: "Commercial Avenue, Bamenda",
      bedrooms: 2,
      bathrooms: 1,
      area: "85 sqm",
      description: "City center apartment with modern amenities",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      type: "Apartment",
      status: "For Rent"
    },
    {
      id: 3,
      title: "Shop Space - Main Market",
      price: "₦15,000,000",
      location: "Main Market, Bamenda",
      bedrooms: 0,
      bathrooms: 1,
      area: "50 sqm",
      description: "Prime commercial space in busy market area",
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      type: "Commercial",
      status: "For Sale"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Real Estate</h1>
        <p className="text-gray-600 text-lg">Find your perfect property in Bamenda</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue">
            <option>Property Type</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Commercial</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue">
            <option>Price Range</option>
            <option>Under ₦20M</option>
            <option>₦20M - ₦50M</option>
            <option>Above ₦50M</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neonBlue">
            <option>Location</option>
            <option>Ntarikon</option>
            <option>Commercial Avenue</option>
            <option>Nkwen</option>
          </select>
          <button className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Search Properties
          </button>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-neonGreen transition-all duration-300">
            <div className="relative">
              <img src={property.image} alt={property.title} className="h-48 w-full object-cover" />
              <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors">
                <Heart size={16} className="text-gray-600 hover:text-red-500" />
              </button>
              <div className="absolute bottom-3 left-3">
                <span className="bg-emerald text-white text-xs px-2 py-1 rounded-full">
                  {property.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-primary">{property.title}</h3>
                <span className="bg-neonBlue text-white text-xs px-2 py-1 rounded">{property.type}</span>
              </div>
              <p className="text-2xl font-bold text-emerald mb-2">{property.price}</p>
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                <MapPin size={14} className="text-emerald" />
                <span>{property.location}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{property.description}</p>
              
              {/* Property Details */}
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-1">
                    <Bed size={14} />
                    <span>{property.bedrooms} bed</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Bath size={14} />
                  <span>{property.bathrooms} bath</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square size={14} />
                  <span>{property.area}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 border border-neonBlue text-neonBlue rounded-lg hover:bg-neonBlue hover:text-white transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
