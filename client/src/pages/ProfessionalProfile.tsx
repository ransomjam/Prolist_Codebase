import { useState } from 'react';
import { useRoute, Link } from 'wouter';
import { ArrowLeft, Star, Shield, MessageCircle, MapPin, Calendar, Briefcase, CheckCircle } from 'lucide-react';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';
import { dummyProfessionals, serviceCategories, type Professional } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

export default function ProfessionalProfile() {
  const [, params] = useRoute('/professional-profile/:username');
  const [, paramsById] = useRoute('/professional/:id');
  const [chatOpen, setChatOpen] = useState(false);
  
  // Find professional by username or ID
  const professional = dummyProfessionals.find(p => 
    p.username === params?.username || p.id === paramsById?.id
  );

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Not Found</h2>
          <p className="text-gray-600 mb-4">The professional you're looking for doesn't exist.</p>
          <Link href="/services">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Browse Services
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const category = serviceCategories.find(cat => cat.id === professional.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/services">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4">
              <ArrowLeft size={20} />
              Back to Services
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={professional.avatar}
                  alt={professional.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mx-auto sm:mx-0"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gray-800">{professional.name}</h1>
                    {professional.verified && (
                      <ShieldCheckIcon className="w-8 h-8 text-blue-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                    <div className={`w-3 h-3 bg-gradient-to-r ${category?.color} rounded-full`}></div>
                    <span className="text-lg text-gray-600">{category?.name}</span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start space-x-6 mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-800">{professional.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-5 h-5 text-green-500 mr-1" />
                      <span className="font-semibold text-gray-800">{professional.trustCount} trust</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{professional.location}</span>
                  </div>

                  <p className="text-lg font-semibold text-blue-600">{professional.rate}</p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">About</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{professional.bio}</p>
            </div>

            {/* Services Offered */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Services Offered</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {professional.services.map((service, index) => (
                  <div key={index} className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-800">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Portfolio */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Experience & Portfolio</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Calendar className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{professional.experience}</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Briefcase className="w-8 h-8 mx-auto text-green-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{professional.completedProjects}</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <Shield className="w-8 h-8 mx-auto text-purple-600 mb-3" />
                  <div className="text-2xl font-bold text-gray-800">{professional.trustCount}</div>
                  <div className="text-gray-600">Trust Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Hire {professional.name}</h3>
              
              {/* Pricing */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">Starting from</div>
                  <div className="text-2xl font-bold text-blue-600">{professional.rate}</div>
                  <div className="text-sm text-gray-500 mt-1">Escrow protected</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Link href={`/service-checkout/${professional.id}`}>
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                    Hire Now
                  </button>
                </Link>
                
                <button
                  onClick={() => setChatOpen(true)}
                  className="w-full flex items-center justify-center space-x-2 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat First</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold text-gray-800 mb-4">Why Choose {professional.name.split(' ')[0]}?</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-500 mr-2" />
                    <span>Verified Professional</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    <span>Escrow Protection</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    <span>Highly Rated</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageCircle className="w-4 h-4 text-purple-500 mr-2" />
                    <span>Quick Response</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-semibold text-gray-800 mb-3">Response Time</h4>
                <p className="text-sm text-gray-600">
                  Typically responds within 2-4 hours during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      {chatOpen && (
        <ChatBox
          vendorName={professional.name}
          buyerName="You"
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
        />
      )}
    </div>
  );
}