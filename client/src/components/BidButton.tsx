import { useState } from 'react';
import { DollarSign } from 'lucide-react';

interface BidButtonProps {
  productId: number;
  currentPrice: number;
  onBidSubmit?: (productId: number, bidAmount: number) => void;
}

export default function BidButton({ productId, currentPrice, onBidSubmit }: BidButtonProps) {
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const amount = parseFloat(bidAmount);
    if (amount && amount > 0) {
      if (onBidSubmit) {
        onBidSubmit(productId, amount);
      }
      console.log(`Bid submitted for product ${productId}: ${amount} XAF`);
      setShowBidForm(false);
      setBidAmount('');
      alert(`Your bid of ${amount.toLocaleString()} XAF has been submitted!`);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBidForm(!showBidForm);
  };

  if (showBidForm) {
    return (
      <div className="relative">
        <form onSubmit={handleSubmitBid} className="bg-white border border-gray-300 rounded-md p-3 shadow-lg absolute bottom-8 right-0 z-10 min-w-48">
          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Your Bid (XAF)
            </label>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Min: ${currentPrice.toLocaleString()}`}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              min={currentPrice}
              required
              autoFocus
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600 transition-colors"
            >
              Submit Bid
            </button>
            <button
              type="button"
              onClick={handleClick}
              className="px-2 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button 
      className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors"
      onClick={handleClick}
    >
      <DollarSign className="w-3 h-3" />
      Bid
    </button>
  );
}