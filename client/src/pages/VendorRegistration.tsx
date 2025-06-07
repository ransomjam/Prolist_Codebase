import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Shield, Upload, Calendar, Camera, MapPin, Phone, User, CheckCircle, AlertCircle } from 'lucide-react';
import { useLocation } from 'wouter';

interface VendorForm {
  fullName: string;
  phone: string;
  location: string;
  shopType: 'online' | 'physical';
  businessName: string;
  businessAddress: string;
  marketLocation: string;
  marketLine: string;
  shopNumber: string;
  idDocument: File | null;
  shopPhoto: File | null;
  productPhotos: File[];
  businessDescription: string;
}

interface VerificationSlot {
  date: string;
  time: string;
  available: boolean;
}

export default function VendorRegistration() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<VendorForm>({
    fullName: user?.username || '',
    phone: '',
    location: '',
    shopType: 'online',
    businessName: '',
    businessAddress: '',
    marketLocation: '',
    marketLine: '',
    shopNumber: '',
    idDocument: null,
    shopPhoto: null,
    productPhotos: [],
    businessDescription: ''
  });

  // Market data for location selection
  const marketData = {
    'Main Market': ['Electronics Line', 'Fashion Line', 'Food Line', 'Cosmetics Line', 'Hardware Line'],
    'Ntarikon Market': ['Vegetable Line', 'Meat Line', 'Fish Line', 'Spices Line'],
    'Food Market': ['Fresh Produce Line', 'Processed Foods Line', 'Beverages Line'],
    'Mankon Market': ['Clothing Line', 'Shoes Line', 'Bags Line'],
    'Commercial Avenue': ['Tech Shops Line', 'Phone Accessories Line', 'Computer Line'],
    'Nkwen Market': ['Traditional Items Line', 'Crafts Line', 'Art Line']
  };

  // Mock verification slots - in real app this would come from backend
  const [verificationSlots] = useState<VerificationSlot[]>([
    { date: '2025-06-02', time: '09:00', available: true },
    { date: '2025-06-02', time: '14:00', available: true },
    { date: '2025-06-03', time: '10:00', available: false },
    { date: '2025-06-03', time: '15:00', available: true },
    { date: '2025-06-04', time: '11:00', available: true },
    { date: '2025-06-04', time: '16:00', available: true },
  ]);

  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (field: keyof VendorForm, file: File | File[]) => {
    setForm(prev => ({ ...prev, [field]: file }));
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return form.fullName && form.phone && form.location && form.businessName;
      case 2:
        return form.idDocument && form.shopPhoto && form.productPhotos.length > 0;
      case 3:
        return selectedSlot;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // In real app, this would upload files and submit to backend
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (Array.isArray(value)) {
          value.forEach((file, index) => {
            if (file instanceof File) {
              formData.append(`${key}[${index}]`, file);
            }
          });
        } else {
          formData.append(key, value as string);
        }
      });
      formData.append('verificationSlot', selectedSlot);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Vendor registration submitted:', {
        ...form,
        verificationSlot: selectedSlot,
        submittedAt: new Date().toISOString()
      });

      setCurrentStep(4); // Success step
    } catch (error) {
      console.error('Error submitting vendor registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Vendor Registration</h2>
        <p className="text-gray-600">Join our trusted marketplace community</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline w-4 h-4 mr-1" />
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+237 6XX XXX XXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Bamenda, Northwest Region"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shop Type</label>
          <select
            name="shopType"
            value={form.shopType}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="online">Online Store</option>
            <option value="physical">Physical Shop</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
          <input
            type="text"
            name="businessName"
            value={form.businessName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your business name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Address</label>
          <input
            type="text"
            name="businessAddress"
            value={form.businessAddress}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Full business address"
          />
        </div>

        {/* Market Location Selection - Only for Physical Shops */}
        {form.shopType === 'physical' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Market Location *</label>
              <select
                name="marketLocation"
                value={form.marketLocation}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Market</option>
                {Object.keys(marketData).map(market => (
                  <option key={market} value={market}>{market}</option>
                ))}
              </select>
            </div>

            {form.marketLocation && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Market Line *</label>
                <select
                  name="marketLine"
                  value={form.marketLine}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Line/Section</option>
                  {marketData[form.marketLocation as keyof typeof marketData]?.map(line => (
                    <option key={line} value={line}>{line}</option>
                  ))}
                </select>
              </div>
            )}

            {form.marketLine && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Shop Number</label>
                <input
                  type="text"
                  name="shopNumber"
                  value={form.shopNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Shop 45, Stall B12, etc."
                />
                <p className="text-xs text-gray-500 mt-1">If you don't have a specific number, describe your location (e.g., "Corner shop near entrance")</p>
              </div>
            )}
          </>
        )}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
          <textarea
            name="businessDescription"
            value={form.businessDescription}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Describe your business and what you sell..."
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Upload className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Document Upload</h2>
        <p className="text-gray-600">Upload required documents for verification</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ID Document * (National ID, Passport, or Driver's License)</label>
          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-6 text-center transition-colors">
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => e.target.files && handleFileUpload('idDocument', e.target.files[0])}
              className="hidden"
              id="id-upload"
            />
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">Upload clear photo of your ID document</p>
            <div className="flex gap-2 justify-center">
              <label htmlFor="id-upload" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
                Choose from Device
              </label>
            </div>
            {form.idDocument && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ {form.idDocument.name}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shop/Business Photo *</label>
          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-6 text-center transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && handleFileUpload('shopPhoto', e.target.files[0])}
              className="hidden"
              id="shop-upload"
            />
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">Upload photo of your shop front or workspace</p>
            <div className="flex gap-2 justify-center">
              <label htmlFor="shop-upload" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
                Choose from Device
              </label>
            </div>
            {form.shopPhoto && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ {form.shopPhoto.name}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Photos * (Up to 5 photos)</label>
          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-6 text-center transition-colors">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && handleFileUpload('productPhotos', Array.from(e.target.files).slice(0, 5))}
              className="hidden"
              id="products-upload"
            />
            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">Upload clear photos of your products or services</p>
            <div className="flex gap-2 justify-center">
              <label htmlFor="products-upload" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
                Choose from Device
              </label>
            </div>
            {form.productPhotos.length > 0 && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ {form.productPhotos.length} photos uploaded (max 5)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Calendar className="w-16 h-16 text-purple-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900">Schedule Video Verification</h2>
        <p className="text-gray-600">Choose a convenient time for your verification call</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-blue-600 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-blue-900">What to expect:</h4>
            <ul className="text-sm text-blue-800 mt-1 space-y-1">
              <li>• 10-15 minute video call with our verification team</li>
              <li>• Please have your ID document ready</li>
              <li>• Ensure good lighting and stable internet</li>
              <li>• You'll receive a WhatsApp link 30 minutes before</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <h3 className="font-semibold text-gray-900">Available time slots:</h3>
        {verificationSlots.map((slot, index) => (
          <label
            key={index}
            className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedSlot === `${slot.date}-${slot.time}`
                ? 'border-blue-500 bg-blue-50'
                : slot.available
                ? 'border-gray-200 hover:border-blue-300'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed'
            }`}
          >
            <input
              type="radio"
              name="verificationSlot"
              value={`${slot.date}-${slot.time}`}
              checked={selectedSlot === `${slot.date}-${slot.time}`}
              onChange={(e) => setSelectedSlot(e.target.value)}
              disabled={!slot.available}
              className="sr-only"
            />
            <div>
              <div className="font-medium text-gray-900">
                {new Date(slot.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="text-sm text-gray-600">{slot.time}</div>
            </div>
            <div>
              {slot.available ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">Booked</span>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="text-center space-y-6">
      <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
      <h2 className="text-3xl font-bold text-gray-900">Registration Submitted!</h2>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h3 className="font-semibold text-green-900 mb-2">What happens next?</h3>
        <div className="text-sm text-green-800 space-y-2">
          <p>✓ Your documents are being reviewed by our team</p>
          <p>✓ You'll receive a WhatsApp message with your video call link</p>
          <p>✓ After successful verification, you'll get your "Basic Verified" badge</p>
          <p>✓ You can then start listing your products on ProList</p>
        </div>
      </div>
      <div className="space-y-3">
        <button
          onClick={() => setLocation('/app')}
          className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-700 transition-all shadow-lg"
        >
          Return to Dashboard
        </button>
        <button
          onClick={() => setLocation('/profile')}
          className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-all"
        >
          View My Profile
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Indicator */}
        {currentStep < 4 && (
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-20 h-1 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Navigation Buttons */}
          {currentStep < 4 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {currentStep < 3 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!validateCurrentStep()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!validateCurrentStep() || isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-lg hover:from-blue-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}