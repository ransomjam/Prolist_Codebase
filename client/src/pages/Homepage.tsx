import Card from '../components/Card';
import { markets } from '../data/demoData';

export default function Homepage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-primary mb-4">Welcome to ProList Bamenda</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {markets.map(market => (
          <Card
            key={market.id}
            title={market.name}
            description="Explore verified shops and vendors."
            image={market.image}
            neonColor="blue"
          />
        ))}
      </div>
    </div>
  );
}
