import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Camera, 
  Upload, 
  ShoppingBag,
  ArrowLeft,
  AlertCircle
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

export default function BuyerOrders() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [photoProofs, setPhotoProofs] = useState<{[key: number]: string}>({});

  // Fetch buyer's orders (using buyerId = 1 for demo)
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['/api/orders/buyer/1'],
    queryFn: async () => {
      const response = await fetch('/api/orders/buyer/1');
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

  const updateOrderMutation = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: number; status: string }) => {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders/buyer/1'] });
    },
    onError: (error) => {
      console.error('Error updating order:', error);
      alert('Failed to update order. Please try again.');
    }
  });

  const handlePhotoUpload = (orderId: number, photoUrl: string) => {
    setPhotoProofs(prev => ({ ...prev, [orderId]: photoUrl }));
  };

  const handleConfirmReceipt = (order: Order) => {
    const photoUrl = photoProofs[order.id];
    
    if (!photoUrl || !photoUrl.trim()) {
      alert('Please upload a photo URL first.');
      return;
    }

    // Validate URL format
    try {
      new URL(photoUrl);
    } catch {
      alert('Please enter a valid photo URL.');
      return;
    }

    updateOrderMutation.mutate({
      orderId: order.id,
      status: 'buyer_confirmed'
    });

    // Clear the photo URL after confirmation
    setPhotoProofs(prev => {
      const updated = { ...prev };
      delete updated[order.id];
      return updated;
    });
  };

  const getStatusDisplay = (order: Order) => {
    if (order.buyerConfirmed) {
      return {
        text: 'Confirmed - Funds Released',
        color: 'text-green-600',
        bg: 'bg-green-100',
        icon: CheckCircle
      };
    }
    
    if (order.deliveryStatus === 'delivered') {
      return {
        text: 'Delivered - Confirm Receipt',
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        icon: AlertCircle
      };
    }
    
    if (order.paymentStatus === 'escrowed') {
      return {
        text: 'Payment in Escrow',
        color: 'text-blue-600',
        bg: 'bg-blue-100',
        icon: Package
      };
    }
    
    if (order.paymentStatus === 'pending') {
      return {
        text: 'Payment Pending',
        color: 'text-yellow-600',
        bg: 'bg-yellow-100',
        icon: Clock
      };
    }
    
    return {
      text: `${order.paymentStatus} / ${order.deliveryStatus}`,
      color: 'text-gray-600',
      bg: 'bg-gray-100',
      icon: Clock
    };
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
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => setLocation('/products')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Products</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 flex items-center gap-2">
          <Package size={32} />
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders. Start shopping to see your orders here.</p>
            <button
              onClick={() => setLocation('/products')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: Order) => {
              const product = products[order.productId];
              const statusInfo = getStatusDisplay(order);
              const StatusIcon = statusInfo.icon;
              const canConfirmReceipt = (order.deliveryStatus === 'delivered' || order.paymentStatus === 'escrowed') && !order.buyerConfirmed;
              const isConfirmed = order.buyerConfirmed;

              return (
                <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                  {/* Order Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                      <StatusIcon size={16} />
                      {statusInfo.text}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex gap-4 mb-4">
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
                        Quantity: {order.quantity} | {order.deliveryMethod.replace('_', ' ')}
                      </div>
                    </div>
                  </div>

                  {/* Confirmation Section */}
                  {canConfirmReceipt && !isConfirmed && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Camera size={18} />
                        Confirm Receipt
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Have you received your order? Upload a photo as proof and confirm receipt to release payment to the vendor.
                      </p>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Photo URL (Upload to a service like Imgur or Cloudinary)
                          </label>
                          <input
                            type="url"
                            placeholder="https://example.com/photo.jpg"
                            value={photoProofs[order.id] || ''}
                            onChange={(e) => handlePhotoUpload(order.id, e.target.value)}
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        
                        <button
                          onClick={() => handleConfirmReceipt(order)}
                          disabled={updateOrderMutation.isPending}
                          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updateOrderMutation.isPending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Confirming...
                            </>
                          ) : (
                            <>
                              <CheckCircle size={18} />
                              I received my order
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Confirmed Status */}
                  {isConfirmed && (
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle size={20} />
                        <span className="font-semibold">Receipt confirmed! Funds have been released to the vendor.</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-900 mb-2">How it works</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your payment is held securely in escrow until you confirm receipt</li>
            <li>• Upload a photo as proof when you receive your item</li>
            <li>• Once confirmed, payment is released to the vendor</li>
            <li>• Contact support if you have any issues with your order</li>
          </ul>
        </div>
      </div>
    </div>
  );
}