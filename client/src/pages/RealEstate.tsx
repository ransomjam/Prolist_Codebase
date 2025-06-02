import { useState } from 'react';
import { MapPin, Filter, Search, Home, Building, Calendar, SlidersHorizontal, Grid3X3, List, Eye, Heart, Share2, Wifi, Car, Bath, Bed, MapPin as LocationIcon, DollarSign, TrendingUp } from 'lucide-react';
import { realEstate } from '../data/demoData';
import RealEstateCard from '../components/RealEstateCard';

export default function RealEstate() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const propertyTypes = [
    { id: 'all', label: 'All Properties', count: realEstate.length },
    { id: 'apartment', label: 'Apartments', count: realEstate.filter(p => p.title.toLowerCase().includes('apartment')).length },
    { id: 'house', label: 'Houses', count: realEstate.filter(p => p.title.toLowerCase().includes('house') || p.title.toLowerCase().includes('duplex')).length },
    { id: 'commercial', label: 'Commercial', count: realEstate.filter(p => p.title.toLowerCase().includes('commercial') || p.title.toLowerCase().includes('building')).length }
  ];

  const filteredProperties = realEstate.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesType = selectedType === 'all';
    
    if (selectedType === 'apartment') {
      matchesType = property.title.toLowerCase().includes('apartment') || property.title.toLowerCase().includes('studio');
    } else if (selectedType === 'house') {
      matchesType = property.title.toLowerCase().includes('house') || property.title.toLowerCase().includes('duplex');
    } else if (selectedType === 'commercial') {
      matchesType = property.title.toLowerCase().includes('commercial') || property.title.toLowerCase().includes('building');
    }
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Real Estate</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search properties by location or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Property Type Filters */}
          {showFilters && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Property Type</h3>
              <div className="grid grid-cols-2 gap-2">
                {propertyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`text-left p-3 rounded-lg transition ${
                      selectedType === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className={`text-xs ${selectedType === type.id ? 'text-blue-100' : 'text-gray-500'}`}>
                      {type.count} available
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Home className="text-blue-600 mx-auto mb-1" size={20} />
              <div className="text-lg font-bold text-blue-600">{filteredProperties.length}</div>
              <div className="text-xs text-blue-700">Available</div>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <MapPin className="text-green-600 mx-auto mb-1" size={20} />
              <div className="text-lg font-bold text-green-600">5+</div>
              <div className="text-xs text-green-700">Locations</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3 text-center">
              <Building className="text-purple-600 mx-auto mb-1" size={20} />
              <div className="text-lg font-bold text-purple-600">3</div>
              <div className="text-xs text-purple-700">Types</div>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid */}
      <div className="px-4 py-6">
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.map((property) => (
              <RealEstateCard key={property.id} data={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Home size={48} className="mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}