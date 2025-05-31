import { ReactNode } from "react";
import { Shield, Star } from "lucide-react";

interface CardProps {
  title: string;
  description: string;
  image?: string;
  neonColor?: 'blue' | 'green';
  verified?: boolean;
  rating?: number;
  reviews?: number;
  badge?: string;
  badgeColor?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function Card({ 
  title, 
  description, 
  image, 
  neonColor = 'blue',
  verified = false,
  rating,
  reviews,
  badge,
  badgeColor = 'bg-emerald',
  children,
  onClick 
}: CardProps) {
  const shadowClass = neonColor === 'blue' ? 'shadow-neonBlue' : 'shadow-neonGreen';
  const hoverShadowClass = neonColor === 'blue' ? 'hover:shadow-neonBlue' : 'hover:shadow-neonGreen';

  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden ${shadowClass} ${hoverShadowClass} transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100`}
      onClick={onClick}
    >
      {image && (
        <img src={image} alt={title} className="h-48 w-full object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-primary font-bold text-lg">{title}</h3>
          {verified && (
            <Shield className="text-neonBlue" size={16} />
          )}
          {badge && (
            <span className={`${badgeColor} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-3">{description}</p>
        
        {rating && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <Star className="text-neonYellow fill-current" size={16} />
              <span className="text-sm font-semibold">{rating}</span>
              {reviews && (
                <span className="text-gray-500 text-xs">({reviews} reviews)</span>
              )}
            </div>
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}
