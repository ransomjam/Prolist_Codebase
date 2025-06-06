import { useState } from 'react';
import { Link } from 'wouter';
import { Search, Star, Shield, MessageCircle, MapPin, Calendar, Briefcase } from 'lucide-react';
import { serviceCategories, dummyProfessionals, type Professional, type ServiceCategory } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

export default function ProfessionalServices() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  const filteredProfessionals = dummyProfessionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || professional.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Trusted Professionals for Any Job</h1>
          <p className="text-blue-100 text-lg mb-6">Connect with verified service providers in Bamenda</p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search professionals by name, service, or expertise..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-900 shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Service Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                selectedCategory === 'all'
                  ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200'
                  : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">🌟</div>
              <p className="text-sm font-semibold text-gray-900">All Services</p>
            </button>
            
            {serviceCategories.map((category: ServiceCategory) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 group ${
                  selectedCategory === category.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-200'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <p className="text-sm font-semibold text-gray-900 text-center leading-tight">
                  {category.name}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {filteredProfessionals.length} Professional{filteredProfessionals.length !== 1 ? 's' : ''} Found
            {selectedCategory !== 'all' && (
              <span className="text-blue-600 ml-2">
                in {serviceCategories.find(cat => cat.id === selectedCategory)?.name}
              </span>
            )}
          </h3>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional: Professional) => (
            <div
              key={professional.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={professional.photo}
                    alt={professional.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-lg">{professional.name}</h4>
                      {professional.verified && (
                        <Shield className="text-green-500" size={16} />
                      )}
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="text-yellow-500 fill-current" size={14} />
                      <span className="text-sm font-semibold text-gray-700">{professional.rating}</span>
                      <span className="text-sm text-gray-500">({professional.trustCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Service Category */}
                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {serviceCategories.find(cat => cat.id === professional.category)?.name}
                  </span>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{professional.bio}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <Calendar size={16} className="mx-auto text-gray-600 mb-1" />
                    <p className="text-xs font-semibold text-gray-900">{professional.experience}</p>
                    <p className="text-xs text-gray-500">Experience</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <Briefcase size={16} className="mx-auto text-gray-600 mb-1" />
                    <p className="text-xs font-semibold text-gray-900">{professional.completedProjects}</p>
                    <p className="text-xs text-gray-500">Projects</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <MapPin size={16} className="mx-auto text-gray-600 mb-1" />
                    <p className="text-xs font-semibold text-gray-900 truncate">{professional.location.split(',')[0]}</p>
                    <p className="text-xs text-gray-500">Location</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link 
                    href={`/professional-profile/${professional.username}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors text-center text-sm"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => openChat(professional)}
                    className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <MessageCircle size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No professionals found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
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