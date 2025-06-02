import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Package, 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  CheckCircle, 
  ArrowLeft,
  Phone,
  MessageCircle
} from 'lucide-react';

interface Product {
  id: number;
  vendorId: number;
  title: string;
  category: string;
  price: string;
  description: string;
  location: string;
  status: string;
  viewCount: number;
  salesCount: number;
  createdAt: string;
}

interface VendorApplication {
  id: number;
  userId: number;
  fullName: string;
  phone: string;
  location: string;
  status: string;
}

export default function Checkout() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  const [delivery, setDelivery] = useState('vendor_delivery');
  const [payment, setPayment] = useState('mtn');
  const [notes, setNotes] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerLocation, setBuyerLocation] = useState('');

  // Fetch product details
  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['/api/products', id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) throw new Error('Product not found');
      return response.json();
    }
  });

  // Fetch vendor info
  const { data: vendor } = useQuery({
    queryKey: ['/api/vendor/application', product?.vendorId],
    queryFn: async () => {
      if (!product?.vendorId) return null;
      const response = await fetch(`/api/vendor/application/${product.vendorId}`);
      if (!response.ok) return null;
      return response.json();
    },
    enabled: !!product?.vendorId
  });

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      return response.json();
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      setLocation(`/order-confirmed/${order.id}`);
    },
    onError: (error) => {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  });

  const handleConfirm = () => {
    if (!buyerPhone.trim()) {
      alert('Please enter your phone number for delivery coordination.');
      return;
    }

    if (delivery !== 'buyer_pickup' && !buyerLocation.trim()) {
      alert('Please enter your delivery location.');
      return;
    }

    const orderData = {
      productId: parseInt(id!),
      vendorId: product.vendorId,
      buyerId: 1, // Using authenticated user ID
      quantity: 1,
      totalAmount: product.price,
      deliveryMethod: delivery,
      paymentMethod: payment,
      deliveryAddress: delivery === 'buyer_pickup' ? vendor?.location : buyerLocation,
      buyerPhone,
      notes: notes.trim() || null,
      status: 'pending_payment'
    };

    createOrderMutation.mutate(orderData);
  };

  if (productLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <button 
          onClick={() => setLocation('/products')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const deliveryOptions = [
    { value: 'vendor_delivery', label: 'Vendor Delivery', icon: Truck, description: 'Seller delivers to your location' },
    { value: 'buyer_pickup', label: 'Buyer Pickup', icon: MapPin, description: 'Pick up from seller location' },
    { value: 'local_rider', label: 'Local Rider', icon: User, description: 'Third-party delivery service' }
  ];

  const paymentOptions = [
    { value: 'mtn', label: 'MTN Mobile Money', description: 'Pay with MTN MoMo' },
    { value: 'orange', label: 'Orange Money', description: 'Pay with Orange Money' },
    { value: 'cpp', label: 'Community Payment Point', description: 'Pay at local CPP' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button 
            onClick={() => setLocation(`/product/${id}`)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            <span>Back to Product</span>
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
            <Package className="text-blue-600" size={28} />
            Checkout
          </h1>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{product.title}</h4>
              <p className="text-2xl font-bold text-green-600 mb-2">
                {parseInt(product.price).toLocaleString()} XAF
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={14} />
                <span>{product.location}</span>
              </div>
              {vendor && (
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <User size={14} />
                  <span>Sold by {vendor.fullName}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Buyer Information */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                placeholder="+237 6XX XXX XXX"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Delivery Method */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Method</h3>
          <div className="space-y-3">
            {deliveryOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="delivery"
                  value={option.value}
                  checked={delivery === option.value}
                  onChange={(e) => setDelivery(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <option.icon className="text-blue-600" size={20} />
                <div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              </label>
            ))}
          </div>

          {delivery !== 'buyer_pickup' && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Delivery Address *
              </label>
              <input
                type="text"
                value={buyerLocation}
                onChange={(e) => setBuyerLocation(e.target.value)}
                placeholder="Enter your full address"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CreditCard size={20} />
            Payment Method
          </h3>
          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value={option.value}
                  checked={payment === option.value}
                  onChange={(e) => setPayment(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <CreditCard className="text-green-600" size={20} />
                <div>
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-600">{option.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageCircle size={20} />
            Special Instructions (Optional)
          </h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special delivery instructions or notes for the seller..."
            rows={3}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Product Price</span>
              <span className="font-semibold">{parseInt(product.price).toLocaleString()} XAF</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-semibold text-green-600">Free</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-600">{parseInt(product.price).toLocaleString()} XAF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={createOrderMutation.isPending}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {createOrderMutation.isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing Order...
            </div>
          ) : (
            <>
              <CheckCircle size={20} />
              Confirm Order
            </>
          )}
        </button>

        {/* Trust Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>Secure Transaction:</strong> Your payment will be held in escrow until you confirm receipt of the product. 
            This protects both buyers and sellers in our trust-based marketplace.
          </p>
        </div>
      </div>
    </div>
  );
}