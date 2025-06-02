import { stocks } from '../data/demoData';
import InfoCard from '../components/InfoCard';

export default function Stocks() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-primary">📈 Stocks & Shares</h2>
        <button 
          onClick={() => window.location.href = '/product-listing'}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          📈 List Shares
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.map((s) => (
          <InfoCard
            key={s.id}
            title={s.company}
            subtitle={`Shares: ${s.shares} @ ${s.pricePerShare}`}
            extra={s.location}
            verified={s.verified}
          />
        ))}
      </div>
    </div>
  );
}