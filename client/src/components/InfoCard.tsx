interface InfoCardProps {
  title: string;
  subtitle: string;
  extra?: string;
  verified?: boolean;
  owner?: string;
}

export default function InfoCard({ title, subtitle, extra, verified, owner }: InfoCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-neonBlue hover:shadow-neonGreen transition hover:scale-105">
      <h3 className="text-xl font-bold text-primary">{title}</h3>
      <p className="text-sm text-gray-600">{subtitle}</p>
      {extra && <p className="text-sm text-emerald mt-1">{extra}</p>}
      {owner && <p className="text-sm text-gray-500">👤 {owner}</p>}
      {verified && <p className="text-xs text-white bg-emerald inline-block mt-2 px-2 py-1 rounded-full">✔ Verified</p>}
    </div>
  );
}