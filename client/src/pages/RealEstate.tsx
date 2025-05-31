import { realEstate } from '../data/demoData';
import RealEstateCard from '../components/RealEstateCard';

export default function RealEstate() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">Available Properties in Bamenda</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {realEstate.map((property) => (
          <RealEstateCard key={property.id} data={property} />
        ))}
      </div>
    </div>
  );
}