import { useState } from 'react';
import { DollarSign, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BidButtonProps {
  productId: number;
  currentPrice: number;
  onBidSubmit?: (productId: number, bidAmount: number) => void;
}

export default function BidButton({ productId, currentPrice, onBidSubmit }: BidButtonProps) {
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const amount = parseFloat(bidAmount);
    if (amount && amount > 0) {
      setIsSubmitting(true);
      try {
        // Get current user ID (for demo purposes, using 1)
        // In production, this would come from authentication context
        const buyerId = 1;
        
        const response = await fetch('/api/bids', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            buyerId,
            amount: amount.toString(),
            message: `Bid offer for ${amount.toLocaleString()} XAF`
          }),
        });

        if (response.ok) {
          const bid = await response.json();
          console.log('Bid submitted successfully:', bid);
          setShowBidForm(false);
          setBidAmount('');
          
          toast({
            title: "Bid successful submitted",
            description: `Your bid of ${amount.toLocaleString()} XAF has been submitted! The vendor will be notified and you'll receive a notification when they respond.`,
            variant: "default",
          });
          
          if (onBidSubmit) {
            onBidSubmit(productId, amount);
          }
        } else {
          const error = await response.json();
          console.error('Failed to submit bid:', error);
          toast({
            title: "Failed to submit bid",
            description: "Please try again.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error submitting bid:', error);
        toast({
          title: "Error submitting bid",
          description: "Please check your connection and try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
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
              disabled={isSubmitting}
              className="flex-1 bg-green-500 text-white px-2 py-1 text-xs rounded hover:bg-green-600 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-1"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                'Submit Bid'
              )}
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