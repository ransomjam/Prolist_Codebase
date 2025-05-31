import { useState } from 'react';
import { HomeIcon, BuildingStorefrontIcon, TagIcon, HomeModernIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const links = [
    { icon: HomeIcon, label: 'Home' },
    { icon: TagIcon, label: 'Listings' },
    { icon: BuildingStorefrontIcon, label: 'Markets' },
    { icon: HomeModernIcon, label: 'Real Estate' },
    { icon: CurrencyDollarIcon, label: 'Auctions' },
  ];

  return (
    <nav
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className="bg-primary h-screen text-white flex flex-col items-center p-3 shadow-md"
    >
      {links.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-2 hover:bg-neonBlue p-2 rounded-lg cursor-pointer w-full transition-colors">
          <Icon className="h-6 w-6" />
          {expanded && <span className="text-sm font-semibold">{label}</span>}
        </div>
      ))}
    </nav>
  );
}
