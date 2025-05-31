import { Link } from 'wouter';

interface MarketCardProps {
  market: {
    id: number;
    name: string;
    image: string;
  };
}

export default function MarketCard({ market }: MarketCardProps) {
  return (
    <Link href={`/markets/${market.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-neonGreen hover:shadow-neonBlue transition-shadow cursor-pointer">
        <img src={market.image} alt={market.name} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h3 className="font-bold text-primary">{market.name}</h3>
        </div>
      </div>
    </Link>
  );
}