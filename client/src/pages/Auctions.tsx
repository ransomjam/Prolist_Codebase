import { auctions } from '../data/demoData';
import AuctionCard from '../components/AuctionCard';

export default function Auctions() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">🔥 Auction Market (Deals Zone)</h2>
      <p className="text-sm text-gray-600 mb-6">Only Premium Users Can Post Deals. All Prices Are in CFA.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((item) => (
          <AuctionCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}