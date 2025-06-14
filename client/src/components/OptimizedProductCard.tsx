import { memo, useState } from 'react';
import { Eye, MapPin, ShoppingBag, Star, Shield, MessageSquare, Phone } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import CommentsSection from './CommentsSection';
// Define Product interface locally to avoid import issues
interface Product {
  id: number;
  vendorId: number;
  title: string;
  category: string;
  price: string;
  description?: string;
  location?: string;
  status?: string;
  viewCount?: number;
  salesCount?: number;
  createdAt: string;
  imageUrls?: string[];
  image?: string;
  marketId?: string;
  marketLine?: string;
  verified?: boolean;
  trustCount?: number;
}

interface OptimizedProductCardProps {
  product: Product;
  onProductClick?: (id: number) => void;
  priority?: boolean;
}

function OptimizedProductCard({ product, onProductClick, priority = false }: OptimizedProductCardProps) {
  const [showComments, setShowComments] = useState(false);
  
  const handleClick = () => {
    onProductClick?.(product.id);
  };

  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseInt(price) : price;
    return numPrice.toLocaleString();
  };

  const getImageUrl = () => {
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0];
    }
    return undefined;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer optimized-grid-item mobile-optimized"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={getImageUrl()}
          alt={product.title}
          className="h-full w-full"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fallbackIcon={<ShoppingBag className="w-12 h-12 text-gray-400" />}
        />
        
        {/* Status badge */}
        {product.status === 'featured' && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded-md">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Category */}
        <p className="text-sm text-gray-600 mb-2 capitalize">
          {product.category}
        </p>

        {/* Price */}
        <div className="text-lg font-bold text-green-600 mb-3">
          {formatPrice(product.price)} XAF
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{product.location}</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{product.viewCount || 0}</span>
            </div>
            {product.salesCount && product.salesCount > 0 && (
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>{product.salesCount}</span>
              </div>
            )}
          </div>
          
          {/* Trust count */}
          <div className="flex items-center text-emerald font-semibold">
            <span className="mr-1">🛡️</span>{product.trustCount || Math.floor(Math.random() * 50) + 10}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a 
              href={`https://wa.me/237670000000`} 
              target="_blank" 
              className="text-green-600 hover:underline text-sm font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              WhatsApp
            </a>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowComments(true);
              }}
              className="text-blue-600 text-sm flex items-center gap-1 font-medium hover:text-blue-700"
            >
              <MessageSquare className="h-4 w-4" /> Comments
            </button>
            <button 
              className="text-gray-600 text-sm flex items-center gap-1 hover:text-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <Phone className="h-4 w-4" /> Call
            </button>
          </div>
          
          {/* Verification status */}
          {product.verified && (
            <div className="flex items-center">
              <span className="bg-emerald text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                <Shield size={12} />
                Verified
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Comments Modal */}
      <CommentsSection
        listingId={product.id.toString()}
        listingType="listing"
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </div>
  );
}

export default memo(OptimizedProductCard);