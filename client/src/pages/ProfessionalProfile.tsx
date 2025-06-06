import { useState } from 'react';
import { useRoute } from 'wouter';
import { ArrowLeft, Star, Shield, MessageCircle, MapPin, Calendar, Briefcase, Phone, Mail, Globe } from 'lucide-react';
import { dummyProfessionals, serviceCategories, type Professional } from '../data/professionalData';
import ChatBox from '../components/ChatBox';

export default function ProfessionalProfile() {
  const [, params] = useRoute('/professional-profile/:username');
  const [chatOpen, setChatOpen] = useState(false);
  
  const professional = dummyProfessionals.find(p => p.username === params?.username);

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Not Found</h2>
          <p className="text-gray-600 mb-4">The professional you're looking for doesn't exist.</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const category = serviceCategories.find(cat => cat.id === professional.category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            Back to Services
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={professional.photo}
                alt={professional.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 mx-auto md:mx-0"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{professional.name}</h1>
                    {professional.verified && (
                      <Shield className="text-green-500" size={24} />
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start gap-1 mb-3">
                    <Star className="text-yellow-500 fill-current" size={20} />
                    <span className="text-xl font-semibold text-gray-700">{professional.rating}</span>
                    <span className="text-gray-500">({professional.trustCount} reviews)</span>
                  </div>

                  {category && (
                    <div className="mb-4">
                      <span className={`inline-block bg-gradient-to-r ${category.color} text-white text-sm font-semibold px-4 py-2 rounded-full`}>
                        {category.icon} {category.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setChatOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto md:mx-0"
                >
                  <MessageCircle size={20} />
                  Start Chat
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Calendar size={24} className="mx-auto text-gray-600 mb-2" />
                  <p className="text-lg font-bold text-gray-900">{professional.experience}</p>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Briefcase size={24} className="mx-auto text-gray-600 mb-2" />
                  <p className="text-lg font-bold text-gray-900">{professional.completedProjects}</p>
                  <p className="text-sm text-gray-600">Projects Completed</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <MapPin size={24} className="mx-auto text-gray-600 mb-2" />
                  <p className="text-sm font-bold text-gray-900">{professional.location}</p>
                  <p className="text-sm text-gray-600">Location</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{professional.bio}</p>
        </div>

        {/* Services & Expertise */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Services & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Primary Services</h3>
              <div className="space-y-2">
                {category?.name === 'Architecture & Building Design' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Residential Design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Commercial Buildings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Building Plans & Permits</span>
                    </div>
                  </>
                )}
                {category?.name === 'Plumbing & Pipe Repairs' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Emergency Pipe Repairs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Water System Installation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Drainage Solutions</span>
                    </div>
                  </>
                )}
                {category?.name === 'Web Development & Maintenance' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Business Websites</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">E-commerce Platforms</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Website Maintenance</span>
                    </div>
                  </>
                )}
                {category?.name === 'Fridge & AC Repairs' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Refrigerator Repairs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Air Conditioning Service</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Cooling System Installation</span>
                    </div>
                  </>
                )}
                {category?.name === 'Electronics Repairs (TVs, Radios, etc.)' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">TV & Audio Repairs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Home Appliance Fixes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Electronic Diagnostics</span>
                    </div>
                  </>
                )}
                {category?.name === 'Mobile Phone Repairs' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Screen Replacements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Battery Replacements</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Software Troubleshooting</span>
                    </div>
                  </>
                )}
                {category?.name === 'Tailoring & Clothing Alterations' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Custom Clothing Design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Clothing Alterations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Traditional Wear</span>
                    </div>
                  </>
                )}
                {category?.name === 'Laptop & Computer Repairs' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Hardware Repairs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Software Installation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Virus Removal</span>
                    </div>
                  </>
                )}
                {category?.name === 'Event Planning & Management' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Wedding Planning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Corporate Events</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Cultural Celebrations</span>
                    </div>
                  </>
                )}
                {category?.name === 'Photography & Videography' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Wedding Photography</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Event Documentation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Corporate Videos</span>
                    </div>
                  </>
                )}
                {category?.name === 'Cleaning & Housekeeping Services' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Home Cleaning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Office Cleaning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Deep Cleaning Services</span>
                    </div>
                  </>
                )}
                {category?.name === 'Electrical Installations & Repairs' && (
                  <>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Home Wiring</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Electrical Installations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700">Emergency Electrical Repairs</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Available for new projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Response time: Within 2 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Free consultation available</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Chat</h3>
              <p className="text-gray-600 text-sm mb-3">Start a conversation</p>
              <button
                onClick={() => setChatOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Send Message
              </button>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Phone className="text-green-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call</h3>
              <p className="text-gray-600 text-sm mb-3">Direct phone contact</p>
              <a
                href="tel:+237670000000"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm inline-block"
              >
                Call Now
              </a>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <Mail className="text-purple-600" size={24} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm mb-3">Professional inquiry</p>
              <a
                href={`mailto:${professional.username}@prolist.cm`}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm inline-block"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <ChatBox
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          recipientName={professional.name}
          currentUser="You"
        />
      )}
    </div>
  );
}