import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Shield, Briefcase, Image, DollarSign, AlertCircle, CheckCircle, Clock, MapPin } from 'lucide-react';

interface ServiceForm {
  title: string;
  category: string;
  description: string;
  price: string;
  serviceType: string;
  deliveryTime: string;
  location: string;
  image1: File | null;
  image2: File | null;
  image3: File | null;
}

export default function ServiceListingForm() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [submitted, setSubmitted] = useState(false);

  // Fetch user's vendor application status
  const { data: vendorApplication, isLoading } = useQuery({
    queryKey: ['/api/vendor/application', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const response = await fetch(`/api/vendor/application/${user.id}`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch application');
      }
      return response.json();
    },
    enabled: !!user?.id
  });

  const [form, setForm] = useState<ServiceForm>({
    title: '',
    category: 'Services',
    description: '',
    price: '',
    serviceType: 'one-time',
    deliveryTime: '1-3 days',
    location: '',
    image1: null,
    image2: null,
    image3: null
  });

  const createServiceMutation = useMutation({
    mutationFn: async (serviceData: any) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
      });

      if (!response.ok) {
        throw new Error('Failed to create service listing');
      }

      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/vendor', user?.id] });

      localStorage.setItem('service_added', 'true');
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'service_added',
        newValue: 'true'
      }));

      setTimeout(() => setLocation('/professional-services'), 2000);
    },
    onError: (error) => {
      console.error('Error creating service:', error);
      alert('Failed to create service listing. Please try again.');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, [fieldName]: file }));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.price || !form.location) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      let imageUrl = null;
      if (form.image1) {
        const base64 = await fileToBase64(form.image1);
        imageUrl = `data:${form.image1.type};base64,${base64}`;
      }

      const serviceData = {
        vendorId: user?.id || 1,
        title: form.title,
        category: 'Services',
        price: form.price,
        description: `${form.description}\n\nService Type: ${form.serviceType}\nDelivery Time: ${form.deliveryTime}`,
        location: form.location,
        imageUrls: imageUrl ? [imageUrl] : []
      };

      createServiceMutation.mutate(serviceData);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const isVerified = vendorApplication?.status === "Basic Verified" || vendorApplication?.status === "Premium Verified";

  if (!user || !isVerified) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-900 mb-2">Access Denied</h2>
          <p className="text-red-700 mb-4">
            You must be a verified vendor to list services on ProList.
          </p>
          <div className="space-y-2">
            {!vendorApplication ? (
              <a
                href="/vendor-register"
                className="inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Apply for Vendor Verification
              </a>
            ) : vendorApplication.status === 'Pending Basic Verification' ? (
              <p className="text-red-600 text-sm">
                Your application is under review. You'll be notified when approved.
              </p>
            ) : (
              <p className="text-red-600 text-sm">
                Your application was not approved. Please contact support or reapply.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service Listed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your service is now available on the Professional Services section and customers can find and book it.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setLocation('/professional-services')}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              View Services
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  title: '',
                  category: 'Services',
                  description: '',
                  price: '',
                  serviceType: 'one-time',
                  deliveryTime: '1-3 days',
                  location: '',
                  image1: null,
                  image2: null,
                  image3: null
                });
              }}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add Another Service
            </button>
          </div>
        </div>
      </div>
    );
  }

  const serviceCategories = [
    { value: 'Web Development', label: 'Web Development' },
    { value: 'Mobile Development', label: 'Mobile Development' },
    { value: 'Graphic Design', label: 'Graphic Design' },
    { value: 'Digital Marketing', label: 'Digital Marketing' },
    { value: 'Content Writing', label: 'Content Writing' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Video Editing', label: 'Video Editing' },
    { value: 'Translation', label: 'Translation' },
    { value: 'Tutoring', label: 'Tutoring' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Legal Services', label: 'Legal Services' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Home Repair', label: 'Home Repair' },
    { value: 'Cleaning', label: 'Cleaning Services' },
    { value: 'Event Planning', label: 'Event Planning' }
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="text-purple-600" size={32} />
        <div>
          <h2 className="text-3xl font-bold text-purple-600">List Your Service</h2>
          <p className="text-gray-600">Offer your professional services to customers in Bamenda</p>
        </div>
      </div>

      {/* Verification Status Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-green-600" size={20} />
          <div>
            <h3 className="font-semibold text-green-900">Verified Service Provider</h3>
            <p className="text-green-700 text-sm">
              You have {vendorApplication?.status} status and can offer services on ProList.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Professional Website Development"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          >
            <option value="Services">Professional Services</option>
            {serviceCategories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
          <select
            name="serviceType"
            value={form.serviceType}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="one-time">One-time Service</option>
            <option value="ongoing">Ongoing Service</option>
            <option value="subscription">Subscription Based</option>
            <option value="hourly">Hourly Rate</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Clock className="inline w-4 h-4 mr-1" />
            Delivery Time
          </label>
          <select
            name="deliveryTime"
            value={form.deliveryTime}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="24 hours">24 hours</option>
            <option value="1-3 days">1-3 days</option>
            <option value="3-7 days">3-7 days</option>
            <option value="1-2 weeks">1-2 weeks</option>
            <option value="2-4 weeks">2-4 weeks</option>
            <option value="1+ months">1+ months</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Service Location *
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g., Bamenda, Remote, Client Location"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your service in detail. What do you offer? What makes your service unique?"
            rows={5}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline w-4 h-4 mr-1" />
            Price (XAF) *
          </label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter service price in CFA francs"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Set a competitive price for your service. You can adjust this later.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Image size={20} />
            Service Images
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Service Image</label>
            <div className="border-2 border-dashed border-gray-300 hover:border-purple-400 rounded-lg p-6 text-center transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'image1')}
                className="hidden"
                id="image1-upload"
              />
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-3">Upload a professional image showcasing your service</p>
              <label htmlFor="image1-upload" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
                Choose from Device
              </label>
              {form.image1 && (
                <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-700">
                  ✓ {form.image1.name}
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={createServiceMutation.isPending}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createServiceMutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Service Listing...
            </div>
          ) : (
            'List Your Service'
          )}
        </button>
      </form>
    </div>
  );
}