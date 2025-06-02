import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { 
  DollarSign, 
  CheckCircle, 
  Package, 
  User, 
  ArrowLeft,
  AlertCircle,
  Clock,
  Shield
} from 'lucide-react';

interface Order {
  id: number;
  productId: number;
  vendorId: number;
  buyerId: number;
  quantity: number;
  totalAmount: string;
  deliveryMethod: string;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  buyerConfirmed: boolean;
  deliveryProofUrl: string;
  createdAt: string;
  confirmedAt: string;
}

interface Product {
  id: number;
  title: string;
  price: string;
  location: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

export default function AdminEscrowPanel() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Fetch vendor orders to find those ready for escrow release
  const { data: allOrders = [], isLoading, error } = useQuery({
    queryKey: ['/api/orders/vendor/1'],
    queryFn: async () => {
      const response = await fetch('/api/orders/vendor/1');
      if (!response.ok) {
        if (response.status === 404) return [];
        throw new Error('Failed to fetch orders');
      }
      return response.json();
    }
  });

  // Filter orders ready for escrow release
  const readyForRelease = allOrders.filter((order: Order) => 
    order.buyerConfirmed && 
    order.deliveryStatus === 'confirmed' && 
    order.paymentStatus !== 'released'
  );

  // Fetch product details for ready orders
  const { data: products = {} } = useQuery({
    queryKey: ['/api/products/batch', readyForRelease.map((o: Order) => o.productId)],
    queryFn: async () => {
      const productIds = readyForRelease.map((o: Order) => o.productId);
      const productPromises = productIds.map(async (id: number) => {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const product = await response.json();
          return [id, product];
        }
        return [id, null];
      });
      const results = await Promise.all(productPromises);
      return Object.fromEntries(results);
    },
    enabled: readyForRelease.length > 0
  });

  // Fetch user details for buyers
  const { data: users = {} } = useQuery({
    queryKey: ['/api/users/batch', readyForRelease.map((o: Order) => o.buyerId)],
    queryFn: async () => {
      const buyerIds = readyForRelease.map((o: Order) => o.buyerId);
      const userPromises = buyerIds.map(async (id: number) => {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
          const user = await response.json();
          return [id, user];
        }
        return [id, { id, username: 'Customer', email: '' }];
      });
      const results = await Promise.all(userPromises);
      return Object.fromEntries(results);
    },
    enabled: readyForRelease.length > 0
  });

  const releaseFundsMutation = useMutation({
    mutationFn: async ({ orderId }: { orderId: number }) => {
      const response = await fetch(`/api/orders/${orderId}/release-funds`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to release funds');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders/all'] });
    },
    onError: (error) => {
      console.error('Error releasing funds:', error);
      alert('Failed to release funds. Please try again.');
    }
  });

  const handleReleaseFunds = (order: Order) => {
    if (window.confirm(`Release ${parseInt(order.totalAmount).toLocaleString()} XAF to the vendor for Order #${order.id}?`)) {
      releaseFundsMutation.mutate({ orderId: order.id });
    }
  };

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'mtn':
        return 'MTN Mobile Money';
      case 'orange':
        return 'Orange Money';
      case 'community_point':
        return 'Community Point';
      default:
        return method;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading escrow dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-900 mb-2">Failed to load orders</h3>
        <p className="text-red-700">Please try refreshing the page</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => setLocation('/admin-verify')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Admin Panel</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-2 flex items-center gap-2">
            <DollarSign size={32} />
            Escrow Release Dashboard
          </h1>
          <p className="text-gray-600">
            Manage final payment releases for completed orders
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="text-yellow-600" size={24} />
              <h3 className="font-semibold text-gray-900">Ready for Release</h3>
            </div>
            <p className="text-2xl font-bold text-yellow-600">{readyForRelease.length}</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-green-600" size={24} />
              <h3 className="font-semibold text-gray-900">Total Amount</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {readyForRelease.reduce((sum: number, order: Order) => sum + parseInt(order.totalAmount), 0).toLocaleString()} XAF
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="text-blue-600" size={24} />
              <h3 className="font-semibold text-gray-900">System Status</h3>
            </div>
            <p className="text-sm font-medium text-blue-600">Active</p>
          </div>
        </div>

        {readyForRelease.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">All funds released</h3>
            <p className="text-gray-600 mb-6">No orders are currently waiting for fund release.</p>
            <button
              onClick={() => setLocation('/admin-verify')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Admin Panel
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {readyForRelease.map((order: Order) => {
              const product = products[order.productId];
              const vendor = users[order.vendorId];
              const buyer = users[order.buyerId];

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">
                        Confirmed on {order.confirmedAt ? new Date(order.confirmedAt).toLocaleDateString() : 'Unknown'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-600">
                      <CheckCircle size={16} />
                      Ready for Release
                    </div>
                  </div>

                  {/* Order Details Grid */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {/* Product Info */}
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Product</h4>
                        <p className="text-sm text-gray-700 mb-1">
                          {product?.title || 'Unknown Product'}
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          {parseInt(order.totalAmount).toLocaleString()} XAF
                        </p>
                      </div>
                    </div>

                    {/* Vendor Info */}
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Vendor</h4>
                        <p className="text-sm text-gray-700 mb-1">
                          {vendor?.username || 'Unknown Vendor'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Receiving Payment
                        </p>
                      </div>
                    </div>

                    {/* Buyer Info */}
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Buyer</h4>
                        <p className="text-sm text-gray-700 mb-1">
                          {buyer?.username || 'Unknown Buyer'}
                        </p>
                        <p className="text-xs text-gray-500">
                          Order Confirmed
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Payment Details</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Payment Method:</span>
                        <span className="ml-2 font-medium">{getPaymentMethodDisplay(order.paymentMethod)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Delivery Method:</span>
                        <span className="ml-2 font-medium">{order.deliveryMethod.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Release Escrow Payment</h4>
                      <p className="text-sm text-gray-600">
                        This will transfer {parseInt(order.totalAmount).toLocaleString()} XAF to the vendor's account.
                      </p>
                    </div>
                    <button
                      onClick={() => handleReleaseFunds(order)}
                      disabled={releaseFundsMutation.isPending}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {releaseFundsMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Releasing...
                        </>
                      ) : (
                        <>
                          <DollarSign size={18} />
                          Release Funds
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Escrow Management Guide</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Orders appear here only after both delivery and buyer confirmation</li>
            <li>• Fund release transfers payment from escrow to vendor's account</li>
            <li>• This action completes the transaction and cannot be reversed</li>
            <li>• Monitor vendor sales statistics and transaction history</li>
          </ul>
        </div>
      </div>
    </div>
  );
}