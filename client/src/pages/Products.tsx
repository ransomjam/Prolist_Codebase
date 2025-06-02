import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MarketplaceProductCard from '../components/MarketplaceProductCard';
import { useLocation } from 'wouter';
import { Product } from '../../../shared/schema';

export default function Products() {
  const [category, setCategory] = useState("All");
  const [, setLocation] = useLocation();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  const filteredProducts = category === "All"
    ? products
    : products.filter((product) => product.category.toLowerCase() === category.toLowerCase());

  const handleViewProduct = (id: number) => {
    setLocation(`/product/${id}`);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold text-primary mb-4">Explore Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-md animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-primary mb-4">Explore Products</h2>

      <div className="flex gap-4 mb-4 overflow-x-auto">
        {["All", "Electronics", "Clothing", "Shoes", "Phones", "Accessories", "Services"].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap ${
              category === cat 
                ? 'bg-primary text-white shadow-neonBlue' 
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <MarketplaceProductCard 
              key={product.id} 
              product={{
                id: product.id,
                title: product.title,
                price: `${parseInt(product.price).toLocaleString()} XAF`,
                location: product.location || "Bamenda",
                imageUrl: "/api/placeholder/300/200",
                vendor: {
                  id: product.vendorId,
                  name: "Vendor",
                  verificationStatus: "basic_verified" as const,
                  rating: 4.5,
                  salesCount: 0,
                },
                viewCount: product.viewCount || 0,
                salesCount: 0,
                timeAgo: "1 day ago",
                category: product.category
              }}
              onViewProduct={handleViewProduct}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products available in this category yet.</p>
          <p className="text-gray-400 text-sm mt-2">Check back soon for new products!</p>
        </div>
      )}
    </div>
  );
}