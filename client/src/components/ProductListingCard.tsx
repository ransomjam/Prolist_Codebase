import { useState } from 'react';
import { MapPin, Shield, MessageSquare, Phone, Eye, Star } from 'lucide-react';
import CommentsSection from './CommentsSection';

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

interface ProductListingCardProps {
  product: Product;
  onProductClick?: (id: number) => void;
}

export default function ProductListingCard({ product, onProductClick }: ProductListingCardProps) {
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
    return product.image || '/placeholder-image.jpg';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer">
        {/* Product Image */}
        <div className="relative">
          <img 
            src={getImageUrl()} 
            alt={product.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-image.jpg';
            }}
          />
          {product.status === 'featured' && (
            <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <div className="text-sm text-gray-600 mb-2 capitalize">
            {product.category}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">
            {product.title}
          </h3>

          {/* Price */}
          <div className="text-lg font-bold text-green-600 mb-3">
            {formatPrice(product.price)} XAF
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{product.location || 'Location not specified'}</span>
          </div>

          {/* Stats and Trust */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{product.viewCount || 0}</span>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500" />
                <span>5.0</span>
              </div>
            </div>
            
            {/* Trust count */}
            <div className="flex items-center text-emerald-600 font-semibold">
              <span className="mr-1">🛡️</span>{product.trustCount || Math.floor(Math.random() * 50) + 10}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between mb-3">
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
                <span className="bg-emerald-600 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Shield size={12} />
                  Verified
                </span>
              </div>
            )}
          </div>

          {/* View Details Button */}
          <button
            onClick={handleClick}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Comments Modal */}
      <CommentsSection
        listingId={product.id.toString()}
        listingType="listing"
        isOpen={showComments}
        onClose={() => setShowComments(false)}
      />
    </>
  );
}