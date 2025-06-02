import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  User, 
  ArrowLeft,
  AlertCircle,
  DollarSign,
  MapPin,
  MessageSquare
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

interface Buyer {
  id: number;
  username: string;
  email: string;
}

export default function VendorOrders() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Fetch vendor's orders (using vendorId = 1 for demo - Sarah Mbah)
  const { data: orders = [], isLoading, error } = useQuery({
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

  // Fetch product details for each order
  const { data: products = {} } = useQuery({
    queryKey: ['/api/products/batch', orders.map((o: Order) => o.productId)],
    queryFn: async () => {
      const productIds = orders.map((o: Order) => o.productId);
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
    enabled: orders.length > 0
  });

  // Fetch buyer details for each order
  const { data: buyers = {} } = useQuery({
    queryKey: ['/api/users/batch', orders.map((o: Order) => o.buyerId)],
    queryFn: async () => {
      const buyerIds = orders.map((o: Order) => o.buyerId);
      const buyerPromises = buyerIds.map(async (id: number) => {
        const response = await fetch(`/api/users/${id}`);
        if (response.ok) {
          const buyer = await response.json();
          return [id, buyer];
        }
        return [id, { id, username: 'Customer', email: '' }];
      });
      const results = await Promise.all(buyerPromises);
      return Object.fromEntries(results);
    },
    enabled: orders.length > 0
  });

  const markAsDeliveredMutation = useMutation({
    mutationFn: async ({ orderId }: { orderId: number }) => {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'delivered' }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to mark as delivered');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders/vendor/1'] });
    },
    onError: (error) => {
      console.error('Error marking as delivered:', error);
      alert('Failed to mark as delivered. Please try again.');
    }
  });

  const handleMarkAsDelivered = (order: Order) => {
    markAsDeliveredMutation.mutate({ orderId: order.id });
  };

  const getStatusDisplay = (order: Order) => {
    if (order.buyerConfirmed) {
      return {
        text: 'Completed - Payment Released',
        color: 'text-green-600',
        bg: 'bg-green-100',
        icon: CheckCircle
      };
    }
    
    if (order.deliveryStatus === 'delivered') {
      return {
        text: 'Delivered - Awaiting Confirmation',
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        icon: AlertCircle
      };
    }
    
    if (order.paymentStatus === 'escrowed') {
      return {
        text: 'Payment Received - Ready to Ship',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        icon: Package
      };
    }
    
    return {
      text: 'Payment Pending',
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
      icon: Clock
    };
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
          <p className="text-gray-600">Loading your orders...</p>
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
            onClick={() => setLocation('/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <Package size={32} />
          Vendor Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">You haven't received any orders. Keep promoting your products to get more sales!</p>
            <button
              onClick={() => setLocation('/add-listing')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Product
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: Order) => {
              const product = products[order.productId];
              const buyer = buyers[order.buyerId];
              const statusInfo = getStatusDisplay(order);
              const StatusIcon = statusInfo.icon;
              const canMarkDelivered = order.paymentStatus === 'escrowed' && order.deliveryStatus !== 'delivered' && !order.buyerConfirmed;

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">
                        Received on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                      <StatusIcon size={16} />
                      {statusInfo.text}
                    </div>
                  </div>

                  {/* Product and Buyer Info */}
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    {/* Product Info */}
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {product?.title || 'Product'}
                        </h4>
                        <p className="text-xl font-bold text-green-600 mb-1">
                          {parseInt(order.totalAmount).toLocaleString()} XAF
                        </p>
                        <div className="text-sm text-gray-600">
                          Quantity: {order.quantity}
                        </div>
                      </div>
                    </div>

                    {/* Buyer Info */}
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <User className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">Customer</h4>
                        <p className="text-gray-700 mb-1">
                          {buyer?.username || 'Customer'}
                        </p>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div className="flex items-center gap-1">
                            <DollarSign size={14} />
                            <span>{getPaymentMethodDisplay(order.paymentMethod)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck size={14} />
                            <span>{order.deliveryMethod.replace('_', ' ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  {canMarkDelivered && (
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Ready to deliver?</h4>
                          <p className="text-sm text-gray-600">
                            Mark this order as delivered once you've sent the product to the customer.
                          </p>
                        </div>
                        <button
                          onClick={() => handleMarkAsDelivered(order)}
                          disabled={markAsDeliveredMutation.isPending}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          {markAsDeliveredMutation.isPending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Updating...
                            </>
                          ) : (
                            <>
                              <Truck size={18} />
                              Mark as Delivered
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Completion Status */}
                  {order.buyerConfirmed && (
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle size={20} />
                        <span className="font-semibold">Order completed! Payment has been released to your account.</span>
                      </div>
                      {order.confirmedAt && (
                        <p className="text-sm text-gray-500 mt-1">
                          Confirmed on {new Date(order.confirmedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">Order Management Guide</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Customer payments are held in escrow until delivery is confirmed</li>
            <li>• Mark orders as delivered once you've shipped the product</li>
            <li>• Customers will confirm receipt and release payment to you</li>
            <li>• Contact support if you have any issues with order fulfillment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}