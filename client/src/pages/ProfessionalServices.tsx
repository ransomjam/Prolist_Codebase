import { useState, KeyboardEvent, useMemo } from 'react';
import { Link } from 'wouter';
import { Search, Star, MapPin, Calendar, Briefcase, ChevronDown, Filter } from 'lucide-react';
import { ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { serviceCategories, dummyProfessionals, type Professional, type ServiceCategory } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

export default function ProfessionalServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [priceRange, setPriceRange] = useState('All Prices');
  const [experienceLevel, setExperienceLevel] = useState('All Experience');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  // Filter categories and create arrays for filter dropdowns
  const categoryOptions = ['All Categories', ...serviceCategories.map(cat => cat.name)];
  const priceOptions = ['All Prices', 'Under 10,000 FCFA', '10,000 - 25,000 FCFA', '25,000 - 50,000 FCFA', 'Over 50,000 FCFA'];
  const experienceOptions = ['All Experience', 'Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (6+ years)', 'Expert Level (10+ years)'];

  // Get professionals by category for accordion display
  const getProfessionalsByCategory = (categoryId: string) => {
    return dummyProfessionals.filter(professional => professional.category === categoryId);
  };

  // Enhanced filtering logic with multiple criteria
  const filteredData = useMemo(() => {
    let filtered = serviceCategories.map(category => ({
      ...category,
      professionals: getProfessionalsByCategory(category.id)
    }));

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.map(category => ({
        ...category,
        professionals: category.professionals.filter(professional =>
          professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          professional.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.professionals.length > 0
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(category => category.name === selectedCategory);
    }

    // Apply price range filter
    if (priceRange !== 'All Prices') {
      filtered = filtered.map(category => ({
        ...category,
        professionals: category.professionals.filter(professional => {
          const price = parseInt(professional.rate.replace(/[^0-9]/g, ''));
          switch (priceRange) {
            case 'Under 10,000 FCFA': return price < 10000;
            case '10,000 - 25,000 FCFA': return price >= 10000 && price <= 25000;
            case '25,000 - 50,000 FCFA': return price >= 25000 && price <= 50000;
            case 'Over 50,000 FCFA': return price > 50000;
            default: return true;
          }
        })
      })).filter(category => category.professionals.length > 0);
    }

    // Apply experience level filter
    if (experienceLevel !== 'All Experience') {
      filtered = filtered.map(category => ({
        ...category,
        professionals: category.professionals.filter(professional => {
          const experience = professional.experience;
          switch (experienceLevel) {
            case 'Entry Level (0-2 years)': return experience <= 2;
            case 'Mid Level (3-5 years)': return experience >= 3 && experience <= 5;
            case 'Senior Level (6+ years)': return experience >= 6 && experience < 10;
            case 'Expert Level (10+ years)': return experience >= 10;
            default: return true;
          }
        })
      })).filter(category => category.professionals.length > 0);
    }

    return filtered;
  }, [searchTerm, selectedCategory, priceRange, experienceLevel]);

  const toggleCard = (categoryId: string) => {
    setExpandedCard(expandedCard === categoryId ? null : categoryId);
  };

  const handleSearchKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const openChat = (professional: Professional) => {
    setSelectedProfessional(professional);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Professional Services
            </h1>
            <p className="text-lg sm:text-xl font-light mb-2 text-teal-100">
              in Bamenda
            </p>
            <p className="text-teal-100 text-sm sm:text-base mb-6 max-w-3xl mx-auto">
              Connect with verified local service providers for all your needs. Find trusted professionals in your area.
            </p>
            
            {/* Search and Filter Interface */}
            <div className="max-w-6xl mx-auto space-y-4">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10" size={20} />
                <input
                  type="text"
                  placeholder="Search professionals, services, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white/40 transition-all duration-300"
                />
              </div>
              
              {/* Filter Row */}
              <div className="flex flex-wrap gap-3 justify-center">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    {categoryOptions.map(option => (
                      <option key={option} value={option} className="text-gray-800 bg-white">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
                </div>

                {/* Price Range Filter */}
                <div className="relative">
                  <select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    {priceOptions.map(option => (
                      <option key={option} value={option} className="text-gray-800 bg-white">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
                </div>

                {/* Experience Level Filter */}
                <div className="relative">
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="appearance-none bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 pr-8 text-white text-sm focus:outline-none focus:border-white/40 cursor-pointer"
                  >
                    {experienceOptions.map(option => (
                      <option key={option} value={option} className="text-gray-800 bg-white">
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredData.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100">
                {/* Category Header */}
                <div
                  onClick={() => toggleCard(category.id)}
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.professionals.length} professionals available</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                      expandedCard === category.id ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {/* Professionals Grid */}
                {expandedCard === category.id && (
                  <div className="px-6 pb-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.professionals.map((professional) => (
                        <div
                          key={professional.id}
                          className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-blue-300"
                        >
                          <div className="flex items-start space-x-4">
                            <img
                              src={professional.avatar}
                              alt={professional.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-800 truncate">{professional.name}</h4>
                                {professional.verified && (
                                  <ShieldCheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-sm text-gray-600 ml-1">{professional.rating}</span>
                                </div>
                                <span className="text-gray-300">•</span>
                                <span className="text-sm text-gray-600">{professional.experience} years</span>
                              </div>

                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{professional.bio}</p>
                              
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-3">
                                  <span className="text-sm font-semibold text-blue-600">{professional.rate}</span>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    <span className="truncate">{professional.location}</span>
                                  </div>
                                </div>
                                
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => openChat(professional)}
                                    className="p-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors duration-200"
                                    title="Chat with professional"
                                  >
                                    <ChatBubbleLeftRightIcon className="w-4 h-4 text-blue-600" />
                                  </button>
                                  <Link href={`/professional/${professional.id}`}>
                                    <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200">
                                      View Profile
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Component */}
      {chatOpen && selectedProfessional && (
        <ChatBox
          vendorName={selectedProfessional.name}
          buyerName="You"
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}