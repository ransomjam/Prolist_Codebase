import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Gavel, Shield } from "lucide-react";
import { auctions } from '../data/demoData';
import { useScrollAnimations } from '../hooks/useScrollAnimations';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Auctions() {
  const [countdowns, setCountdowns] = useState<{ [key: number]: Countdown | null }>({});
  const { setElementRef, getAnimationClass, getAnimationStyle } = useScrollAnimations();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const newCountdowns: { [key: number]: Countdown | null } = {};

      auctions.forEach(({ id, endTime }) => {
        const distance = new Date(endTime).getTime() - now;
        if (distance > 0) {
          newCountdowns[id] = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / (1000 * 60)) % 60),
            seconds: Math.floor((distance / 1000) % 60),
          };
        } else {
          newCountdowns[id] = null; // auction ended
        }
      });

      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 scroll-smooth">
      <div 
        ref={(el) => setElementRef('auction-header', el)}
        data-animation-id="auction-header"
        className={`flex items-center justify-between mb-6 gpu-accelerated will-change-transform ${getAnimationClass('auction-header', 0, 'slide')}`}
        style={getAnimationStyle(0)}
      >
        <div className="flex items-center gap-3">
          <Gavel className="text-primary" size={32} />
          <h2 
            ref={(el) => setElementRef('auction-title', el)}
            data-animation-id="auction-title"
            className={`text-3xl font-bold text-primary ${getAnimationClass('auction-title', 1)}`}
            style={getAnimationStyle(1)}
          >
            Live Auctions
          </h2>
        </div>
        <button 
          ref={(el) => setElementRef('post-auction-btn', el)}
          data-animation-id="post-auction-btn"
          onClick={() => window.location.href = '/product-listing'}
          className={`bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 gpu-accelerated will-change-transform ${getAnimationClass('post-auction-btn', 2)}`}
          style={getAnimationStyle(2)}
        >
          <Gavel size={20} />
          Post New Auction
        </button>
      </div>
      <p 
        ref={(el) => setElementRef('auction-subtitle', el)}
        data-animation-id="auction-subtitle"
        className={`text-sm text-gray-600 mb-6 ${getAnimationClass('auction-subtitle', 3)}`}
        style={getAnimationStyle(3)}
      >
        Only Premium Users Can Post Deals. All Prices Are in CFA.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {auctions.map((auction, index) => {
          const timer = countdowns[auction.id];
          const ended = timer === null;
          return (
            <Link
              href={`/auction/${auction.id}`}
              key={auction.id}
              ref={(el) => setElementRef(`auction-${auction.id}`, el)}
              data-animation-id={`auction-${auction.id}`}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col group gpu-accelerated will-change-transform ${getAnimationClass(`auction-${auction.id}`, index + 4)}`}
              style={getAnimationStyle(index + 4)}
            >
              <div className="relative">
                <img
                  src={auction.product.image}
                  alt={auction.product.title}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  {auction.verified && (
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </span>
                  )}
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
                  {auction.product.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
                  {auction.product.description}
                </p>
                
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Starting Price</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {auction.startingPrice.toLocaleString()} CFA
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Current Bid</span>
                    <span className="text-lg font-bold text-yellow-600">
                      {auction.currentBid.toLocaleString()} CFA
                    </span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-700 font-medium">
                        {auction.vendor}
                      </span>
                      <span className="text-xs text-gray-400">
                        #{auction.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}