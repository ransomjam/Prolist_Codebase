import { useState, useEffect, useRef } from 'react';
import { X, Send, Image, Phone, Video, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  productId?: number;
  content: string;
  messageType: string;
  imageUrl?: string;
  isRead: boolean;
  createdAt: string;
}

interface RealChatBoxProps {
  vendorName: string;
  vendorId: number;
  productTitle?: string;
  productId?: number;
  buyerName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RealChatBox({ 
  vendorName, 
  vendorId, 
  productTitle, 
  productId,
  buyerName = 'You', 
  isOpen, 
  onClose 
}: RealChatBoxProps) {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  // Fetch existing messages
  const { data: existingMessages } = useQuery({
    queryKey: ['messages', user?.id, vendorId, productId],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await fetch(`/api/messages/${user.id}/${vendorId}${productId ? `?productId=${productId}` : ''}`);
      return response.json();
    },
    enabled: !!user?.id && isOpen,
  });

  // WebSocket connection
  useEffect(() => {
    if (!isOpen || !user?.id) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsOnline(true);
      ws.send(JSON.stringify({
        type: 'authenticate',
        userId: user.id
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'authenticated') {
        console.log('WebSocket authenticated');
      } else if (data.type === 'new_message') {
        setMessages(prev => [...prev, data.message]);
        // Refresh notifications and conversations
        queryClient.invalidateQueries({ queryKey: ['notifications', user.id] });
        queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
      } else if (data.type === 'message_sent') {
        setMessages(prev => [...prev, data.message]);
        // Refresh conversations to update last message
        queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
      }
    };

    ws.onclose = () => {
      setIsOnline(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsOnline(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [isOpen, user?.id, queryClient]);

  // Load existing messages
  useEffect(() => {
    if (existingMessages) {
      setMessages(existingMessages);
    }
  }, [existingMessages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || !user?.id || !wsRef.current) return;

    const messageData = {
      type: 'send_message',
      receiverId: vendorId,
      productId: productId,
      content: input.trim(),
      messageType: 'text'
    };

    wsRef.current.send(JSON.stringify(messageData));
    setInput('');
  };

  const sendImageMessage = () => {
    if (!selectedImage || !imagePreview || !user?.id || !wsRef.current) return;

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;
      
      const messageData = {
        type: 'send_message',
        receiverId: vendorId,
        productId: productId,
        content: `Sent an image: ${selectedImage.name}`,
        messageType: 'image',
        imageUrl: base64Image
      };

      wsRef.current?.send(JSON.stringify(messageData));
      
      // Clear image selection
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    
    reader.readAsDataURL(selectedImage);
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="chat-container bg-white rounded-3xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{vendorName}</h3>
              <div className="flex items-center gap-1 text-sm opacity-90">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              {productTitle && (
                <div className="text-xs opacity-75 mt-1">
                  About: {productTitle}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
              <Phone size={16} />
            </button>
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
              <Video size={16} />
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                message.senderId === user?.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {message.messageType === 'image' && message.imageUrl ? (
                  <div className="space-y-2">
                    <img 
                      src={message.imageUrl} 
                      alt="Shared image" 
                      className="max-w-full h-auto rounded-lg"
                    />
                    <p className="text-sm">{message.content}</p>
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
                <div className={`text-xs mt-1 ${message.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'}`}>
                  {new Date(message.createdAt).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-2 max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
              >
                <X size={12} />
              </button>
            </div>
            <button
              onClick={sendImageMessage}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Send Image
            </button>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
            >
              <Image size={18} />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
            >
              <Send size={18} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}