import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Shield, CheckCircle, XCircle, Calendar, Phone, MapPin, Eye } from 'lucide-react';

interface VendorApplication {
  id: number;
  fullName: string;
  phone: string;
  location: string;
  businessName: string;
  verificationSlot: string;
  status: string;
  submittedAt: string;
  adminNotes?: string;
}

export default function AdminPanel() {
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState<VendorApplication | null>(null);
  const [adminNotes, setAdminNotes] = useState('');

  // Fetch vendor applications
  const { data: applications = [], isLoading } = useQuery({
    queryKey: ['/api/vendor/applications'],
    queryFn: async () => {
      // In real app, this would fetch from the API
      // For now, simulate with localStorage or return mock data
      const mockApplications: VendorApplication[] = [
        {
          id: 1,
          fullName: "Mbah Coffee Farms",
          phone: "+237 675 123 456",
          location: "Main Market, Bamenda",
          businessName: "Mbah Coffee Farms",
          verificationSlot: "2025-06-02T09:00",
          status: "pending",
          submittedAt: "2025-05-31T10:30:00Z"
        },
        {
          id: 2,
          fullName: "Grace Produce Store",
          phone: "+237 698 765 432",
          location: "Food Market, Bamenda",
          businessName: "Grace Produce Store",
          verificationSlot: "2025-06-02T14:00",
          status: "pending",
          submittedAt: "2025-05-31T14:15:00Z"
        }
      ];
      return mockApplications;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: number; status: string; notes?: string }) => {
      // In real app, this would call the API
      console.log('Admin action:', { id, status, notes, timestamp: new Date().toISOString() });
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/vendor/applications'] });
      setSelectedApp(null);
      setAdminNotes('');
    }
  });

  const handleApprove = (app: VendorApplication) => {
    updateStatusMutation.mutate({
      id: app.id,
      status: 'basic_verified',
      notes: adminNotes || 'Application approved - Basic verification granted'
    });
  };

  const handleReject = (app: VendorApplication) => {
    updateStatusMutation.mutate({
      id: app.id,
      status: 'rejected',
      notes: adminNotes || 'Application rejected - Please resubmit with correct documents'
    });
  };

  const handleScheduleVideo = (app: VendorApplication) => {
    updateStatusMutation.mutate({
      id: app.id,
      status: 'video_scheduled',
      notes: `Video verification scheduled for ${new Date(app.verificationSlot).toLocaleString()}`
    });
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel - Vendor Verification</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Applications List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Pending Applications ({applications.filter(app => app.status === 'pending').length})
            </h2>

            <div className="space-y-4">
              {applications.map(app => (
                <div 
                  key={app.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedApp?.id === app.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedApp(app)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{app.fullName}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : app.status === 'basic_verified'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {app.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      {app.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      {app.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      Video call: {new Date(app.verificationSlot).toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-2">
                    Submitted: {new Date(app.submittedAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Details & Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {selectedApp ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Application</h2>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                    <p className="text-gray-900">{selectedApp.businessName}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Information</label>
                    <p className="text-gray-900">{selectedApp.fullName}</p>
                    <p className="text-gray-600">{selectedApp.phone}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <p className="text-gray-900">{selectedApp.location}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Verification Appointment</label>
                    <p className="text-gray-900">{new Date(selectedApp.verificationSlot).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about this application..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(selectedApp)}
                    disabled={updateStatusMutation.isPending}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} />
                    Approve & Grant Basic Verification
                  </button>
                  
                  <button
                    onClick={() => handleScheduleVideo(selectedApp)}
                    disabled={updateStatusMutation.isPending}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar size={18} />
                    Schedule Video Call
                  </button>
                  
                  <button
                    onClick={() => handleReject(selectedApp)}
                    disabled={updateStatusMutation.isPending}
                    className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                  >
                    <XCircle size={18} />
                    Reject Application
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Eye size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Select an application to review</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}