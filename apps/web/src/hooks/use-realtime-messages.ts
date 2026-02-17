"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSocket } from "@/components/socket/socket-provider";

interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  listingId: string | null;
  subject: string | null;
  body: string;
  read: boolean;
  delivered: boolean;
  createdAt: string;
  updatedAt: string;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface UseRealtimeMessagesOptions {
  conversationId: string;
  otherUserId: string;
  listingId?: string;
  initialMessages?: Message[];
}

interface UseRealtimeMessagesReturn {
  messages: Message[];
  isTyping: boolean;
  sendMessage: (body: string, tempId?: string) => Promise<{ success: boolean; error?: string }>;
  optimisticMessages: Map<string, OptimisticMessage>;
  messageStatuses: Map<string, MessageStatus>;
}

interface OptimisticMessage {
  id: string;
  body: string;
  createdAt: string;
  status: "sending" | "sent" | "error";
}

interface MessageStatus {
  status: "sent" | "delivered" | "read";
  timestamp?: string;
}

/**
 * Hook for managing real-time messages in a conversation.
 * Handles optimistic updates, message status tracking, and typing indicators.
 */
export function useRealtimeMessages({
  conversationId,
  otherUserId,
  listingId,
  initialMessages = [],
}: UseRealtimeMessagesOptions): UseRealtimeMessagesReturn {
  const {
    socket,
    isConnected,
    joinConversation,
    leaveConversation,
    sendMessage: sendSocketMessage,
  } = useSocket();

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<Map<string, OptimisticMessage>>(new Map());
  const [messageStatuses, setMessageStatuses] = useState<Map<string, MessageStatus>>(new Map());

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Join conversation room on mount
  useEffect(() => {
    if (!isConnected) return;

    joinConversation(conversationId, otherUserId, listingId);

    return () => {
      leaveConversation(conversationId);
    };
  }, [conversationId, otherUserId, listingId, isConnected, joinConversation, leaveConversation]);

  // Listen for new messages
  useEffect(() => {
    if (!socket) return;

    const handleMessageReceived = (payload: { message: Message; conversationId: string }) => {
      if (payload.conversationId !== conversationId) return;

      setMessages((prev) => {
        // Check if message already exists (optimistic update)
        const exists = prev.some((m) => m.id === payload.message.id);
        if (exists) {
          // Update the existing message (replace optimistic with real)
          return prev.map((m) => (m.id === payload.message.id ? payload.message : m));
        }
        // Add new message
        return [...prev, payload.message];
      });

      // Remove from optimistic messages if it was an optimistic update
      setOptimisticMessages((prev) => {
        const newMap = new Map(prev);
        // Find and remove by matching tempId if applicable
        Array.from(newMap.entries()).forEach(([key, value]) => {
          if (value.body === payload.message.body && value.status === "sending") {
            newMap.delete(key);
          }
        });
        return newMap;
      });

      // Set initial status
      setMessageStatuses((prev) => {
        const newMap = new Map(prev);
        newMap.set(payload.message.id, { status: "delivered" });
        return newMap;
      });
    };

    const handleMessageStatusUpdate = (payload: {
      messageId: string;
      status: "sent" | "delivered" | "read";
      timestamp: string;
    }) => {
      setMessageStatuses((prev) => {
        const newMap = new Map(prev);
        newMap.set(payload.messageId, {
          status: payload.status,
          timestamp: payload.timestamp,
        });
        return newMap;
      });
    };

    const handleMessagesRead = (payload: {
      readerId: string;
      conversationId: string;
      readAt: string;
    }) => {
      if (payload.conversationId !== conversationId) return;

      // Mark all messages from current user as read
      setMessageStatuses((prev) => {
        const newMap = new Map(prev);
        messages.forEach((msg) => {
          if (msg.senderId !== payload.readerId) {
            newMap.set(msg.id, { status: "read", timestamp: payload.readAt });
          }
        });
        return newMap;
      });
    };

    const handleTypingStart = (payload: { conversationId: string; userId: string }) => {
      if (payload.conversationId === conversationId && payload.userId === otherUserId) {
        setIsTyping(true);
      }
    };

    const handleTypingStop = (payload: { conversationId: string; userId: string }) => {
      if (payload.conversationId === conversationId && payload.userId === otherUserId) {
        setIsTyping(false);
      }
    };

    socket.on("message:received", handleMessageReceived);
    socket.on("message:status_update", handleMessageStatusUpdate);
    socket.on("messages:read", handleMessagesRead);
    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);

    return () => {
      socket.off("message:received", handleMessageReceived);
      socket.off("message:status_update", handleMessageStatusUpdate);
      socket.off("messages:read", handleMessagesRead);
      socket.off("typing:start", handleTypingStart);
      socket.off("typing:stop", handleTypingStop);
    };
  }, [socket, conversationId, otherUserId, messages]);

  // Send message with optimistic update
  const sendMessage = useCallback(
    async (body: string, tempId?: string): Promise<{ success: boolean; error?: string }> => {
      const optimisticId = tempId || `temp-${Date.now()}`;

      // Add optimistic message
      setOptimisticMessages((prev) => {
        const newMap = new Map(prev);
        newMap.set(optimisticId, {
          id: optimisticId,
          body,
          createdAt: new Date().toISOString(),
          status: "sending",
        });
        return newMap;
      });

      const result = await sendSocketMessage(otherUserId, body, {
        listingId,
        tempId: optimisticId,
      });

      if (result.success && result.message) {
        // Update optimistic message to sent
        setOptimisticMessages((prev) => {
          const newMap = new Map(prev);
          const msg = newMap.get(optimisticId);
          if (msg) {
            msg.status = "sent";
            newMap.set(optimisticId, msg);
          }
          return newMap;
        });

        // Set initial status
        setMessageStatuses((prev) => {
          const newMap = new Map(prev);
          newMap.set(result.message!.id, { status: "sent" });
          return newMap;
        });

        // Add to messages list
        setMessages((prev) => [...prev, result.message!]);

        return { success: true };
      } else {
        // Mark as error
        setOptimisticMessages((prev) => {
          const newMap = new Map(prev);
          const msg = newMap.get(optimisticId);
          if (msg) {
            msg.status = "error";
            newMap.set(optimisticId, msg);
          }
          return newMap;
        });

        return { success: false, error: result.error || "Failed to send message" };
      }
    },
    [sendSocketMessage, otherUserId, listingId]
  );

  return {
    messages,
    isTyping,
    sendMessage,
    optimisticMessages,
    messageStatuses,
  };
}
