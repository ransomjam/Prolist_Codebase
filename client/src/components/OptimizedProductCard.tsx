import { memo } from 'react';
import { Eye, MapPin, ShoppingBag, Star, Shield, MessageCircle, ExternalLink } from 'lucide-react';
import SimpleImageDisplay from './SimpleImageDisplay';
// Define Product interface locally to avoid import issues
interface Product {
  id: number;
  vendorId: number;
  title: string;
  category: string;
  price: string;
  description: string;
  location?: string;
  status?: string;
  viewCount?: number;
  salesCount?: number;
  createdAt: string;
  imageUrls?: string[];
  image?: string;
  marketId?: string;
  marketLine?: string;
}

interface OptimizedProductCardProps {
  product: Product;
  onProductClick?: (id: number) => void;
  priority?: boolean;
}

function OptimizedProductCard({ product, onProductClick, priority = false }: OptimizedProductCardProps) {
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
    if (product.image) {
      return product.image;
    }
    return undefined;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer will-change-transform"
      onClick={handleClick}
      style={{ contentVisibility: 'auto' }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <SimpleImageDisplay
          src={getImageUrl()}
          alt={product.title}
          className="h-full w-full"
          fallbackIcon={<ShoppingBag className="w-12 h-12 text-gray-400" />}
        />
        
        {/* Verification status - Top Left */}
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs font-medium rounded-md flex items-center gap-1">
          <Shield className="w-3 h-3" />
          Verified
        </div>
        
        {/* Category - Top Right */}
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 text-xs font-medium rounded-md">
          {product.category || 'General'}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.title}
        </h3>

        {/* Price */}
        <div className="text-lg font-bold text-green-600 mb-3">
          {formatPrice(product.price)} XAF
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
          <span className="truncate">{product.location}</span>
        </div>

        {/* Trust score row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-sm text-gray-600">
            <Shield className="w-4 h-4 mr-1 text-blue-500" />
            Trusted by: 20
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Eye className="w-4 h-4 mr-1" />
            {product.viewCount || 0} views
          </div>
        </div>

        {/* Action buttons row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            <span className="text-sm text-gray-500">4.5 (23)</span>
          </div>
          <div className="flex gap-2">
            <button 
              className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle view details
              }}
            >
              <ExternalLink className="w-3 h-3" />
              View Details
            </button>
            <button 
              className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white text-xs rounded-md hover:bg-gray-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // Handle public comments
              }}
            >
              <MessageCircle className="w-3 h-3" />
              Comments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OptimizedProductCard);