import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Shield, Upload, Calendar, CheckCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix to get just the base64 string
      resolve(result.split(',')[1]);
    };
    reader.onerror = error => reject(error);
  });
};

interface VendorForm {
  fullName: string;
  phone: string;
  location: string;
  idCard: File | null;
  photo: File | null;
  appointment: string;
  physicalAppointment: string;
  verificationType: 'video' | 'physical';
}

export default function VendorRegister() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [form, setForm] = useState<VendorForm>({
    fullName: user?.username || '',
    phone: '',
    location: '',
    idCard: null,
    photo: null,
    appointment: '',
    physicalAppointment: '',
    verificationType: 'video',
  });

  const submitMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch('/api/vendor/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id || 1,
          fullName: data.fullName,
          phone: data.phone,
          location: data.location,
          shopType: 'online',
          businessName: data.fullName + "'s Business",
          verificationSlot: data.appointment,
          idCardUrl: data.idCard,
          shopPhotoUrl: data.photo
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to submit application' }));
        throw new Error(errorData.message || 'Failed to submit application');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      setErrorMessage('');
      queryClient.invalidateQueries({ queryKey: ['/api/vendor/applications'] });
    },
    onError: (error: Error) => {
      console.error('Submission error:', error);
      setErrorMessage(error.message || 'Failed to submit application. Please try again.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, [fieldName]: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredAppointment = form.verificationType === 'video' ? form.appointment : form.physicalAppointment;
    if (!form.fullName || !form.phone || !form.location || !form.idCard || !form.photo || !requiredAppointment) {
      alert('Please fill in all fields');
      return;
    }

    try {
      // Convert files to base64 or use placeholder URLs for demo
      const idCardUrl = form.idCard ? `data:${form.idCard.type};base64,${await fileToBase64(form.idCard)}` : '';
      const photoUrl = form.photo ? `data:${form.photo.type};base64,${await fileToBase64(form.photo)}` : '';

      submitMutation.mutate({
        fullName: form.fullName,
        phone: form.phone,
        location: form.location,
        appointment: form.verificationType === 'video' ? form.appointment : form.physicalAppointment,
        verificationType: form.verificationType,
        idCard: idCardUrl,
        photo: photoUrl
      });
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">🎉 Congratulations!</h2>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-bold text-lg">✅ VERIFIED VENDOR</p>
            <p className="text-green-700 text-sm mt-1">Your application has been automatically approved!</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">🚀 Your New Benefits:</h3>
            <ul className="text-sm text-blue-800 space-y-1 text-left">
              <li>• ✅ List unlimited products</li>
              <li>• ✅ Receive orders and payments</li>
              <li>• ✅ Verified vendor badge</li>
              <li>• ✅ Access to vendor dashboard</li>
              <li>• ✅ Customer messaging system</li>
            </ul>
          </div>

          <div className="space-y-3">
            <a
              href="/product-listing"
              className="block bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-emerald-500 transition-all shadow-lg"
            >
              🛍️ Start Listing Products
            </a>
            <a
              href="/profile"
              className="block bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              View My Profile
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-blue-600" size={32} />
        <h2 className="text-3xl font-bold text-blue-600">Vendor Registration</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg grid gap-4">
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800 font-medium">Application Submission Failed:</p>
            <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2">Registration Requirements:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Valid government-issued ID</li>
            <li>• Clear photo of your shop or products</li>
            <li>• Physical verification appointment (Pro)</li>
            <li>• Video verification (Basic)</li>
            <li>• Business location in Bamenda area</li>
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full legal name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="e.g. +237 6XX XXX XXX"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Location *</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Main Market, Commercial Avenue"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ID Card Photo *</label>
          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-6 text-center transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'idCard')}
              className="hidden"
              id="id-upload"
              required
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">Upload clear photo of your government-issued ID</p>
            <label htmlFor="id-upload" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
              Choose from Device
            </label>
            {form.idCard && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ {form.idCard.name}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shop/Product Photo *</label>
          <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-6 text-center transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, 'photo')}
              className="hidden"
              id="shop-upload"
              required
            />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-3">Clear photo of your shop front or products you sell</p>
            <label htmlFor="shop-upload" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
              Choose from Device
            </label>
            {form.photo && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                ✓ {form.photo.name}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verification Type *</label>
          <select
            name="verificationType"
            value={form.verificationType}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="video">Video Verification (Basic)</option>
            <option value="physical">Physical Verification (Pro)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {form.verificationType === 'video' 
              ? 'Basic verification via video call - suitable for most vendors'
              : 'Premium verification with in-person visit - for enhanced credibility'
            }
          </p>
        </div>

        {form.verificationType === 'video' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Video Appointment Date *</label>
            <div className="flex gap-2">
              <Calendar className="text-gray-400 mt-3" size={20} />
              <input
                name="appointment"
                type="datetime-local"
                value={form.appointment}
                onChange={handleChange}
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Choose your preferred date and time for video verification call</p>
          </div>
        )}

        {form.verificationType === 'physical' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Physical Verification Appointment Date *</label>
            <div className="flex gap-2">
              <Calendar className="text-gray-400 mt-3" size={20} />
              <input
                name="physicalAppointment"
                type="datetime-local"
                value={form.physicalAppointment}
                onChange={handleChange}
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Choose your preferred date and time for in-person verification visit</p>
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 text-sm font-medium">Physical Verification Benefits:</p>
              <ul className="text-amber-700 text-xs mt-1 space-y-1">
                <li>• Enhanced vendor credibility badge</li>
                <li>• Priority listing placement</li>
                <li>• Higher customer trust rating</li>
                <li>• Access to premium vendor features</li>
              </ul>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={submitMutation.isPending}
          className="bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-emerald-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitMutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </div>
          ) : (
            'Submit Verification Request'
          )}
        </button>
      </form>
    </div>
  );
}