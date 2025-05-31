import { verifiedBusinesses } from '../data/demoData';
import { useState } from 'react';
import { Search, Shield, MapPin, Eye, MessageSquare, Phone } from 'lucide-react';

export default function VerifiedDirectory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBusinesses = verifiedBusinesses.filter(business =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">✅ Verified Businesses</h2>
      <p className="mb-4 text-gray-600">All businesses listed below are officially verified on ProList.</p>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search verified businesses..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBusinesses.map((biz) => (
          <div key={biz.id} className="bg-white p-4 rounded-xl shadow-neonBlue hover:shadow-neonGreen transition hover:scale-105">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-primary">{biz.name}</h3>
              <Shield className="text-emerald" size={20} />
            </div>
            <p className="text-sm text-gray-600 mb-2">{biz.type}</p>
            
            <div className="flex items-center gap-1 mb-2">
              <MapPin className="text-gray-400" size={14} />
              <span className="text-sm text-gray-500">{biz.location}</span>
            </div>
            
            <p className="text-sm text-gray-500 mb-2">👤 {biz.owner}</p>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1">
                <span className="text-sm">🛡️ Trust: </span>
                <span className="font-semibold text-emerald">{biz.trustCount}</span>
              </div>
              <span className="text-xs text-white bg-emerald px-2 py-1 rounded-full">✔ Verified</span>
            </div>
            
            <div className="flex gap-2 mb-3">
              <a href={`https://wa.me/237670000000`} target="_blank" className="text-green-600 hover:underline text-sm font-medium">
                WhatsApp
              </a>
              <button className="text-blue-600 text-sm flex items-center gap-1 font-medium hover:text-blue-700">
                <MessageSquare className="h-4 w-4" /> Comments
              </button>
              <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-700">
                <Phone className="h-4 w-4" /> Call
              </button>
            </div>
            
            <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Eye size={16} />
              View Business
            </button>
          </div>
        ))}
      </div>

      {filteredBusinesses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No verified businesses found matching your search.</p>
          <p className="text-gray-400 text-sm mt-2">Try a different search term.</p>
        </div>
      )}
    </div>
  );
}