import { useState, useRef, useEffect } from "react";
import { Bell, X, Check, CheckCheck } from "lucide-react";
import { useNotifications } from "../hooks/useNotifications";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications: notificationList, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification,
    requestNotificationPermission,
    isConnected
  } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Request notification permission on first click
  const handleBellClick = async () => {
    if (!isOpen) {
      await requestNotificationPermission();
    }
    setIsOpen(!isOpen);
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'bid_confirmed': return 'border-l-orange-500 bg-orange-50';
      case 'listing_reply': return 'border-l-blue-500 bg-blue-50';
      case 'account_verified': return 'border-l-green-500 bg-green-50';
      case 'auction_ending': return 'border-l-red-500 bg-red-50';
      case 'new_follower': return 'border-l-purple-500 bg-purple-50';
      case 'payment_received': return 'border-l-emerald-500 bg-emerald-50';
      case 'listing_featured': return 'border-l-yellow-500 bg-yellow-50';
      case 'new_bid': return 'border-l-orange-500 bg-orange-50';
      case 'message_reply': return 'border-l-blue-500 bg-blue-50';
      case 'auction_won': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleBellClick}
        className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-200"
      >
        <div className="relative">
          <Bell className="h-7 w-7" />
          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
          {isConnected && (
            <div className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Bell size={18} className="text-gray-600" />
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <CheckCheck size={14} />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {notificationList.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notificationList.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${getNotificationColor(notification.type)} ${
                    !notification.read ? 'bg-blue-50' : 'bg-white'
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <span className="text-lg">{notification.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-medium text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 ml-2">
                      {!notification.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-red-600"
                        title="Remove notification"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notificationList.length > 0 && (
            <div className="p-3 border-t border-gray-100 bg-gray-50">
              <button className="w-full text-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All Notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}