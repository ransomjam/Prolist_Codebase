import { useRoute } from 'wouter';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function AuctionDetail() {
  const [match, params] = useRoute('/auction/:id');
  const auctionId = parseInt(params?.id || '0');
  
  // Fetch auction from API
  const { data: auction, isLoading, error } = useQuery({
    queryKey: ['/api/auctions', auctionId],
    queryFn: async () => {
      const response = await fetch(`/api/auctions/${auctionId}`);
      if (!response.ok) {
        // If individual auction endpoint doesn't exist, fetch all and find the one
        const allResponse = await fetch('/api/auctions');
        if (!allResponse.ok) throw new Error('Failed to fetch auctions');
        const allAuctions = await allResponse.json();
        return allAuctions.find((a: any) => a.id === auctionId);
      }
      return response.json();
    },
    enabled: !!auctionId
  });

  const [countdown, setCountdown] = useState<Countdown>({} as Countdown);
  const [bidAmount, setBidAmount] = useState('');
  const [errorState, setErrorState] = useState('');
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidHistory, setBidHistory] = useState([
    { bidder: "User123", amount: 0, time: "2 minutes ago" },
    { bidder: "BidMaster", amount: 0, time: "5 minutes ago" },
    { bidder: "QuickBid", amount: 0, time: "8 minutes ago" }
  ]);
  const [isPlacingBid, setIsPlacingBid] = useState(false);

  // Initialize current bid and bid history when auction data loads
  useEffect(() => {
    if (auction) {
      const startingPrice = parseFloat(auction.startingPrice) || 0;
      const currentBidAmount = parseFloat(auction.currentBid) || startingPrice;
      setCurrentBid(currentBidAmount);
      setBidHistory([
        { bidder: "User123", amount: currentBidAmount, time: "2 minutes ago" },
        { bidder: "BidMaster", amount: Math.max(currentBidAmount - 500, startingPrice), time: "5 minutes ago" },
        { bidder: "QuickBid", amount: Math.max(currentBidAmount - 1000, startingPrice), time: "8 minutes ago" }
      ]);
    }
  }, [auction]);

  useEffect(() => {
    if (!auction) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(auction.endDate).getTime();
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

  if (!auction || !auction.startingPrice) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-gray-400">!</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Auction not found</h3>
          <p className="text-gray-500">The auction you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const handleBidSubmit = async () => {
    const bidValue = parseInt(bidAmount);
    if (isNaN(bidValue)) {
      setErrorState('Please enter a valid number.');
      return;
    }
    if (bidValue <= currentBid) {
      setErrorState(`Your bid must be higher than the current highest bid (${currentBid.toLocaleString()} CFA).`);
      return;
    }
    if (auctionEnded) {
      setErrorState('Auction has ended. You cannot place bids anymore.');
      return;
    }
    
    setIsPlacingBid(true);
    setErrorState('');
    
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
      setErrorState('');
    } catch (err) {
      setErrorState('Failed to place bid. Please try again.');
    } finally {
      setIsPlacingBid(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight mb-2">
                {auction.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Auction #{auction.id}</span>
                <span>•</span>
                <span>Vendor ID: <span className="font-medium text-gray-700">{auction.vendorId}</span></span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Auction Item
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Auction Image and Description */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src={auction.images && auction.images[0] ? auction.images[0] : '/api/placeholder/400/320'} 
                alt={auction.title} 
                className="w-full h-80 object-cover" 
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">{auction.description}</p>
              </div>
            </div>

            {/* Bid History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Bids</h3>
              <div className="space-y-3">
                {bidHistory.map((bid, index) => (
                  <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {bid.bidder.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{bid.bidder}</div>
                        <div className="text-sm text-gray-500">{bid.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{bid.amount.toLocaleString()} CFA</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Bidding Panel */}
          <div className="space-y-6">
            {/* Pricing Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-4">
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Starting Price</div>
                  <div className="text-xl font-bold text-emerald-600">
                    {(parseFloat(auction.startingPrice) || 0).toLocaleString()} CFA
                  </div>
                </div>
                
                <div className="text-center pb-4 border-b border-gray-200">
                  <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Current Highest Bid</div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {currentBid.toLocaleString()} CFA
                  </div>
                </div>

                {!auctionEnded && (
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-red-600 font-medium mb-2">Time Remaining</div>
                    <div className="text-xl font-mono font-bold text-red-700">
                      {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
                    </div>
                  </div>
                )}

                {auctionEnded && (
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="text-gray-600 font-semibold mb-1">Auction Ended</div>
                    <div className="text-sm text-gray-500">
                      Winning bid: {auction.currentBid.toLocaleString()} CFA
                    </div>
                  </div>
                )}

                {!auctionEnded && (
                  <div className="space-y-3 pt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Your Bid Amount</label>
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder={`Min: ${(currentBid + 100).toLocaleString()}`}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min={currentBid + 1}
                        />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Minimum bid: {(currentBid + 100).toLocaleString()} CFA</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleBidSubmit}
                      disabled={isPlacingBid}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed"
                    >
                      {isPlacingBid ? 'Placing Bid...' : 'Place Bid'}
                    </button>
                    {errorState && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                        {errorState}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  V
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">Vendor #{auction.vendorId}</div>
                  <div className="text-sm text-blue-600 font-medium">Auction Seller</div>
                </div>
              </div>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                View Seller Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}