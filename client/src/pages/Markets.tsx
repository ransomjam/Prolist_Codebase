import { Clock, MapPin, Star, Shield } from "lucide-react";
import { markets } from "../data/demoData";

export default function Markets() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Local Markets in Bamenda</h1>
        <p className="text-gray-600">Discover authentic local markets and their unique offerings</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Market Listings */}
        <div className="space-y-6">
          {markets.map((market) => (
            <div key={market.id} className="bg-white rounded-xl overflow-hidden shadow-neonBlue border border-gray-100">
              <img src={market.image} alt={market.name} className="h-64 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1">{market.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="text-emerald" size={16} />
                      <span>{market.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {market.verified && <Shield className="text-neonBlue" size={16} />}
                    <span className="bg-emerald text-white text-xs px-2 py-1 rounded-full">Verified</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{market.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="text-neonYellow fill-current" size={16} />
                      <span className="font-semibold">{market.rating}</span>
                      <span className="text-gray-500 text-sm">({market.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="text-emerald" size={16} />
                      <span className="text-sm">{market.hours}</span>
                    </div>
                  </div>
                  <span className="bg-emerald text-white text-sm px-3 py-1 rounded-full">Open Now</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {market.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-primary text-xs px-2 py-1 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Info Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Market Hours & Info</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Most Active Hours</span>
                <span className="font-semibold text-primary">8 AM - 12 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Visit Duration</span>
                <span className="font-semibold text-emerald">45 minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Methods</span>
                <div className="flex gap-2">
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">Cash</span>
                  <span className="bg-blue-100 text-primary text-xs px-2 py-1 rounded">Mobile Money</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-neonBlue to-primary rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-3">💡 Market Tips</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-start gap-2">
                <span className="text-neonGreen">✓</span>
                <span>Visit early morning for the freshest produce</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neonGreen">✓</span>
                <span>Bargaining is expected and welcome</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neonGreen">✓</span>
                <span>Bring small bills for easier transactions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neonGreen">✓</span>
                <span>Ask vendors about seasonal specialties</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
