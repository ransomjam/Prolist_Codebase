import { Shield } from "lucide-react";

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
        <div className="flex items-center mt-3">
          {data.verified && (
            <span className="bg-emerald text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
              <Shield size={12} />
              Verified
            </span>
          )}
          <div className="ml-auto flex items-center text-primary font-semibold">
            <span className="mr-1">🛡️</span>{data.trustCount}
          </div>
        </div>
      </div>
    </div>
  );
}