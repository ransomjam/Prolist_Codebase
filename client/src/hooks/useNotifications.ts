
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`/api/notifications/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        const formattedNotifications = data.map((n: any) => ({
          id: n.id.toString(),
          type: n.type,
          title: n.title,
          message: n.message,
          timestamp: new Date(n.createdAt),
          isRead: n.isRead,
          actionUrl: n.actionUrl,
          data: n.data
        }));
        setNotifications(formattedNotifications);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
      setIsConnected(false);
    }
  }, [user?.id]);

  const addNotification = useCallback(async (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    if (!user?.id) return;

    try {
      const response = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          ...notification
        })
      });

      if (response.ok) {
        await fetchNotifications(); // Refresh notifications
        
        // Show browser notification if permission granted
        if (permissionGranted && 'Notification' in window) {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/favicon.ico',
          });
        }
      }
    } catch (error) {
      console.error('Failed to create notification:', error);
    }
  }, [user?.id, permissionGranted, fetchNotifications]);

  const markAsRead = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => n.id === id ? { ...n, isRead: true } : n)
        );
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(`/api/notifications/${user.id}/mark-all-read`, {
        method: 'PATCH'
      });
      
      if (response.ok) {
        setNotifications(prev => 
          prev.map(n => ({ ...n, isRead: true }))
        );
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  }, [user?.id]);

  const removeNotification = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setPermissionGranted(permission === 'granted');
      return permission === 'granted';
    }
    return false;
  }, []);

  // Fetch notifications when user changes
  useEffect(() => {
    if (user?.id) {
      fetchNotifications();
    } else {
      setNotifications([]);
    }
  }, [user?.id, fetchNotifications]);

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    if (!user?.id) return;

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, [user?.id, fetchNotifications]);

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
