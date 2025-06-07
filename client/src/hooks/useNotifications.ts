import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
  data?: any;
}

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'new_bid',
      title: 'New Bid Received',
      message: 'Someone placed a bid of 45,000 FCFA on your iPhone 14 Pro Max',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
      actionUrl: '/auctions'
    },
    {
      id: '2',
      type: 'message_reply',
      title: 'New Message',
      message: 'Sarah Kimeng sent you a message about Nike Air Force',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false,
      actionUrl: '/chat'
    },
    {
      id: '3',
      type: 'account_verified',
      title: 'Account Verified',
      message: 'Your vendor account has been approved as Premium Verified',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      actionUrl: '/profile'
    },
    {
      id: '4',
      type: 'auction_ending',
      title: 'Auction Ending Soon',
      message: 'Your bid on MacBook Air M2 auction ends in 30 minutes',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRead: false,
      actionUrl: '/auctions'
    },
    {
      id: '5',
      type: 'payment_received',
      title: 'Payment Received',
      message: 'You received 25,000 FCFA for Samsung Galaxy S24',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      actionUrl: '/orders'
    }
  ]);
  
  const [isConnected, setIsConnected] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show browser notification if permission granted
    if (permissionGranted && 'Notification' in window) {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: newNotification.id
      });
    }
  }, [permissionGranted]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    );
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionGranted(permission === 'granted');
      return permission === 'granted';
    }
    return false;
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    if (!user) return;

    const simulateNotifications = () => {
      const notificationTypes = [
        {
          type: 'new_bid',
          title: 'New Bid Received',
          message: 'Someone placed a higher bid on your item',
          actionUrl: '/auctions'
        },
        {
          type: 'message_reply',
          title: 'New Message',
          message: 'You have a new message from a potential buyer',
          actionUrl: '/chat'
        },
        {
          type: 'listing_featured',
          title: 'Listing Featured',
          message: 'Your product has been featured on the homepage',
          actionUrl: '/marketplace'
        }
      ];

      // Randomly add notifications every 30-60 seconds for demo
      const interval = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance
          const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
          addNotification(randomNotification);
        }
      }, 45000);

      return () => clearInterval(interval);
    };

    const cleanup = simulateNotifications();
    return cleanup;
  }, [user, addNotification]);

  return {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    removeNotification,
    addNotification,
    requestNotificationPermission
  };
}