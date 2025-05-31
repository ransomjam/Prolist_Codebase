import { Shield } from "lucide-react";

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
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-neonBlue transition-transform hover:scale-105 cursor-pointer">
      <img src={listing.image} alt={listing.title} className="h-48 w-full object-cover"/>
      <div className="p-4">
        <h3 className="font-bold text-primary">{listing.title}</h3>
        <p className="text-sm text-gray-700">{listing.category}</p>
        <p className="font-bold text-primary mt-2">{listing.price}</p>
        <p className="text-xs text-gray-500">{listing.location}</p>
        <div className="flex items-center mt-2">
          {listing.verified && (
            <span className="bg-emerald text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Shield size={12} />
              Verified
            </span>
          )}
          <div className="ml-auto flex items-center text-emerald font-semibold">
            <span className="mr-1">🛡️</span>{listing.trustCount}
          </div>
        </div>
      </div>
    </div>
  );
}