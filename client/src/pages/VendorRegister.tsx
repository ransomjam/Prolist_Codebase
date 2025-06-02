import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Shield, Upload, Calendar, CheckCircle } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

interface VendorForm {
  fullName: string;
  phone: string;
  location: string;
  idCard: string;
  photo: string;
  appointment: string;
}

export default function VendorRegister() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<VendorForm>({
    fullName: user?.username || '',
    phone: '',
    location: '',
    idCard: '',
    photo: '',
    appointment: '',
  });

  const submitMutation = useMutation({
    mutationFn: async (data: VendorForm) => {
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
        throw new Error('Failed to submit application');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/vendor/applications'] });
    },
    onError: (error) => {
      console.error('Error submitting vendor application:', error);
      alert('Failed to submit application. Please try again.');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!form.fullName || !form.phone || !form.location || !form.idCard || !form.photo || !form.appointment) {
      alert('Please fill in all fields');
      return;
    }

    submitMutation.mutate(form);
  };

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 font-medium">Status: Pending Basic Verification</p>
          </div>
          <p className="text-gray-600 mb-4">
            Admin will confirm your appointment and review your documents.
          </p>
          <p className="text-sm text-gray-500">
            You'll receive updates on your verification status via phone or email.
          </p>
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
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2">Registration Requirements:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Valid government-issued ID</li>
            <li>• Clear photo of your shop or products</li>
            <li>• Video verification appointment</li>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">ID Card Photo URL *</label>
          <div className="flex gap-2">
            <Upload className="text-gray-400 mt-3" size={20} />
            <input
              name="idCard"
              value={form.idCard}
              onChange={handleChange}
              placeholder="https://example.com/id-photo.jpg"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Upload your ID to a cloud service and paste the URL</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Shop/Product Photo URL *</label>
          <div className="flex gap-2">
            <Upload className="text-gray-400 mt-3" size={20} />
            <input
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="https://example.com/shop-photo.jpg"
              className="flex-1 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Clear photo of your shop front or products you sell</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Verification Appointment *</label>
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