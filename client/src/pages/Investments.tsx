import { investments } from '../data/demoData';
import InfoCard from '../components/InfoCard';

export default function Investments() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">💼 Investment Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investments.map((inv) => (
          <InfoCard
            key={inv.id}
            title={inv.name}
            subtitle={`${inv.industry} • ${inv.status}`}
            extra={`Need: ${inv.fundingNeed}`}
            owner={inv.owner}
            verified={inv.verified}
          />
        ))}
      </div>
    </div>
  );
}