import { Shield, MessageSquare, Phone } from "lucide-react";

interface AuctionCardProps {
  item: {
    id: number;
    title: string;
    originalPrice: string;
    discountPrice: string;
    location: string;
    timeLeft: string;
    image: string;
    verified: boolean;
    trustCount: number;
    premium: boolean;
  };
}

export default function AuctionCard({ item }: AuctionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-neonYellow hover:shadow-neonBlue hover:scale-105 transition-transform overflow-hidden cursor-pointer">
      <img src={item.image} alt={item.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-primary">{item.title}</h3>
        <p className="text-gray-600 text-sm">{item.location}</p>

        <div className="flex items-center gap-2 mt-2">
          <span className="line-through text-sm text-gray-400">{item.originalPrice}</span>
          <span className="text-lg text-emerald font-bold">{item.discountPrice}</span>
        </div>

        <div className="flex items-center justify-between mt-2 text-xs text-yellow-600">
          <span className="bg-yellow-100 px-2 py-1 rounded-full">🔥 {item.timeLeft} left</span>
          {item.premium && <span className="bg-emerald text-white px-2 py-1 rounded-full">Premium Only</span>}
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2">
            <a href={`https://wa.me/237670000000`} target="_blank" className="text-green-600 hover:underline text-sm font-medium">
              WhatsApp
            </a>
            <button className="text-blue-600 text-sm flex items-center gap-1 font-medium hover:text-blue-700">
              <MessageSquare className="h-4 w-4" /> Comments
            </button>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-700">
              <Phone className="h-4 w-4" /> Call
            </button>
          </div>
          <div className="flex items-center text-primary font-semibold">
            <span className="mr-1">🛡️</span>{item.trustCount}
          </div>
        </div>
        
        {item.verified && (
          <div className="mt-2">
            <span className="bg-emerald text-white px-2 py-1 rounded-full text-xs flex items-center gap-1 w-fit">
              <Shield size={12} />
              Verified
            </span>
          </div>
        )}
      </div>
    </div>
  );
}