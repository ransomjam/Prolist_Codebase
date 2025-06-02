import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  CheckCircle, 
  Package, 
  Clock, 
  Phone, 
  MessageCircle, 
  MapPin,
  CreditCard,
  Truck,
  User,
  Home
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
  deliveryAddress: string;
  buyerPhone: string;
  notes: string;
  status: string;
  createdAt: string;
}

interface Product {
  id: number;
  title: string;
  price: string;
  location: string;
}

interface VendorApplication {
  fullName: string;
  phone: string;
  location: string;
  status: string;
}

export default function OrderConfirmed() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  // Fetch order details
  const { data: order, isLoading } = useQuery({
    queryKey: ['/api/orders', id],
    queryFn: async () => {
      const response = await fetch(`/api/orders/${id}`);
      if (!response.ok) throw new Error('Order not found');
      return response.json();
    }
  });

  // Fetch product details
  const { data: product } = useQuery({
    queryKey: ['/api/products', order?.productId],
    queryFn: async () => {
      if (!order?.productId) return null;
      const response = await fetch(`/api/products/${order.productId}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!order?.productId
  });

  // Fetch vendor info
  const { data: vendor } = useQuery({
    queryKey: ['/api/vendor/application', order?.vendorId],
    queryFn: async () => {
      if (!order?.vendorId) return null;
      const response = await fetch(`/api/vendor/application/${order.vendorId}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!order?.vendorId
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
        <button 
          onClick={() => setLocation('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const getDeliveryMethodLabel = (method: string) => {
    switch (method) {
      case 'vendor_delivery': return 'Vendor Delivery';
      case 'buyer_pickup': return 'Buyer Pickup';
      case 'local_rider': return 'Local Rider';
      default: return method;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'mtn': return 'MTN Mobile Money';
      case 'orange': return 'Orange Money';
      case 'cpp': return 'Community Payment Point';
      default: return method;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Success Header */}
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">Your order has been placed successfully</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              <strong>Order ID:</strong> #{order.id}
            </p>
            <p className="text-sm text-green-800">
              <strong>Status:</strong> Payment in Escrow
            </p>
          </div>
        </div>

        {/* Product Info */}
        {product && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Package size={20} />
              Product Details
            </h3>
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{product.title}</h4>
                <p className="text-xl font-bold text-green-600 mb-2">
                  {parseInt(order.totalAmount).toLocaleString()} XAF
                </p>
                <div className="text-sm text-gray-600">
                  Quantity: {order.quantity}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vendor Info */}
        {vendor && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User size={20} />
              Vendor Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{vendor.fullName}</div>
                  <div className="text-sm text-green-600">{vendor.status}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} />
                <span>{vendor.phone}</span>
              </div>
            </div>
          </div>
        )}

        {/* Delivery & Payment Info */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery & Payment</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Truck className="text-blue-600" size={20} />
              <div>
                <div className="font-medium text-gray-900">{getDeliveryMethodLabel(order.deliveryMethod)}</div>
                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin size={14} />
                  {order.deliveryAddress}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <CreditCard className="text-green-600" size={20} />
              <div>
                <div className="font-medium text-gray-900">{getPaymentMethodLabel(order.paymentMethod)}</div>
                <div className="text-sm text-gray-600">Secure escrow payment</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-gray-600" size={20} />
              <div>
                <div className="font-medium text-gray-900">Your Phone</div>
                <div className="text-sm text-gray-600">{order.buyerPhone}</div>
              </div>
            </div>

            {order.notes && (
              <div className="flex items-start gap-3">
                <MessageCircle className="text-gray-600 mt-1" size={20} />
                <div>
                  <div className="font-medium text-gray-900">Special Instructions</div>
                  <div className="text-sm text-gray-600">{order.notes}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Clock size={20} />
            What Happens Next?
          </h3>
          <div className="space-y-3 text-sm text-blue-800">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">1</span>
              </div>
              <div>
                <div className="font-medium">Vendor Confirmation</div>
                <div>The vendor will confirm your order and prepare the item for delivery</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">2</span>
              </div>
              <div>
                <div className="font-medium">Delivery Coordination</div>
                <div>You'll be contacted via phone to arrange delivery details</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold">3</span>
              </div>
              <div>
                <div className="font-medium">Payment Release</div>
                <div>Payment is released to vendor after you confirm receipt</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setLocation('/products')}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Home size={18} />
            Continue Shopping
          </button>
          
          <button
            onClick={() => setLocation('/orders')}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Package size={18} />
            View My Orders
          </button>
        </div>

        {/* Support Info */}
        <div className="bg-gray-100 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">
            Need help with your order? Contact our support team or reach out to the vendor directly.
          </p>
        </div>
      </div>
    </div>
  );
}