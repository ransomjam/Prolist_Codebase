import { useState } from 'react';
import { MessageCircle, User, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import RealChatBox from './RealChatBox';
import ChatList from './ChatList';

export default function MessagingDemo() {
  const { user } = useAuth();
  const [showChatAsVendor, setShowChatAsVendor] = useState(false);
  const [showChatAsBuyer, setShowChatAsBuyer] = useState(false);
  const [showChatList, setShowChatList] = useState(false);

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Real-Time Messaging Demo</h3>
        <p className="text-gray-600">Please log in to test the messaging functionality.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <MessageCircle className="text-blue-600" />
        Real-Time Messaging Demo
      </h3>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">Current User: {user.username}</h4>
          <p className="text-blue-700 text-sm">
            You can test messaging functionality by opening multiple browser tabs or using different browsers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowChatList(true)}
            className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Users size={20} />
            <span>View All Chats</span>
          </button>

          <button
            onClick={() => setShowChatAsVendor(true)}
            className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <User size={20} />
            <span>Chat as Vendor</span>
          </button>

          <button
            onClick={() => setShowChatAsBuyer(true)}
            className="flex items-center justify-center gap-2 p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={20} />
            <span>Chat as Buyer</span>
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-2">How to Test:</h5>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Open the chat interface using one of the buttons above</li>
            <li>Send a message</li>
            <li>Open another browser tab/window and log in as a different user</li>
            <li>You'll see the message appear in real-time</li>
            <li>Both users can send and receive messages instantly</li>
          </ol>
        </div>
      </div>

      {/* Chat Components */}
      {showChatList && (
        <ChatList
          isOpen={showChatList}
          onClose={() => setShowChatList(false)}
        />
      )}

      {showChatAsVendor && (
        <RealChatBox
          vendorName="Test Buyer"
          vendorId={user.id === 1 ? 2 : 1} // Chat with the other test user
          productTitle="Event Flyers"
          productId={1}
          isOpen={showChatAsVendor}
          onClose={() => setShowChatAsVendor(false)}
        />
      )}

      {showChatAsBuyer && (
        <RealChatBox
          vendorName="Test Vendor"
          vendorId={user.id === 2 ? 1 : 2} // Chat with the other test user
          productTitle="Event Flyers"
          productId={1}
          isOpen={showChatAsBuyer}
          onClose={() => setShowChatAsBuyer(false)}
        />
      )}
    </div>
  );
}