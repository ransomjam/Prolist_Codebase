import { verifiedBusinesses } from '../data/demoData';
import InfoCard from '../components/InfoCard';

export default function VerifiedDirectory() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">✅ Verified Businesses</h2>
      <p className="mb-4 text-gray-600">All businesses listed below are officially verified on ProList.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedBusinesses.map((biz) => (
          <InfoCard
            key={biz.id}
            title={biz.name}
            subtitle={`${biz.type} – ${biz.location}`}
            owner={biz.owner}
            verified={biz.verified}
            extra={`Trust Count: ${biz.trustCount}`}
          />
        ))}
      </div>
    </div>
  );
}