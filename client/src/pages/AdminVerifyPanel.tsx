import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Shield, CheckCircle, XCircle, Phone, MapPin, Calendar, Eye } from 'lucide-react';

interface VendorApplication {
  id: number;
  fullName: string;
  phone: string;
  location: string;
  businessName: string;
  verificationSlot: string;
  status: string;
  submittedAt: string;
  idCardUrl?: string;
  shopPhotoUrl?: string;
}

export default function AdminVerifyPanel() {
  const queryClient = useQueryClient();
  const [imageError, setImageError] = useState<{[key: string]: boolean}>({});

  // Fetch vendor applications from backend
  const { data: vendorApplications = [], isLoading } = useQuery({
    queryKey: ['/api/vendor/applications'],
    queryFn: async () => {
      const response = await fetch('/api/vendor/applications');
      if (!response.ok) {
        throw new Error('Failed to fetch vendor applications');
      }
      return response.json();
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/vendor/applications/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update vendor status');
      }
      
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['/api/vendor/applications'] });
      
      // Show success message
      const statusText = variables.status === 'Basic Verified' ? 'approved' : 'rejected';
      alert(`Vendor application ${statusText} successfully! User has been notified.`);
    },
    onError: (error) => {
      console.error('Error updating vendor status:', error);
      alert('Failed to update vendor status. Please try again.');
    }
  });

  const handleApprove = (vendor: VendorApplication) => {
    if (confirm(`Are you sure you want to APPROVE ${vendor.fullName}'s vendor application for "${vendor.businessName}"?\n\nThis will grant them verified vendor status and allow them to list products.`)) {
      updateStatusMutation.mutate({ id: vendor.id, status: 'Basic Verified' });
    }
  };

  const handleReject = (vendor: VendorApplication) => {
    if (confirm(`Are you sure you want to REJECT ${vendor.fullName}'s vendor application for "${vendor.businessName}"?\n\nThis action cannot be undone and they will need to reapply.`)) {
      updateStatusMutation.mutate({ id: vendor.id, status: 'Rejected' });
    }
  };

  const handleImageError = (imageKey: string) => {
    setImageError(prev => ({ ...prev, [imageKey]: true }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-blue-600" size={32} />
        <h2 className="text-3xl font-bold text-blue-600">Admin – Vendor Verifications</h2>
      </div>

      {vendorApplications.length === 0 && (
        <div className="text-center py-12">
          <Eye size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-600">No applications yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendorApplications.map((vendor: VendorApplication) => (
          <div
            key={vendor.id}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-300"
          >
            <div className="mb-4">
              <h3 className="text-xl font-bold text-blue-600 mb-1">{vendor.fullName}</h3>
              <p className="text-lg font-semibold text-gray-800 mb-3">{vendor.businessName}</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-blue-500" />
                  {vendor.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-green-500" />
                  {vendor.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-purple-500" />
                  {new Date(vendor.verificationSlot).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="my-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">ID Card</label>
                {vendor.idCardUrl && !imageError[`id-${vendor.id}`] ? (
                  <img
                    src={vendor.idCardUrl}
                    alt="ID Card"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    onError={() => handleImageError(`id-${vendor.id}`)}
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">ID Card Image</span>
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Shop/Product Photo</label>
                {vendor.shopPhotoUrl && !imageError[`shop-${vendor.id}`] ? (
                  <img
                    src={vendor.shopPhotoUrl}
                    alt="Shop/Product"
                    className="w-full h-32 object-cover rounded-lg border border-gray-200"
                    onError={() => handleImageError(`shop-${vendor.id}`)}
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Shop Photo</span>
                  </div>
                )}
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                vendor.status === 'Basic Verified'
                  ? 'bg-green-100 text-green-800'
                  : vendor.status === 'Rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                Status: {vendor.status}
              </span>
            </div>

            {/* Submitted Time */}
            <p className="text-xs text-gray-500 mb-4">
              Submitted: {new Date(vendor.submittedAt).toLocaleString()}
            </p>

            {/* Action Buttons */}
            {vendor.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(vendor)}
                  disabled={updateStatusMutation.isPending}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  {updateStatusMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <CheckCircle size={16} />
                  )}
                  {updateStatusMutation.isPending ? 'Processing...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleReject(vendor)}
                  disabled={updateStatusMutation.isPending}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                >
                  {updateStatusMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <XCircle size={16} />
                  )}
                  {updateStatusMutation.isPending ? 'Processing...' : 'Reject'}
                </button>
              </div>
            )}

            {/* Already processed */}
            {vendor.status !== 'pending' && (
              <div className={`text-center py-3 rounded-lg font-medium ${
                vendor.status === 'Basic Verified'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">
                    {vendor.status === 'Basic Verified' ? '✅' : '❌'}
                  </span>
                  <span className="font-semibold">
                    {vendor.status === 'Basic Verified' ? 'APPROVED' : 'REJECTED'}
                  </span>
                </div>
                <p className="text-xs mt-1 opacity-75">
                  Processed on {new Date(vendor.submittedAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}