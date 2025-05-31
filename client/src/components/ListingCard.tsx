import { Shield, MessageSquare, Phone } from "lucide-react";
import { useState } from "react";
import CommentsSection from "./CommentsSection";

interface ListingCardProps {
  listing: {
    id: number;
    title: string;
    category: string;
    price: string;
    location: string;
    image: string;
    verified: boolean;
    trustCount: number;
  };
}

export default function ListingCard({ listing }: ListingCardProps) {
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden shadow-neonBlue transition-transform hover:scale-105 cursor-pointer">
      <img src={listing.image} alt={listing.title} className="h-48 w-full object-cover"/>
      <div className="p-4">
        <h3 className="font-bold text-primary">{listing.title}</h3>
        <p className="text-sm text-gray-700">{listing.category}</p>
        <p className="font-bold text-primary mt-2">{listing.price}</p>
        <p className="text-xs text-gray-500">{listing.location}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2">
            <a href={`https://wa.me/237670000000`} target="_blank" className="text-green-600 hover:underline text-sm font-medium">
              WhatsApp
            </a>
            <button 
              onClick={() => setShowComments(true)}
              className="text-blue-600 text-sm flex items-center gap-1 font-medium hover:text-blue-700"
            >
              <MessageSquare className="h-4 w-4" /> Comments
            </button>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-700">
              <Phone className="h-4 w-4" /> Call
            </button>
          </div>
          <div className="flex items-center text-emerald font-semibold">
            <span className="mr-1">🛡️</span>{listing.trustCount}
          </div>
        </div>
        
        {listing.verified && (
          <div className="mt-2">
            <span className="bg-emerald text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
              <Shield size={12} />
              Verified
            </span>
          </div>
        )}
        </div>
      </div>
      
      <CommentsSection
        listingId={listing.id.toString()}
        listingType="listing"
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </>
  );
}