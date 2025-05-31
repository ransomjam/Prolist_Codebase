import { stocks } from '../data/demoData';
import InfoCard from '../components/InfoCard';

export default function Stocks() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">📈 Stocks & Shares</h2>
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