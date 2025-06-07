import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import ChatBox from './ChatBox';
import { useAuth } from '../hooks/useAuth';

interface ProductChatButtonProps {
  vendorName: string;
  vendorId?: number;
  productTitle: string;
  productId?: string;
  className?: string;
}

export default function ProductChatButton({ 
  vendorName, 
  vendorId, 
  productTitle, 
  productId,
  className = "" 
}: ProductChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useAuth();

  const handleChatOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsChatOpen(true);
  };

  return (
    <>
      <button
        onClick={handleChatOpen}
        className={`flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 ${className}`}
      >
        <MessageCircle size={16} />
        <span className="text-sm font-medium">Chat</span>
      </button>

      {isChatOpen && (
        <ChatBox
          vendorName={vendorName}
          vendorId={vendorId}
          productTitle={productTitle}
          buyerName={user?.firstName || user?.username || 'You'}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </>
  );
}