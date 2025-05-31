import { markets } from '../data/demoData';
import MarketCard from '../components/MarketCard';

export default function Markets() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">Markets in Bamenda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map(market => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </div>
  );
}
