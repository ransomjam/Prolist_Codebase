import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Gavel } from "lucide-react";
import { auctions } from '../data/demoData';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Auctions() {
  const [countdowns, setCountdowns] = useState<{ [key: number]: Countdown | null }>({});

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
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Gavel className="text-primary" size={32} />
        <h2 className="text-3xl font-bold text-primary">Live Auctions</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">Only Premium Users Can Post Deals. All Prices Are in CFA.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {auctions.map((auction) => {
          const timer = countdowns[auction.id];
          const ended = timer === null;
          return (
            <Link
              href={`/auction/${auction.id}`}
              key={auction.id}
              className="bg-white rounded-xl shadow-neonBlue hover:shadow-neonGreen transition p-4 cursor-pointer flex flex-col"
            >
              <img
                src={auction.product.image}
                alt={auction.product.title}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-primary mb-1 truncate">
                {auction.product.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2 truncate">
                {auction.product.description}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Vendor: <span className="font-semibold">{auction.vendor}</span>{" "}
                {auction.verified && (
                  <span className="text-blue-600 ml-1">🛡️ Verified</span>
                )}
              </p>
              <p className="text-sm mb-1">
                Starting Price:{" "}
                <span className="font-bold text-emerald-600">
                  {auction.startingPrice.toLocaleString()} CFA
                </span>
              </p>
              <p className="text-sm mb-2">
                Current Bid:{" "}
                <span className="font-bold text-yellow-600">
                  {auction.currentBid.toLocaleString()} CFA
                </span>
              </p>
              {ended ? (
                <p className="text-red-600 font-semibold">Auction Ended</p>
              ) : (
                timer && (
                  <p className="text-gray-700 font-mono text-sm">
                    Time Left:{" "}
                    {timer.days}d {timer.hours}h {timer.minutes}m {timer.seconds}s
                  </p>
                )
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}