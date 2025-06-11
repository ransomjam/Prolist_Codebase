import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../hooks/useAuth';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Shield, Building, Image, DollarSign, AlertCircle, CheckCircle, MapPin, Home, Square } from 'lucide-react';

interface RealEstateForm {
  title: string;
  category: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  description: string;
  price: string;
  listingType: string;
  location: string;
  amenities: string[];
  image1: File | null;
  image2: File | null;
  image3: File | null;
}

export default function RealEstateListingForm() {
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

  const [form, setForm] = useState<RealEstateForm>({
    title: '',
    category: 'Real Estate',
    propertyType: 'house',
    bedrooms: '1',
    bathrooms: '1',
    squareFootage: '',
    description: '',
    price: '',
    listingType: 'for-sale',
    location: '',
    amenities: [],
    image1: null,
    image2: null,
    image3: null
  });

  const createPropertyMutation = useMutation({
    mutationFn: async (propertyData: any) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        throw new Error('Failed to create property listing');
      }

      return response.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      queryClient.invalidateQueries({ queryKey: ['/api/products/vendor', user?.id] });

      localStorage.setItem('property_added', 'true');
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'property_added',
        newValue: 'true'
      }));

      setTimeout(() => setLocation('/real-estate'), 2000);
    },
    onError: (error) => {
      console.error('Error creating property:', error);
      alert('Failed to create property listing. Please try again.');
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
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

      const propertyDetails = [
        `Property Type: ${form.propertyType}`,
        `Bedrooms: ${form.bedrooms}`,
        `Bathrooms: ${form.bathrooms}`,
        form.squareFootage ? `Square Footage: ${form.squareFootage} sq ft` : '',
        `Listing Type: ${form.listingType}`,
        form.amenities.length > 0 ? `Amenities: ${form.amenities.join(', ')}` : '',
        '',
        form.description
      ].filter(Boolean).join('\n');

      const propertyData = {
        vendorId: user?.id || 1,
        title: form.title,
        category: 'Real Estate',
        price: form.price,
        description: propertyDetails,
        location: form.location,
        imageUrls: imageUrl ? [imageUrl] : []
      };

      createPropertyMutation.mutate(propertyData);
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
    }
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

  const isVerified = vendorApplication?.status === "Basic Verified" || vendorApplication?.status === "Premium Verified";

  if (!user || !isVerified) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-900 mb-2">Access Denied</h2>
          <p className="text-red-700 mb-4">
            You must be a verified vendor to list properties on ProList.
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Listed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your property is now live in the Real Estate section and potential buyers can discover it.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => setLocation('/real-estate')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Real Estate
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({
                  title: '',
                  category: 'Real Estate',
                  propertyType: 'house',
                  bedrooms: '1',
                  bathrooms: '1',
                  squareFootage: '',
                  description: '',
                  price: '',
                  listingType: 'for-sale',
                  location: '',
                  amenities: [],
                  image1: null,
                  image2: null,
                  image3: null
                });
              }}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add Another Property
            </button>
          </div>
        </div>
      </div>
    );
  }

  const propertyTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'land', label: 'Land' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'office', label: 'Office Space' },
    { value: 'warehouse', label: 'Warehouse' }
  ];

  const availableAmenities = [
    'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Balcony',
    'Air Conditioning', 'Furnished', 'Pet Friendly', 'Elevator', 'Laundry',
    'Internet', 'Generator', 'Water Tank', 'CCTV', 'Playground'
  ];

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Building className="text-blue-600" size={32} />
        <div>
          <h2 className="text-3xl font-bold text-blue-600">List Your Property</h2>
          <p className="text-gray-600">List your property for sale or rent in Bamenda</p>
        </div>
      </div>

      {/* Verification Status Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <Shield className="text-green-600" size={20} />
          <div>
            <h3 className="font-semibold text-green-900">Verified Real Estate Agent</h3>
            <p className="text-green-700 text-sm">
              You have {vendorApplication?.status} status and can list properties on ProList.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Title *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Beautiful 3-Bedroom House with Garden"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
            <select
              name="listingType"
              value={form.listingType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="for-sale">For Sale</option>
              <option value="for-rent">For Rent</option>
              <option value="lease">Lease</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Home className="inline w-4 h-4 mr-1" />
              Bedrooms
            </label>
            <select
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1,2,3,4,5,6,7,8].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
            <select
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {[1,2,3,4,5,6].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Square className="inline w-4 h-4 mr-1" />
              Square Feet
            </label>
            <input
              name="squareFootage"
              value={form.squareFootage}
              onChange={handleChange}
              placeholder="e.g., 1200"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Property Location *
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g., Mile 4, Bamenda"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <p className="text-xs text-gray-500 mt-1">
            {form.listingType === 'for-rent' ? 'Monthly rent amount' : 'Total selling price'}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
          <div className="grid grid-cols-2 gap-2">
            {availableAmenities.map(amenity => (
              <label key={amenity} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                <input
                  type="checkbox"
                  checked={form.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your property in detail. Highlight unique features, nearby amenities, and what makes it special."
            rows={5}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            <Image size={20} />
            Property Images
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Property Image</label>
            <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-lg p-6 text-center transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'image1')}
                className="hidden"
                id="image1-upload"
              />
              <Image className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-3">Upload high-quality property photos</p>
              <label htmlFor="image1-upload" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors">
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
          disabled={createPropertyMutation.isPending}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createPropertyMutation.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Property Listing...
            </div>
          ) : (
            'List Your Property'
          )}
        </button>
      </form>
    </div>
  );
}