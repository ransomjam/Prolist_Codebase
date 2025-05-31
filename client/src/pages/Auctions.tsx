import { Clock, Gavel, Users, TrendingUp } from "lucide-react";
import Button from "../components/Button";

export default function Auctions() {
  const auctions = [
    {
      id: 1,
      title: "Traditional Art Collection",
      description: "Authentic Bamenda pottery and wood carvings",
      currentBid: "₦125,000",
      bidCount: 15,
      timeLeft: "2h 45m",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      status: "live",
      category: "Art & Crafts"
    },
    {
      id: 2,
      title: "Vintage Motorcycle",
      description: "Classic 1980s motorcycle in good condition",
      currentBid: "₦450,000",
      bidCount: 8,
      timeLeft: "1h 20m",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      status: "live",
      category: "Vehicles"
    },
    {
      id: 3,
      title: "Electronics Bundle",
      description: "Laptop, phone, and accessories package",
      currentBid: "₦89,000",
      bidCount: 23,
      timeLeft: "4h 15m",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      status: "live",
      category: "Electronics"
    },
    {
      id: 4,
      title: "Land Plot - Nkwen",
      description: "500 sqm residential plot with mountain view",
      currentBid: "₦2,500,000",
      bidCount: 5,
      timeLeft: "Ended",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      status: "ended",
      category: "Real Estate"
    }
  ];

  const liveAuctions = auctions.filter(auction => auction.status === 'live');
  const endedAuctions = auctions.filter(auction => auction.status === 'ended');

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">Live Auctions</h1>
        <p className="text-gray-600 text-lg">Bid on unique items from local sellers</p>
      </div>

      {/* Auction Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-red-500 mb-1">
            {liveAuctions.length}
          </div>
          <div className="text-sm text-gray-600">Live Auctions</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-emerald mb-1">
            {auctions.reduce((total, auction) => total + auction.bidCount, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Bids</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-neonBlue mb-1">12</div>
          <div className="text-sm text-gray-600">Active Bidders</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
          <div className="text-2xl font-bold text-neonGreen mb-1">₦3.2M</div>
          <div className="text-sm text-gray-600">Today's Volume</div>
        </div>
      </div>

      {/* Live Auctions */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          Live Auctions
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveAuctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-neonBlue transition-all duration-300">
              <div className="relative">
                <img src={auction.image} alt={auction.title} className="h-48 w-full object-cover" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-white bg-red-500 px-2 py-1 rounded">LIVE</span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {auction.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary mb-2">{auction.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{auction.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Current Bid</p>
                    <p className="text-xl font-bold text-emerald">{auction.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Time Left</p>
                    <p className="text-sm font-semibold text-red-500">{auction.timeLeft}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={14} />
                    <span>{auction.bidCount} bids</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-emerald">
                    <TrendingUp size={14} />
                    <span>Active</span>
                  </div>
                </div>
                
                <Button variant="neon" className="w-full">
                  <Gavel className="mr-2" size={16} />
                  Place Bid
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Ended */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recently Ended</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {endedAuctions.map((auction) => (
            <div key={auction.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 opacity-75">
              <div className="relative">
                <img src={auction.image} alt={auction.title} className="h-48 w-full object-cover grayscale" />
                <div className="absolute top-3 left-3">
                  <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">ENDED</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-600 mb-2">{auction.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{auction.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-400">Final Bid</p>
                    <p className="text-xl font-bold text-gray-600">{auction.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Total Bids</p>
                    <p className="text-sm font-semibold text-gray-600">{auction.bidCount}</p>
                  </div>
                </div>
                
                <button className="w-full bg-gray-300 text-gray-600 py-2 rounded-lg cursor-not-allowed">
                  Auction Ended
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
