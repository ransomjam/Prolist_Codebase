import { useState } from 'react';
import { useRoute, useLocation, Link } from 'wouter';
import { ArrowLeft, Shield, Star, CreditCard, Phone, Check } from 'lucide-react';
import { dummyProfessionals, serviceCategories } from '../data/professionalData';

export default function ServiceCheckout() {
  const [, params] = useRoute('/service-checkout/:professionalId');
  const [, setLocation] = useLocation();
  const professionalId = params?.professionalId || '';

  const [selectedService, setSelectedService] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the professional
  const professional = dummyProfessionals.find(p => p.id === professionalId);
  const category = serviceCategories.find(cat => cat.id === professional?.category);

  if (!professional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Professional Not Found</h2>
          <Link href="/services">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Services
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !serviceDescription || !paymentMethod) return;

    setIsSubmitting(true);

    // Simulate order creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate order ID
    const orderId = Math.floor(Math.random() * 1000000);

    // Redirect to order confirmation
    setLocation(`/service-order-confirmed/${orderId}`);
  };

  const basePrice = parseInt(professional.rate.replace(/[^0-9]/g, ''));
  const escrowFee = Math.round(basePrice * 0.05); // 5% escrow fee
  const totalAmount = basePrice + escrowFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/services">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Hire Professional</h1>
              <p className="text-gray-600">Secure escrow-protected service purchase</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h3>
              
              {/* Professional Info */}
              <div className="flex items-center space-x-4 mb-6 pb-6 border-b">
                <img
                  src={professional.avatar}
                  alt={professional.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{professional.name}</h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{professional.rating}</span>
                    <span className="text-gray-300">•</span>
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{professional.trustCount} trust</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{category?.name}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="font-medium">{basePrice.toLocaleString()} FCFA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Escrow Protection</span>
                  <span className="font-medium">{escrowFee.toLocaleString()} FCFA</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-gray-800">Total</span>
                  <span className="font-bold text-lg text-blue-600">{totalAmount.toLocaleString()} FCFA</span>
                </div>
              </div>

              {/* Escrow Protection Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-blue-800 mb-1">Escrow Protection</h5>
                    <p className="text-sm text-blue-700">
                      Your payment is held securely until you confirm service delivery. 
                      Only then will funds be released to the professional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Service Details</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Select Service *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {professional.services.map((service, index) => (
                        <label
                          key={index}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedService === service
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={service}
                            checked={selectedService === service}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedService === service
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}>
                              {selectedService === service && (
                                <Check className="w-2 h-2 text-white mx-auto mt-0.5" />
                              )}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{service}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      id="description"
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      rows={4}
                      placeholder="Describe your project requirements, timeline, and any specific details..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6">Payment Method</h3>
                
                <div className="space-y-3">
                  {[
                    { id: 'mtn', name: 'MTN Mobile Money', icon: Phone },
                    { id: 'orange', name: 'Orange Money', icon: Phone },
                    { id: 'express', name: 'Express Union', icon: CreditCard }
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded-full border-2 mr-4 ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && (
                          <Check className="w-2 h-2 text-white mx-auto mt-0.5" />
                        )}
                      </div>
                      <method.icon className="w-5 h-5 text-gray-600 mr-3" />
                      <span className="font-medium text-gray-800">{method.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <button
                  type="submit"
                  disabled={!selectedService || !serviceDescription || !paymentMethod || isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Processing...' : `Hire ${professional.name} - ${totalAmount.toLocaleString()} FCFA`}
                </button>
                
                <p className="text-sm text-gray-500 mt-3 text-center">
                  By clicking "Hire", you agree to our terms of service and escrow protection policy.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}