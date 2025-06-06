import { useState, useRef, useEffect } from 'react';
import { Send, X, User, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  text: string;
  time: string;
  isBuyer: boolean;
}

interface ChatBoxProps {
  vendorName: string;
  buyerName?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatBox({ vendorName, buyerName = 'You', isOpen, onClose }: ChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: vendorName,
      text: 'Welcome! How can I help you today? I\'m here to answer any questions about my products and services.',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isBuyer: false
    },
    {
      id: '2',
      sender: vendorName,
      text: 'Feel free to ask about pricing, availability, or any specific requirements you might have.',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isBuyer: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: buyerName,
      text: input.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isBuyer: true
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate vendor typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        'Thank you for your interest! Let me check that for you.',
        'I\'d be happy to help with that. Could you provide more details?',
        'That\'s a great question! I have that item available.',
        'Yes, I can definitely assist you with that. When would you like to visit?',
        'I appreciate your message. Let me get back to you with the details.',
        'Absolutely! I have experience with that. Would you like to schedule a consultation?'
      ];
      
      const vendorResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: vendorName,
        text: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        isBuyer: false
      };
      
      setMessages(prev => [...prev, vendorResponse]);
    }, 2000 + Math.random() * 2000); // Random delay between 2-4 seconds
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
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Online</span>
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
                <p className="text-sm leading-relaxed">{message.text}</p>
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

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex gap-3">
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