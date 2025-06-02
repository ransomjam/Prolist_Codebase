import { useQuery } from '@tanstack/react-query';
import { TrendingUp, DollarSign, Package, Star } from 'lucide-react';

interface VendorSalesStatsProps {
  vendorId: number;
  className?: string;
  compact?: boolean;
}

interface SalesData {
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
  completedOrders: number;
}

export default function VendorSalesStats({ vendorId, className = "", compact = false }: VendorSalesStatsProps) {
  const { data: salesData, isLoading } = useQuery({
    queryKey: ['/api/vendor/stats', vendorId],
    queryFn: async () => {
      const response = await fetch(`/api/vendor/stats/${vendorId}`);
      if (!response.ok) {
        return {
          totalSales: 0,
          totalRevenue: 0,
          averageRating: 0,
          completedOrders: 0
        };
      }
      return response.json();
    }
  });

  const stats = salesData || {
    totalSales: 0,
    totalRevenue: 0,
    averageRating: 0,
    completedOrders: 0
  };

  if (isLoading) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 animate-pulse ${className}`}>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-lg p-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-blue-600" size={16} />
            <span className="text-sm font-medium text-gray-700">Sales</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600">
              {stats.totalRevenue.toLocaleString()} XAF
            </div>
            <div className="text-xs text-gray-500">
              {stats.totalSales} orders
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="text-blue-600" size={20} />
        <h4 className="font-semibold text-gray-900">Sales Performance</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <DollarSign className="text-green-600" size={16} />
            <span className="text-sm font-medium text-gray-700">Revenue</span>
          </div>
          <div className="text-xl font-bold text-green-600">
            {stats.totalRevenue.toLocaleString()} XAF
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Package className="text-blue-600" size={16} />
            <span className="text-sm font-medium text-gray-700">Orders</span>
          </div>
          <div className="text-xl font-bold text-blue-600">
            {stats.totalSales}
          </div>
        </div>
      </div>

      {stats.averageRating > 0 && (
        <div className="mt-3 pt-3 border-t border-blue-200">
          <div className="flex items-center justify-center gap-2">
            <Star className="text-yellow-500 fill-current" size={16} />
            <span className="text-sm font-medium text-gray-700">
              {stats.averageRating.toFixed(1)} rating
            </span>
            <span className="text-xs text-gray-500">
              ({stats.completedOrders} reviews)
            </span>
          </div>
        </div>
      )}

      {/* Progress bar for sales */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Sales Progress</span>
          <span>{Math.min(stats.totalSales, 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min((stats.totalSales / 100) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}