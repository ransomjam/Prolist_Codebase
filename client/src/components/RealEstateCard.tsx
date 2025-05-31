import { Shield, MessageCircle, Phone } from "lucide-react";

interface RealEstateCardProps {
  data: {
    id: number;
    title: string;
    price: string;
    location: string;
    image: string;
    verified: boolean;
    trustCount: number;
  };
}

export default function RealEstateCard({ data }: RealEstateCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-neonGreen hover:shadow-neonBlue transition-transform hover:scale-105 cursor-pointer">
      <img src={data.image} alt={data.title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-primary">{data.title}</h3>
        <p className="text-sm text-gray-700 mt-1">{data.location}</p>
        <p className="font-bold text-emerald mt-2">{data.price}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-2">
            <a href={`https://wa.me/237670000000`} target="_blank" className="text-green-600 hover:underline text-sm font-medium">
              WhatsApp
            </a>
            <button className="text-blue-600 text-sm flex items-center gap-1 font-medium hover:text-blue-700">
              <MessageCircle className="h-4 w-4" /> Chat
            </button>
            <button className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-700">
              <Phone className="h-4 w-4" /> Call
            </button>
          </div>
          <div className="flex items-center text-primary font-semibold">
            <span className="mr-1">🛡️</span>{data.trustCount}
          </div>
        </div>
        
        {data.verified && (
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