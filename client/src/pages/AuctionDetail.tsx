import { useRoute } from 'wouter';
import { useState, useEffect } from 'react';
import { auctions } from '../data/demoData';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function AuctionDetail() {
  const [match, params] = useRoute('/auction/:id');
  const auction = auctions.find(a => a.id === parseInt(params?.id || '0'));

  const [countdown, setCountdown] = useState<Countdown>({} as Countdown);
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [currentBid, setCurrentBid] = useState(auction?.currentBid || 0);
  const [bidHistory, setBidHistory] = useState([
    { bidder: "User123", amount: auction?.currentBid || 0, time: "2 minutes ago" },
    { bidder: "BidMaster", amount: (auction?.currentBid || 0) - 500, time: "5 minutes ago" },
    { bidder: "QuickBid", amount: (auction?.currentBid || 0) - 1000, time: "8 minutes ago" }
  ]);
  const [isPlacingBid, setIsPlacingBid] = useState(false);

  useEffect(() => {
    if (!auction) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(auction.endTime).getTime();
      const diff = end - now;

      if (diff <= 0) {
        clearInterval(interval);
        setAuctionEnded(true);
      } else {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auction]);

  if (!auction) {
    return <p className="p-6 text-red-600">Auction not found.</p>;
  }

  const handleBidSubmit = async () => {
    const bidValue = parseInt(bidAmount);
    if (isNaN(bidValue)) {
      setError('Please enter a valid number.');
      return;
    }
    if (bidValue <= currentBid) {
      setError(`Your bid must be higher than the current highest bid (${currentBid.toLocaleString()} CFA).`);
      return;
    }
    if (auctionEnded) {
      setError('Auction has ended. You cannot place bids anymore.');
      return;
    }
    
    setIsPlacingBid(true);
    setError('');
    
    try {
      // Simulate placing bid with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update current bid and add to history
      setCurrentBid(bidValue);
      const newBid = {
        bidder: "You",
        amount: bidValue,
        time: "Just now"
      };
      setBidHistory(prev => [newBid, ...prev.slice(0, 4)]);
      setBidAmount('');
      
      // Show success notification
      setError('');
    } catch (err) {
      setError('Failed to place bid. Please try again.');
    } finally {
      setIsPlacingBid(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-neonBlue mt-10">
      <h2 className="text-3xl font-bold text-primary mb-4">{auction.product.title}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <img 
          src={auction.product.image} 
          alt={auction.product.title} 
          className="w-full h-64 object-cover rounded-lg shadow-lg" 
        />
        
        <div className="space-y-4">
          <p className="text-lg text-emerald-600 font-bold">
            Starting Price: {auction.startingPrice.toLocaleString()} CFA
          </p>
          <p className="text-lg text-yellow-600 font-bold">
            Current Highest Bid: {currentBid.toLocaleString()} CFA
          </p>

          {!auctionEnded ? (
            <>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-800 mb-2">
                  Time Left: {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                </p>
                <div className="flex gap-2 items-center mb-2">
                  <input
                    type="number"
                    placeholder="Enter your bid (CFA)"
                    className="border border-gray-300 p-2 rounded flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    min={auction.currentBid + 1}
                  />
                  <button
                    onClick={handleBidSubmit}
                    disabled={isPlacingBid}
                    className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-4 py-2 rounded-xl shadow-neonGreen hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPlacingBid ? 'Placing...' : 'Place Bid'}
                  </button>
                </div>
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </div>
            </>
          ) : (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600 font-bold">
                Auction Ended
              </p>
              <p className="text-gray-600">
                Winning bid: {auction.currentBid.toLocaleString()} CFA
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bid History */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Recent Bids</h3>
        <div className="space-y-2">
          {bidHistory.map((bid, index) => (
            <div key={index} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {bid.bidder.charAt(0)}
                </div>
                <span className="font-medium text-gray-800">{bid.bidder}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">{bid.amount.toLocaleString()} CFA</div>
                <div className="text-xs text-gray-500">{bid.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Product Description</h3>
        <p className="text-gray-700">{auction.product.description}</p>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">
              Vendor: <strong className="text-gray-800">{auction.vendor}</strong>
              {auction.verified && (
                <span className="text-blue-600 ml-2">🛡️ Verified</span>
              )}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Auction #{auction.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}