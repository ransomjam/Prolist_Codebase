import { Link } from 'wouter';
import { useState } from 'react';

interface MarketCardProps {
  market: {
    id: number;
    name: string;
    image: string;
  };
}

export default function MarketCard({ market }: MarketCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleExploreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative">
      <Link href={`/markets/${market.id}`}>
        <div className="bg-white rounded-xl overflow-hidden shadow-neonGreen hover:shadow-neonBlue transition-shadow cursor-pointer">
          <img src={market.image} alt={market.name} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h3 className="font-bold text-primary mb-3">{market.name}</h3>
            <button 
              onClick={handleExploreClick}
              className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Explore Market
            </button>
          </div>
        </div>
      </Link>

      {showMenu && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border z-50">
          <div className="grid grid-cols-2 gap-2 p-4">
            <a href="/listings" className="p-3 rounded-lg border border-gradient-to-r from-blue-200 to-emerald-200 hover:from-blue-300 hover:to-emerald-300 transition-all text-center">
              <div className="text-sm font-medium">📋 Listings</div>
            </a>
            <a href="/markets" className="p-3 rounded-lg border border-gradient-to-r from-blue-200 to-emerald-200 hover:from-blue-300 hover:to-emerald-300 transition-all text-center">
              <div className="text-sm font-medium">🏪 Markets</div>
            </a>
            <a href="/realestate" className="p-3 rounded-lg border border-gradient-to-r from-blue-200 to-emerald-200 hover:from-blue-300 hover:to-emerald-300 transition-all text-center">
              <div className="text-sm font-medium">🏠 Real Estate</div>
            </a>
            <a href="/auctions" className="p-3 rounded-lg border border-gradient-to-r from-blue-200 to-emerald-200 hover:from-blue-300 hover:to-emerald-300 transition-all text-center">
              <div className="text-sm font-medium">🔥 Auctions</div>
            </a>
            <a href="/investments" className="p-3 rounded-lg border border-gradient-to-r from-blue-200 to-emerald-200 hover:from-blue-300 hover:to-emerald-300 transition-all text-center">
              <div className="text-sm font-medium">💼 Investments</div>
            </a>
            <a href="/stocks" className="p-3 rounded-lg border border-gradient-to-r from-blue-200 to-emerald-200 hover:from-blue-300 hover:to-emerald-300 transition-all text-center">
              <div className="text-sm font-medium">📈 Stocks</div>
            </a>
            <a href="/verified" className="p-3 rounded-lg border border-gradient-to-r from-blue-200 to-emerald-200 hover:from-blue-300 hover:to-emerald-300 transition-all text-center col-span-2">
              <div className="text-sm font-medium">✅ Verified Directory</div>
            </a>
          </div>
        </div>
      )}

      {showMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}