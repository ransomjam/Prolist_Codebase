import { Shield, Eye, ShoppingCart, Star, MapPin, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import QuickShareButton from './QuickShareButton';

interface Product {
  id: number;
  title: string;
  price: string;
  location: string;
  imageUrl: string;
  vendor: {
    id: number;
    name: string;
    verificationStatus: 'none' | 'basic_verified' | 'premium_verified';
    rating: number;
    salesCount: number;
    lastChecked?: string;
  };
  viewCount: number;
  salesCount: number;
  timeAgo: string;
  category: string;
}

interface MarketplaceProductCardProps {
  product: Product;
  onViewProduct: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

export default function MarketplaceProductCard({ product, onViewProduct, onAddToCart }: MarketplaceProductCardProps) {
  const [imageError, setImageError] = useState(false);

  const getVerificationBadge = () => {
    switch (product.vendor.verificationStatus) {
      case 'premium_verified':
        return (
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <Shield size={12} />
            Premium Verified
          </div>
        );
      case 'basic_verified':
        return (
          <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            <Shield size={12} />
            Basic Verified
          </div>
        );
      default:
        return null;
    }
  };

  const getShopTypeBadge = () => {
    if (product.vendor.verificationStatus === 'premium_verified' && product.vendor.lastChecked) {
      return (
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
          Physical Shop
        </div>
      );
    }
    return (
      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
        Online Store
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img
          src={imageError ? '/api/placeholder/300/200' : product.imageUrl}
          alt={product.title}
          className="w-full h-48 object-cover"
          onError={() => setImageError(true)}
        />
        
        {/* Verification Badge Overlay */}
        <div className="absolute top-3 left-3">
          {getVerificationBadge()}
        </div>
        
        {/* View Count */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Eye size={12} />
          {product.viewCount}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <QuickShareButton 
            product={{
              id: product.id,
              title: product.title,
              price: product.price
            }}
            className="bg-white shadow-lg"
          />
          
          {onAddToCart && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product.id);
              }}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white p-2 rounded-full hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg"
            >
              <ShoppingCart size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
        
        {/* Price and Location */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-blue-600">{product.price}</div>
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <MapPin size={14} />
            {product.location}
          </div>
        </div>

        {/* Vendor Information */}
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">{product.vendor.name}</span>
            {getShopTypeBadge()}
          </div>
          
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-500" />
              {product.vendor.rating.toFixed(1)} ({product.vendor.salesCount} sales)
            </div>
            {product.vendor.lastChecked && (
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle size={14} />
                Checked {product.vendor.lastChecked}
              </div>
            )}
          </div>
        </div>

        {/* Stats and Time */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {product.timeAgo}
          </div>
          <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {product.category}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onViewProduct(product.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg"
        >
          View Details
        </button>
      </div>
    </div>
  );
}