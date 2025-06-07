import { useRoute, Link } from 'wouter';
import { CheckCircle, Shield, Clock, MessageCircle, Eye } from 'lucide-react';

export default function ServiceOrderConfirmed() {
  const [, params] = useRoute('/service-order-confirmed/:orderId');
  const orderId = params?.orderId || '';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-2">
            Your service order has been successfully placed
          </p>
          <p className="text-lg text-blue-600 font-semibold">Order #{orderId}</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Escrow Protection Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Payment Secured in Escrow</h3>
                  <p className="text-gray-600">
                    Your payment has been safely held in our escrow system. Funds will only be released 
                    to the professional after you confirm successful service delivery.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">How Escrow Protection Works:</h4>
                <ol className="text-sm text-blue-700 space-y-1">
                  <li>1. Your payment is securely held by ProList</li>
                  <li>2. Professional begins work on your project</li>
                  <li>3. You review and approve the completed work</li>
                  <li>4. Payment is released to the professional</li>
                </ol>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-6">What Happens Next?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Professional Notification</h4>
                    <p className="text-gray-600 text-sm">
                      The professional has been notified and will contact you within 24 hours to discuss project details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Communication</h4>
                    <p className="text-gray-600 text-sm">
                      Use the in-app chat to communicate requirements, share files, and track progress.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Service Delivery</h4>
                    <p className="text-gray-600 text-sm">
                      Review completed work and confirm delivery to release payment from escrow.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h4 className="font-medium text-amber-800 mb-3">Important Notes:</h4>
              <ul className="text-sm text-amber-700 space-y-2">
                <li>• Keep all communication within the ProList platform for security</li>
                <li>• Report any issues immediately through our support system</li>
                <li>• You have 7 days to confirm delivery after work completion</li>
                <li>• Escrow automatically releases after 7 days if no disputes are raised</li>
              </ul>
            </div>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Manage Your Order</h3>
              
              <div className="space-y-4">
                <Link href="/buyer-orders">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View All Orders</span>
                  </button>
                </Link>

                <Link href="/services">
                  <button className="w-full px-4 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors">
                    Browse More Services
                  </button>
                </Link>

                <Link href="/help">
                  <button className="w-full px-4 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 rounded-lg transition-colors">
                    Get Help & Support
                  </button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t">
                <h4 className="font-medium text-gray-800 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Our support team is available 24/7 to assist you.
                </p>
                <div className="text-sm text-blue-600">
                  <p>Email: info.prolist@gmail.com</p>
                  <p>Phone: +237 671 308 991</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}