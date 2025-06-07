import { useState, useRef, useEffect } from 'react';
import { Send, X, User, Clock, CheckCheck, Phone, Video, MoreVertical, Paperclip, Smile, Image } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isBuyer: boolean;
  delivered?: boolean;
  read?: boolean;
}

interface ChatBoxProps {
  vendorName: string;
  vendorId?: number;
  productTitle?: string;
  buyerName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBox({ vendorName, vendorId, productTitle, buyerName = 'You', isOpen, onClose }: ChatBoxProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: vendorName,
      text: `Hello! Welcome to my shop. I see you're interested in ${productTitle || 'my products'}. How can I assist you today?`,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isBuyer: false,
      delivered: true,
      read: true
    },
    {
      id: '2',
      sender: vendorName,
      text: 'Feel free to ask about pricing, availability, delivery options, or any specifications you need.',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isBuyer: false,
      delivered: true,
      read: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: buyerName,
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isBuyer: true,
      delivered: false,
      read: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, delivered: true } : msg
      ));
    }, 500);

    // Simulate vendor reading the message
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, read: true } : msg
      ));
    }, 1000);

    // Simulate vendor typing and response
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        const vendorResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: vendorName,
          text: getIntelligentResponse(newMessage.text),
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          isBuyer: false,
          delivered: true,
          read: true
        };
        
        setMessages(prev => [...prev, vendorResponse]);
      }, 1500 + Math.random() * 1000);
    }, 1200);
  };

  const getIntelligentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
      return `Great question! For ${productTitle || 'this item'}, the price includes quality guarantee and fast delivery. I can offer competitive pricing - let me know if you'd like a detailed quote.`;
    }
    if (message.includes('available') || message.includes('stock') || message.includes('in stock')) {
      return `Yes, this item is currently available! I maintain good stock levels and can usually fulfill orders within 1-2 days.`;
    }
    if (message.includes('delivery') || message.includes('shipping') || message.includes('transport')) {
      return `I offer flexible delivery options across Bamenda. Local delivery is usually same-day or next-day. Would you like me to check delivery options for your location?`;
    }
    if (message.includes('quality') || message.includes('condition') || message.includes('warranty')) {
      return `I take pride in offering high-quality products. All items come with quality assurance, and I stand behind everything I sell. Customer satisfaction is my priority!`;
    }
    if (message.includes('meet') || message.includes('visit') || message.includes('location')) {
      return `Absolutely! I'm located in Bamenda and welcome customers to visit my shop. We can arrange a convenient time for you to see the products in person.`;
    }
    if (message.includes('thank') || message.includes('thanks')) {
      return `You're very welcome! I'm here to help and ensure you have a great experience. Feel free to ask if you need anything else!`;
    }
    
    const responses = [
      `Thank you for your interest in ${productTitle || 'my products'}! I'd be happy to help with any questions you have.`,
      'I appreciate you reaching out! Let me provide you with the best service possible.',
      'That\'s a great question! I have good experience with this and can definitely assist you.',
      'I understand what you\'re looking for. Let me give you all the details you need.',
      'Thanks for your message! I\'m committed to providing excellent customer service.',
      'I\'m glad you\'re interested! Quality and customer satisfaction are my top priorities.'
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden">
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
                <span>{isOnline ? 'Online' : 'Last seen recently'}</span>
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
            <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200">
              <MoreVertical size={16} />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBuyer ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                  message.isBuyer
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                    : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold ${
                    message.isBuyer ? 'text-blue-100' : 'text-gray-600'
                  }`}>
                    {message.sender}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock size={10} className={message.isBuyer ? 'text-blue-200' : 'text-gray-400'} />
                    <span className={`text-xs ${
                      message.isBuyer ? 'text-blue-200' : 'text-gray-400'
                    }`}>
                      {message.time}
                    </span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-1">{message.text}</p>
                {message.isBuyer && (
                  <div className="flex items-center justify-end gap-1 mt-1">
                    {message.read ? (
                      <CheckCheck size={12} className="text-blue-200" />
                    ) : message.delivered ? (
                      <CheckCheck size={12} className="text-blue-300 opacity-50" />
                    ) : (
                      <Clock size={12} className="text-blue-300 opacity-50" />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-bl-md border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600">{vendorName}</span>
                  <span className="text-xs text-gray-400">is typing</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setInput("What's the price for this item?")}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors whitespace-nowrap"
            >
              Ask Price
            </button>
            <button
              onClick={() => setInput("Is this item available?")}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-green-200 transition-colors whitespace-nowrap"
            >
              Check Availability
            </button>
            <button
              onClick={() => setInput("What are the delivery options?")}
              className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors whitespace-nowrap"
            >
              Delivery Info
            </button>
            <button
              onClick={() => setInput("Can we meet in person?")}
              className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-orange-200 transition-colors whitespace-nowrap"
            >
              Meet in Person
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-white">
          <div className="flex items-end gap-3">
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Paperclip size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Image size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                <Smile size={18} />
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 resize-none border border-gray-300 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder={`Message ${vendorName}...`}
              rows={1}
              style={{
                minHeight: '44px',
                maxHeight: '100px'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <Send size={18} />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Press Enter to send</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              Secure Chat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}