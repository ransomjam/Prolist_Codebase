import { useRoute } from 'wouter';
import { markets } from '../data/demoData';
import Card from '../components/Card';
import { useState } from 'react';

export default function MarketDetails() {
  const [, params] = useRoute('/markets/:id');
  const market = markets.find(mkt => mkt.id === parseInt(params?.id || '0'));
  const [tab, setTab] = useState('shops');

  if (!market) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-primary mb-4">Market Not Found</h2>
        <p className="text-gray-600">The market you're looking for doesn't exist.</p>
      </div>
    );
  }

  const items = market[tab as keyof typeof market] as any[];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">{market.name}</h2>

      <div className="flex gap-4 mb-4">
        {['shops', 'importers', 'vendors'].map(category => (
          <button
            key={category}
            onClick={() => setTab(category)}
            className={`px-4 py-2 rounded-lg font-semibold capitalize ${tab === category ? 'bg-primary text-white shadow-neonBlue' : 'bg-gray-200 text-gray-600'}`}
          >
            {category}
          </button>
        ))}
      </div>

      {items && items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <Card
              key={item.id}
              title={item.name}
              description={`Category: ${item.category}`}
              image="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
              neonColor={item.verified ? 'green' : 'blue'}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No listings available in this category yet.</p>
      )}
    </div>
  );
}