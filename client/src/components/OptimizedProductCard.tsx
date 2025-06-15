import { memo } from 'react';
import { Eye, MapPin, ShoppingBag, Star, Shield } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
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
        <div className="flex items-center justify-between text-sm text-gray-500">
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
          
          {/* Verification status */}
          <div className="flex items-center">
            <Shield className="w-4 h-4 text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OptimizedProductCard);