import { useState, KeyboardEvent } from 'react';
import { Link } from 'wouter';
import { Search, Star, MapPin, Calendar, Briefcase, ChevronDown } from 'lucide-react';
import { ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { serviceCategories, dummyProfessionals, type Professional, type ServiceCategory } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

export default function ProfessionalServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  // Get professionals by category for accordion display
  const getProfessionalsByCategory = (categoryId: string) => {
    return dummyProfessionals.filter(professional => professional.category === categoryId);
  };

  // Filter categories based on search
  const filteredCategories = serviceCategories.filter(category => {
    if (!searchTerm) return true;
    
    const categoryMatches = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    const professionalsMatch = getProfessionalsByCategory(category.id).some(professional =>
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.bio.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return categoryMatches || professionalsMatch;
  });

  const toggleCard = (categoryId: string) => {
    setExpandedCard(expandedCard === categoryId ? null : categoryId);
  };

  const handleKeyPress = (event: KeyboardEvent, categoryId: string) => {
    if (event.key === 'Enter') {
      toggleCard(categoryId);
    }
  };

  const openChat = (professional: Professional) => {
    setSelectedProfessional(professional);
    setChatOpen(true);
  };

  const closeChat = () => {
    setChatOpen(false);
    setSelectedProfessional(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Professional Services in Bamenda</h1>
          <p className="text-teal-100 text-lg mb-6 text-justify">Connect with verified local service providers for all your needs</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search services or professionals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg text-gray-900 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Service Categories with Accordion */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse Services by Category</h2>
          
          {/* Responsive Grid: 1 column mobile, 2 tablet, 3 desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category: ServiceCategory) => {
              const categoryProfessionals = getProfessionalsByCategory(category.id);
              const isExpanded = expandedCard === category.id;
              
              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-xl shadow-lg transition-all duration-300 overflow-hidden border-2 ${
                    isExpanded 
                      ? 'border-teal-400 shadow-xl shadow-teal-200' 
                      : 'border-gray-200 hover:border-teal-300 hover:shadow-xl'
                  }`}
                >
                  {/* Service Card Header */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() => toggleCard(category.id)}
                    onKeyDown={(e) => handleKeyPress(e, category.id)}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isExpanded}
                    aria-controls={`professionals-${category.id}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`text-3xl p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{category.name}</h3>
                          <p className="text-sm text-gray-600">{categoryProfessionals.length} professionals available</p>
                        </div>
                      </div>
                      <ChevronDown 
                        className={`text-gray-400 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} 
                        size={20} 
                      />
                    </div>
                    
                    {/* Short Description */}
                    <div className="mt-4">
                      <p className="text-gray-600 text-sm text-justify max-h-14 overflow-hidden leading-relaxed">
                        {category.id === 'architecture' && 'Professional building design, plans, and architectural consultation services for residential and commercial projects.'}
                        {category.id === 'plumbing' && 'Expert plumbing repairs, installations, and maintenance for homes and businesses with 24/7 emergency service.'}
                        {category.id === 'fridge-ac' && 'Specialized repair and maintenance services for refrigerators, air conditioners, and cooling systems.'}
                        {category.id === 'electronics' && 'Professional repair services for TVs, radios, audio systems, and home electronic appliances.'}
                        {category.id === 'printer' && 'Expert printer and copier repair, maintenance, and installation services for offices and homes.'}
                        {category.id === 'computer' && 'Computer and laptop repair, software installation, virus removal, and technical support services.'}
                        {category.id === 'webdev' && 'Professional website development, maintenance, and digital solutions for local businesses.'}
                        {category.id === 'graphics' && 'Creative graphic design, branding, logo design, and marketing materials for businesses.'}
                        {category.id === 'video' && 'Professional video editing, production, and multimedia content creation services.'}
                        {category.id === 'mobile' && 'Mobile phone repair specialists for screen replacement, battery service, and software troubleshooting.'}
                        {category.id === 'electrical' && 'Licensed electrical installations, repairs, and maintenance for residential and commercial properties.'}
                        {category.id === 'tailoring' && 'Expert tailoring, clothing alterations, custom designs, and traditional wear specialists.'}
                        {category.id === 'cleaning' && 'Professional cleaning and housekeeping services for homes, offices, and commercial spaces.'}
                        {category.id === 'events' && 'Complete event planning and management for weddings, corporate events, and celebrations.'}
                        {category.id === 'marketing' && 'Digital marketing, social media management, and online promotion services for businesses.'}
                        {category.id === 'photography' && 'Professional photography and videography for weddings, events, and commercial projects.'}
                        {category.id === 'welding' && 'Expert welding and metal fabrication services for construction and repair projects.'}
                        {category.id === 'carpentry' && 'Skilled carpentry and furniture making services for custom woodwork and repairs.'}
                      </p>
                    </div>
                  </div>

                  {/* Expanded Professionals List */}
                  {isExpanded && (
                    <div 
                      id={`professionals-${category.id}`}
                      className="border-t border-gray-200 bg-gray-50 max-h-96 overflow-y-auto"
                    >
                      <div className="p-4 space-y-3">
                        {categoryProfessionals.map((professional: Professional) => (
                          <div
                            key={professional.id}
                            className="bg-white rounded-lg p-4 border border-gray-200 hover:border-teal-300 transition-all duration-200"
                          >
                            <div className="flex items-start gap-3">
                              <img
                                src={professional.photo}
                                alt={professional.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-gray-900">{professional.name}</h4>
                                  {professional.verified && (
                                    <ShieldCheckIcon className="text-green-500 w-4 h-4" />
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-3 mb-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Star className="text-yellow-500 fill-current w-3 h-3" />
                                    <span className="font-medium">{professional.rating}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <ShieldCheckIcon className="text-blue-500 w-3 h-3" />
                                    <span>{professional.trustCount} trust points</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Briefcase className="text-gray-500 w-3 h-3" />
                                    <span>{professional.completedProjects} projects</span>
                                  </div>
                                </div>
                                
                                <p className="text-xs text-gray-600 text-justify line-clamp-2 mb-3">
                                  {professional.bio}
                                </p>
                                
                                <div className="flex gap-2">
                                  <Link 
                                    href={`/professional-profile/${professional.username}`}
                                    className="bg-teal-600 hover:bg-teal-700 text-white py-1 px-3 rounded-md text-xs font-medium transition-colors"
                                  >
                                    View Profile
                                  </Link>
                                  <button
                                    onClick={() => openChat(professional)}
                                    className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-md transition-colors"
                                  >
                                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        {categoryProfessionals.length === 0 && (
                          <div className="text-center py-6 text-gray-500">
                            <p className="text-sm">No professionals available in this category yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 text-justify">Try adjusting your search terms to find relevant services</p>
          </div>
        )}
      </div>

      {/* Chat Modal */}
      {chatOpen && selectedProfessional && (
        <ChatBox
          isOpen={chatOpen}
          onClose={closeChat}
          recipientName={selectedProfessional.name}
          currentUser="You"
        />
      )}
    </div>
  );
}