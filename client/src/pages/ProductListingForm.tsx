import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Shield, Package, Image, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

interface ProductForm {
  title: string;
  category: string;
  description: string;
  price: string;
  image1: string;
  image2: string;
  image3: string;
}

export default function ProductListingForm() {
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

  const [form, setForm] = useState<ProductForm>({
    title: '',
    category: '',
    description: '',
    price: '',
    image1: '',
    image2: '',
    image3: ''
  });

  const createProductMutation = useMutation({
    mutationFn: async (productData: any) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create product listing');
      }
      
      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
    },
    onError: (error) => {
      console.error('Error creating product:', error);
      alert('Failed to create product listing. Please try again.');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.category || !form.description || !form.price) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = {
      vendorId: user?.id || 1,
      title: form.title,
      category: form.category,
      price: form.price,
      description: form.description,
      location: vendorApplication?.location || 'Bamenda'
    };

    createProductMutation.mutate(productData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is verified vendor
  const isVerified = vendorApplication?.status === "Basic Verified" || vendorApplication?.status === "Premium Verified";

  if (!user || !isVerified) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-900 mb-2">Access Denied</h2>
          <p className="text-red-700 mb-4">
            You must be a verified vendor to list products on ProList.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Listed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your product is now live on the ProList marketplace and can be found by customers.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setLocation('/marketplace')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Marketplace
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  title: '',
                  category: '',
                  description: '',
                  price: '',
                  image1: '',
                  image2: '',
                  image3: ''
                });
              }}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add Another Product
            </button>
          </div>
        </div>
      </div>
    );
  }

  const categories = [
    { value: 'shoes', label: 'Shoes' },
    { value: 'phones', label: 'Phones' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'food-beverages', label: 'Food & Beverages' },
    { value: 'arts-crafts', label: 'Arts & Crafts' },
    { value: 'services', label: 'Services' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'automotive', label: 'Automotive' }
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Package className="text-blue-600" size={32} />
        <h2 className="text-3xl font-bold text-blue-600">Add Product Listing</h2>
      </div>

      {/* Verification Status Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-green-600" size={20} />
          <div>
            <h3 className="font-semibold text-green-900">Verified Vendor</h3>
            <p className="text-green-700 text-sm">
              You have {vendorApplication?.status} status and can list products on ProList.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your product in detail..."
            rows={4}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
            placeholder="Enter price in CFA francs"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Image size={20} />
            Product Images
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL</label>
            <input
              name="image1"
              value={form.image1}
              onChange={handleChange}
              placeholder="https://example.com/image1.jpg"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Image URL 2</label>
            <input
              name="image2"
              value={form.image2}
              onChange={handleChange}
              placeholder="https://example.com/image2.jpg"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Image URL 3</label>
            <input
              name="image3"
              value={form.image3}
              onChange={handleChange}
              placeholder="https://example.com/image3.jpg"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <p className="text-xs text-gray-500">
            Upload your images to a cloud service (like Imgur, Cloudinary) and paste the URLs here.
          </p>
        </div>

        <button
          type="submit"
          disabled={createProductMutation.isPending}
          className="bg-gradient-to-r from-blue-500 to-emerald-400 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-emerald-500 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createProductMutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Listing...
            </div>
          ) : (
            'Add Product Listing'
          )}
        </button>
      </form>
    </div>
  );
}