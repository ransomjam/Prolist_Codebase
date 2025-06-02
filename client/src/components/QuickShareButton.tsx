import { Share2 } from 'lucide-react';

interface QuickShareButtonProps {
  product: {
    id: number;
    title: string;
    price: string;
  };
  className?: string;
}

export default function QuickShareButton({ product, className = "" }: QuickShareButtonProps) {
  const productUrl = `${window.location.origin}/product/${product.id}`;
  const shareText = `Check out this amazing product: ${product.title} - ${product.price} XAF on ProList Marketplace`;

  const handleQuickShare = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    // Try native share first (mobile)
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: shareText,
          url: productUrl,
        });
        return;
      } catch (err) {
        // Fall through to other options
      }
    }
    
    // Try WhatsApp (most popular in Cameroon)
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`;
    window.open(whatsappUrl, '_blank', 'width=600,height=400');
  };

  return (
    <button
      onClick={handleQuickShare}
      className={`p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors ${className}`}
      title="Share product"
    >
      <Share2 size={16} />
    </button>
  );
}