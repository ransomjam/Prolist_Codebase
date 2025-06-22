import { useState, useEffect, useRef } from 'react';
import { useAuth } from './useAuth';
import { useQueryClient } from '@tanstack/react-query';

export function useMessageNotifications() {
  const { user } = useAuth();
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id) return;

    // Fetch initial unread count
    const fetchUnreadCount = async () => {
      try {
        const response = await fetch(`/api/conversations/${user.id}`);
        const conversations = await response.json();
        // Count conversations with recent messages as unread
        const unreadCount = conversations.filter((conv: any) => 
          conv.lastMessage && new Date(conv.lastMessage.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length;
        setUnreadMessageCount(unreadCount);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

    fetchUnreadCount();

    // Connect to WebSocket for real-time updates
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: 'authenticate',
        userId: user.id
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'authenticated') {
        console.log('Message notifications WebSocket authenticated');
      } else if (data.type === 'new_message') {
        // Increment unread count when receiving a new message
        setUnreadMessageCount(prev => prev + 1);
        // Refresh conversations
        queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
      } else if (data.type === 'message_notification_update') {
        // Update unread count when receiving notification update
        if (data.hasNewMessages) {
          setUnreadMessageCount(prev => prev + 1);
        }
        // Refresh conversations
        queryClient.invalidateQueries({ queryKey: ['conversations', user.id] });
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('Message notifications WebSocket error:', error);
      setIsConnected(false);
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [user?.id, queryClient]);

  const markAllMessagesAsRead = () => {
    setUnreadMessageCount(0);
  };

  return {
    unreadMessageCount,
    isConnected,
    markAllMessagesAsRead
  };
}