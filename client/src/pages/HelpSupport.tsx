import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Heart, Send, Mail, Phone, MapPin, MessageCircle, AlertCircle, HelpCircle, Bug } from 'lucide-react';

interface SupportForm {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  priority: string;
}

export default function HelpSupport() {
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [form, setForm] = useState<SupportForm>({
    name: user?.username || '',
    email: '',
    category: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/support/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setForm({
          name: user?.username || '',
          email: '',
          category: '',
          subject: '',
          message: '',
          priority: 'medium'
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting support request:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const supportCategories = [
    { value: 'technical', label: 'Technical Issue', icon: Bug },
    { value: 'account', label: 'Account Help', icon: HelpCircle },
    { value: 'billing', label: 'Billing Question', icon: AlertCircle },
    { value: 'verification', label: 'Verification Support', icon: MessageCircle },
    { value: 'feedback', label: 'Feedback & Suggestions', icon: Heart },
    { value: 'other', label: 'Other', icon: MessageCircle }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Heart className="text-red-500" size={28} />
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact ProList</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">support@prolist.cm</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="text-green-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">+237 6XX XXX XXX</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="text-red-600 mt-1" size={20} />
                <div>
                  <p className="font-medium text-gray-900">Office</p>
                  <p className="text-gray-600">Commercial Avenue<br />Bamenda, Northwest Region</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Quick Help</h3>
            <div className="space-y-2">
              <a href="#" className="block text-blue-700 hover:text-blue-900 text-sm">How to verify my business?</a>
              <a href="#" className="block text-blue-700 hover:text-blue-900 text-sm">Post my first listing</a>
              <a href="#" className="block text-blue-700 hover:text-blue-900 text-sm">Account security tips</a>
              <a href="#" className="block text-blue-700 hover:text-blue-900 text-sm">Privacy settings guide</a>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send us a message</h2>
            
            {submitStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-center gap-2">
                  <MessageCircle size={18} />
                  <span className="font-medium">Message sent successfully!</span>
                </div>
                <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} />
                  <span className="font-medium">Failed to send message</span>
                </div>
                <p className="text-sm mt-1">Please try again or contact us directly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {supportCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Need assistance</option>
                    <option value="high">High - Urgent issue</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please provide detailed information about your issue or question..."
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-600">
                  We typically respond within 24 hours
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}