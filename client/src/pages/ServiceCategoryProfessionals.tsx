import { useState, useMemo } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Star, MapPin, Shield, MessageCircle } from 'lucide-react';
import { ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { serviceCategories, dummyProfessionals, type Professional } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

export default function ServiceCategoryProfessionals() {
  const [, params] = useRoute('/services/:categoryId');
  const categoryId = params?.categoryId || '';
  
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null);

  // Find the category
  const category = serviceCategories.find(cat => cat.id === categoryId);
  
  // Get professionals for this category
  const professionals = useMemo(() => {
    return dummyProfessionals.filter(professional => professional.category === categoryId);
  }, [categoryId]);

  const openChat = (professional: Professional) => {
    setSelectedProfessional(professional);
    setChatOpen(true);
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Category Not Found</h2>
          <Link href="/services">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Services
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/services">
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{category.name}</h1>
                <p className="text-teal-100">{professionals.length} verified professionals available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professionals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {professionals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <category.icon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No professionals found</h3>
            <p className="text-gray-500">Be the first to offer {category.name.toLowerCase()} services</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((professional) => (
              <div
                key={professional.id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Professional Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={professional.avatar}
                    alt={professional.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-gray-800 truncate">{professional.name}</h3>
                      {professional.verified && (
                        <ShieldCheckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    
                    {/* Rating and Trust Score */}
                    <div className="flex items-center space-x-3 mt-1">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{professional.rating}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <div className="flex items-center">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600 ml-1">{professional.trustCount} trust</span>
                      </div>
                    </div>

                    {/* Experience and Rate */}
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-sm text-gray-600">{professional.experience} years exp</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm font-semibold text-blue-600">{professional.rate}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{professional.bio}</p>

                {/* Location */}
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="truncate">{professional.location}</span>
                </div>

                {/* Projects Count */}
                <div className="text-sm text-gray-600 mb-4">
                  <span className="font-medium">{professional.completedProjects}</span> completed projects
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => openChat(professional)}
                    className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Chat</span>
                  </button>
                  <Link href={`/professional/${professional.id}`}>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                      View Profile
                    </button>
                  </Link>
                </div>
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