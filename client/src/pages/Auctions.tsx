import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Gavel, Shield } from "lucide-react";
import { useQuery } from '@tanstack/react-query';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Auctions() {
  const [countdowns, setCountdowns] = useState<{ [key: number]: Countdown | null }>({});

  // Fetch auctions from API
  const { data: auctions = [], isLoading } = useQuery({
    queryKey: ['/api/auctions'],
    queryFn: async () => {
      const response = await fetch('/api/auctions');
      if (!response.ok) throw new Error('Failed to fetch auctions');
      return response.json();
    }
  });

  // Fetch vendor applications and users data
  const { data: vendorApplications = [] } = useQuery({
    queryKey: ['/api/vendor/applications'],
    queryFn: async () => {
      const response = await fetch('/api/vendor/applications');
      if (!response.ok) return [];
      return response.json();
    }
  });

  const { data: users = [] } = useQuery({
    queryKey: ['/api/users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) return [];
      return response.json();
    }
  });

  // Combine vendor applications with user data
  const vendors = vendorApplications.reduce((acc: any, vendor: any) => {
    const user = users.find((u: any) => u.id === vendor.userId);
    acc[vendor.userId] = {
      ...vendor,
      username: user?.username || vendor.fullName,
      fullName: vendor.fullName
    };
    return acc;
  }, {});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newCountdowns: { [key: number]: Countdown | null } = {};

      auctions.forEach((auction: any) => {
        const distance = new Date(auction.endDate).getTime() - now;
        if (distance > 0) {
          newCountdowns[auction.id] = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / (1000 * 60)) % 60),
            seconds: Math.floor((distance / 1000) % 60),
          };
        } else {
          newCountdowns[auction.id] = null; // auction ended
        }
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Gavel className="text-primary" size={32} />
          <h2 className="text-3xl font-bold text-primary">
            Live Auctions
          </h2>
        </div>
        <button 
          onClick={() => window.location.href = '/auction-listing'}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <Gavel size={20} />
          Post New Auction
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Only Premium Users Can Post Deals. All Prices Are in CFA.
      </p>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {auctions.map((auction: any, index: number) => {
          const timer = countdowns[auction.id];
          const ended = timer === null;
          return (
            <Link
              href={`/auction/${auction.id}`}
              key={auction.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col group"
            >
              <div className="relative">
                {auction.images && auction.images.length > 0 ? (
                  <img
                    src={auction.images[0]}
                    alt={auction.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  {vendors[auction.vendorId] && (
                    <span className={`text-white text-xs px-2 py-1 rounded-full ${
                      vendors[auction.vendorId].status === 'Premium Verified' 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                        : 'bg-green-600'
                    }`}>
                      {vendors[auction.vendorId].status === 'Premium Verified' ? 'Pro Verified' : 'Basic Verified'}
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Auction
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  {!ended && timer && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {timer.days}d {timer.hours}h {timer.minutes}m
                    </span>
                  )}
                  {ended && (
                    <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Ended
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
                  {auction.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
                  {auction.description}
                </p>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Starting Price</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {parseFloat(auction.startingPrice).toLocaleString()} CFA
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Current Bid</span>
                    <span className="text-lg font-bold text-yellow-600">
                      {parseFloat(auction.currentBid || auction.startingPrice).toLocaleString()} CFA
                    </span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700 font-medium">
                        {vendors[auction.vendorId] ? 
                          (vendors[auction.vendorId].username || vendors[auction.vendorId].fullName) : 
                          `Vendor #${auction.vendorId}`
                        }
                      </span>
                      <div className="flex items-center gap-1 text-green-600">
                        <Shield className="w-3 h-3" />
                        <span className="text-xs">{Math.floor(Math.random() * 50) + 10}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        </div>
      )}
    </div>
  );
}