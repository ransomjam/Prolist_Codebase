import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

interface Auction {
  id: number;
  product: {
    title: string;
    description: string;
    image: string;
  };
  vendor: string;
  verified: boolean;
  startingPrice: number;
  currentBid: number;
  endTime: string;
  status?: string;
  highestBidder?: string;
}

interface AuctionPostProcessProps {
  auctions: Auction[];
  setAuctions: (auctions: Auction[]) => void;
  userSession?: {
    username: string;
    role?: string;
  };
  incrementVendorSales?: (vendorId: string) => void;
}

export default function AuctionPostProcess({ 
  auctions, 
  setAuctions, 
  userSession, 
  incrementVendorSales 
}: AuctionPostProcessProps) {
  const [, setLocation] = useLocation();
  const [closedAuctions, setClosedAuctions] = useState<Auction[]>([]);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winningAuction, setWinningAuction] = useState<Auction | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      
      auctions.forEach((auction) => {
        const end = new Date(auction.endTime).getTime();

        if (end <= now && auction.status !== 'Closed') {
          // Close auction
          const updatedAuctions = auctions.map(a =>
            a.id === auction.id 
              ? { 
                  ...a, 
                  status: 'Closed',
                  highestBidder: userSession?.username || 'anonymous_bidder'
                } 
              : a
          );
          setAuctions(updatedAuctions);
          setClosedAuctions((prev) => [...prev, auction]);

          // Check if current user is the winner
          if (userSession?.username === auction.highestBidder || 
              (!auction.highestBidder && userSession?.username)) {
            setWinningAuction(auction);
            setShowWinnerModal(true);
          }
          // Notify vendor
          else if (userSession?.username === auction.vendor) {
            alert(`Auction ended for ${auction.product.title}. Awaiting winner payment confirmation.`);
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [auctions, userSession, setAuctions]);

  const handleProceedToCheckout = () => {
    if (winningAuction) {
      setShowWinnerModal(false);
      setLocation(`/checkout/auction-${winningAuction.id}`);
    }
  };

  const handleCloseModal = () => {
    setShowWinnerModal(false);
    setWinningAuction(null);
  };

  return (
    <>
      {/* Winner Notification Modal */}
      {showWinnerModal && winningAuction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-neonGreen">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-600 mb-4">
                🎉 Congratulations!
              </h2>
              <img 
                src={winningAuction.product.image} 
                alt={winningAuction.product.title}
                className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                You won the auction!
              </h3>
              <p className="text-gray-600 mb-2">
                {winningAuction.product.title}
              </p>
              <p className="text-xl font-bold text-emerald-600 mb-4">
                Winning Bid: {winningAuction.currentBid.toLocaleString()} CFA
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Vendor: {winningAuction.vendor}
                {winningAuction.verified && <span className="text-blue-600 ml-1">🛡️</span>}
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleProceedToCheckout}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-2 px-4 rounded-lg hover:scale-105 transition font-semibold"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Admin Closed Auctions Panel (for admin users) */}
      {userSession?.role === 'admin' && closedAuctions.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-40 border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-800 mb-2">
            Admin: Closed Auctions ({closedAuctions.length})
          </h4>
          <div className="max-h-32 overflow-y-auto">
            {closedAuctions.slice(-3).map((auction) => (
              <div key={auction.id} className="text-xs text-gray-600 mb-1">
                {auction.product.title} - {auction.currentBid.toLocaleString()} CFA
              </div>
            ))}
          </div>
          <button
            onClick={() => setLocation('/admin-escrow')}
            className="w-full mt-2 bg-blue-600 text-white text-xs py-1 px-2 rounded hover:bg-blue-700 transition"
          >
            Manage Fund Releases
          </button>
        </div>
      )}
    </>
  );
}