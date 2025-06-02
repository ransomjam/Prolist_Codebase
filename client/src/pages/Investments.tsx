import { investments } from '../data/demoData';
import InfoCard from '../components/InfoCard';

export default function Investments() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-primary">💼 Investment Opportunities</h2>
        <button 
          onClick={() => window.location.href = '/product-listing'}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          💼 Post Investment
        </button>
      </div>
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