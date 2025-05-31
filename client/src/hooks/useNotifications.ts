import { useState, useEffect, useCallback } from 'react';
import { notifications as initialNotifications } from '../data/demoData';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  // Connect to WebSocket for real-time notifications
  useEffect(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log('Connected to notification service');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'new_notification') {
          addNotification(data.notification);
        }
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from notification service');
      setSocket(null);
      // Attempt to reconnect after 3 seconds
      setTimeout(() => {
        if (document.visibilityState === 'visible') {
          // Recursively call useEffect to reconnect
        }
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const addNotification = useCallback((newNotification: Omit<Notification, 'id'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now() + Math.random(),
    };
    
    setNotifications(prev => [notification, ...prev]);
    
    // Show browser notification if permission granted
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id.toString(),
      });
    }
  }, []);

  const markAsRead = useCallback((id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  }, []);

  // Simulate real-time notifications for demo purposes
  useEffect(() => {
    const demoNotifications = [
      {
        type: "new_bid",
        title: "New Bid Received",
        message: "Someone bid 280,000 FCFA on your iPhone 13 Pro",
        time: "Just now",
        read: false,
        icon: "🔥"
      },
      {
        type: "message_reply",
        title: "New Message",
        message: "Buyer interested in your Samsung TV - check messages",
        time: "Just now",
        read: false,
        icon: "💬"
      },
      {
        type: "auction_won",
        title: "Auction Won!",
        message: "Congratulations! You won the Nike Air Jordan auction",
        time: "Just now",
        read: false,
        icon: "🎉"
      }
    ];

    let notificationIndex = 0;
    const interval = setInterval(() => {
      if (notificationIndex < demoNotifications.length) {
        addNotification(demoNotifications[notificationIndex]);
        notificationIndex++;
      } else {
        clearInterval(interval);
      }
    }, 15000); // Add a new notification every 15 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    requestNotificationPermission,
    addNotification,
    isConnected: socket?.readyState === WebSocket.OPEN,
  };
}