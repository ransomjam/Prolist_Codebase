import { useState } from 'react';
import { Share2, Facebook, Twitter, MessageCircle, Copy, Check } from 'lucide-react';

interface ShareButtonProps {
  product: {
    id: number;
    title: string;
    price: string;
    description?: string;
  };
  className?: string;
}

export default function ShareButton({ product, className = "" }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const productUrl = `${window.location.origin}/product/${product.id}`;
  const shareText = `Check out this amazing product: ${product.title} - ${product.price} XAF on ProList Marketplace`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}`
  };

  const handleShare = (platform: string) => {
    window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = productUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: shareText,
          url: productUrl,
        });
        setIsOpen(false);
      } catch (err) {
        // User cancelled the share or share failed
        console.log('Share cancelled');
      }
    }
  };

  const isNativeShareSupported = typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'share' in navigator;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Share2 size={18} />
        Share
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Share Menu */}
          <div className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 min-w-[280px]">
            <h4 className="font-semibold text-gray-900 mb-3">Share this product</h4>
            
            <div className="space-y-2">
              {/* Native Share (Mobile) */}
              {isNativeShareSupported && (
                <button
                  onClick={handleNativeShare}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Share2 size={20} className="text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">Share via...</span>
                </button>
              )}

              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Facebook size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Facebook</span>
              </button>

              {/* Twitter */}
              <button
                onClick={() => handleShare('twitter')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-sky-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                  <Twitter size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Twitter</span>
              </button>

              {/* Telegram */}
              <button
                onClick={() => handleShare('telegram')}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Telegram</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                  {copied ? (
                    <Check size={20} className="text-white" />
                  ) : (
                    <Copy size={20} className="text-white" />
                  )}
                </div>
                <span className="font-medium text-gray-900">
                  {copied ? 'Link copied!' : 'Copy link'}
                </span>
              </button>
            </div>

            {/* Preview URL */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 break-all">{productUrl}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}