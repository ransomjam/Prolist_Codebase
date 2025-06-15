import { useState, useEffect } from 'react';
import { MessageCircle, Search, Users, Clock, CheckCheck, X } from 'lucide-react';
import RealChatBox from './RealChatBox';
import { useAuth } from '../hooks/useAuth';

interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  avatar?: string;
  productTitle?: string;
  userId?: number;
}

interface ChatListProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatList({ isOpen, onClose }: ChatListProps) {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<ChatContact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<ChatContact[]>([
    {
      id: 'support',
      name: 'ProList Support',
      lastMessage: 'Hello! How can we help you today?',
      timestamp: 'Always available',
      unreadCount: 0,
      isOnline: true,
      productTitle: 'Customer Support',
      userId: 0
    }
  ]);

  const filteredConversations = conversations.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.productTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalUnreadCount = conversations.reduce((sum, chat) => sum + chat.unreadCount, 0);

  const handleChatSelect = (chat: ChatContact) => {
    setActiveChat(chat);
    // Mark messages as read
    setConversations(prev => 
      prev.map(c => 
        c.id === chat.id ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  const closeChatBox = () => {
    setActiveChat(null);
  };

  if (!isOpen && !activeChat) return null;

  return (
    <>
      {/* Chat List Modal */}
      {isOpen && !activeChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="chat-container bg-white rounded-3xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Messages</h3>
                  <div className="text-sm opacity-90">
                    {totalUnreadCount > 0 ? `${totalUnreadCount} unread` : 'All caught up'}
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
              >
                <X size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <MessageCircle size={48} className="mb-4 opacity-50" />
                  <p className="text-lg font-medium">No conversations found</p>
                  <p className="text-sm">Start chatting with vendors about their products</p>
                </div>
              ) : (
                filteredConversations.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => handleChatSelect(chat)}
                    className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {chat.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </div>
                        {chat.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-gray-900 truncate">{chat.name}</h4>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-500">{chat.timestamp}</span>
                            {chat.unreadCount > 0 && (
                              <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                {chat.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                        {chat.productTitle && (
                          <div className="text-xs text-blue-600 font-medium mb-1">
                            About: {chat.productTitle}
                          </div>
                        )}
                        <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                  New Chat
                </button>
                <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium hover:bg-gray-300 transition-colors">
                  <Users size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Chat */}
      {activeChat && (
        <RealChatBox
          vendorName={activeChat.name}
          vendorId={activeChat.userId || 0}
          productTitle={activeChat.productTitle}
          buyerName={user?.username || 'You'}
          isOpen={true}
          onClose={closeChatBox}
        />
      )}
    </>
  );
}