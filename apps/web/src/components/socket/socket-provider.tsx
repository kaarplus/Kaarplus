"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";
import { useSession } from "next-auth/react";

// Types matching the backend socket types
interface MessageSender {
  id: string;
  name: string | null;
  image: string | null;
}

interface MessageWithSender {
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
  sender: MessageSender;
}

interface MessageReceivedPayload {
  message: MessageWithSender;
  conversationId: string;
}

interface MessageStatusUpdatePayload {
  messageId: string;
  status: "sent" | "delivered" | "read";
  timestamp: string;
}

interface UnreadCountUpdatePayload {
  count: number;
  increment?: number;
}

interface MessagesReadPayload {
  readerId: string;
  conversationId: string;
  readAt: string;
  messageIds?: string[];
}

interface UserPresencePayload {
  userId: string;
  status: "online" | "offline";
  lastSeen?: string;
}

interface SocketErrorPayload {
  code: string;
  message: string;
  event?: string;
}

// Client to server events
interface ClientToServerEvents {
  "message:send": (
    payload: {
      recipientId: string;
      listingId?: string;
      subject?: string;
      body: string;
      tempId?: string;
    },
    callback: (response: {
      success: boolean;
      message?: MessageWithSender;
      error?: string;
      tempId?: string;
    }) => void
  ) => void;
  "messages:mark_read": (payload: {
    conversationId: string;
    senderId: string;
    listingId?: string;
  }) => void;
  "conversation:join": (payload: {
    conversationId: string;
    otherUserId: string;
    listingId?: string;
  }) => void;
  "conversation:leave": (payload: { conversationId: string }) => void;
  "typing:start": (payload: { conversationId: string; userId: string }) => void;
  "typing:stop": (payload: { conversationId: string; userId: string }) => void;
  ping: () => void;
}

// Server to client events
interface ServerToClientEvents {
  "message:received": (payload: MessageReceivedPayload) => void;
  "message:status_update": (payload: MessageStatusUpdatePayload) => void;
  "unread_count:update": (payload: UnreadCountUpdatePayload) => void;
  "user:presence": (payload: UserPresencePayload) => void;
  "messages:read": (payload: MessagesReadPayload) => void;
  "typing:start": (payload: { conversationId: string; userId: string }) => void;
  "typing:stop": (payload: { conversationId: string; userId: string }) => void;
  error: (payload: SocketErrorPayload) => void;
  pong: () => void;
}

// Context type
interface SocketContextType {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
  isConnecting: boolean;
  unreadCount: number;
  onlineUsers: Set<string>;
  sendMessage: (
    recipientId: string,
    body: string,
    options?: { listingId?: string; subject?: string; tempId?: string }
  ) => Promise<{ success: boolean; message?: MessageWithSender; error?: string; tempId?: string }>;
  joinConversation: (conversationId: string, otherUserId: string, listingId?: string) => void;
  leaveConversation: (conversationId: string) => void;
  markMessagesAsRead: (conversationId: string, senderId: string, listingId?: string) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const { data: session, status } = useSession();
  const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null);
  
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (status !== "authenticated" || !session?.user) {
      // Disconnect if user logs out
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
      return;
    }

    // Get token from session or cookie
    const token = (session as unknown as { accessToken?: string })?.accessToken;

    setIsConnecting(true);

    // Create socket connection
    const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    // Connection event handlers
    socket.on("connect", () => {
      setIsConnected(true);
      setIsConnecting(false);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("connect_error", () => {
      setIsConnected(false);
      setIsConnecting(false);
    });

    // Message event handlers
    socket.on("message:received", () => {
      // Increment unread count for new messages not in current conversation
      setUnreadCount((prev) => prev + 1);
    });

    socket.on("message:status_update", () => {
      // Handle message status update
    });

    socket.on("unread_count:update", (payload) => {
      setUnreadCount(payload.count);
    });

    socket.on("messages:read", () => {
      // Handle messages read
    });

    socket.on("user:presence", (payload) => {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        if (payload.status === "online") {
          newSet.add(payload.userId);
        } else {
          newSet.delete(payload.userId);
        }
        return newSet;
      });
    });

    socket.on("error", (payload) => {
      console.error("[Socket] Error:", payload);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [session, status]);

  // Send message function
  const sendMessage = useCallback(
    (
      recipientId: string,
      body: string,
      options?: { listingId?: string; subject?: string; tempId?: string }
    ): Promise<{ success: boolean; message?: MessageWithSender; error?: string; tempId?: string }> => {
      return new Promise((resolve) => {
        if (!socketRef.current?.connected) {
          resolve({ success: false, error: "Not connected", tempId: options?.tempId });
          return;
        }

        socketRef.current.emit(
          "message:send",
          {
            recipientId,
            body,
            listingId: options?.listingId,
            subject: options?.subject,
            tempId: options?.tempId,
          },
          (response) => {
            resolve(response);
          }
        );
      });
    },
    []
  );

  // Join conversation
  const joinConversation = useCallback(
    (conversationId: string, otherUserId: string, listingId?: string) => {
      socketRef.current?.emit("conversation:join", {
        conversationId,
        otherUserId,
        listingId,
      });
    },
    []
  );

  // Leave conversation
  const leaveConversation = useCallback((conversationId: string) => {
    socketRef.current?.emit("conversation:leave", { conversationId });
  }, []);

  // Mark messages as read
  const markMessagesAsRead = useCallback(
    (conversationId: string, senderId: string, listingId?: string) => {
      socketRef.current?.emit("messages:mark_read", {
        conversationId,
        senderId,
        listingId,
      });
    },
    []
  );

  // Typing indicators
  const startTyping = useCallback((conversationId: string) => {
    const userId = session?.user?.id;
    if (userId) {
      socketRef.current?.emit("typing:start", { conversationId, userId });
    }
  }, [session?.user?.id]);

  const stopTyping = useCallback((conversationId: string) => {
    const userId = session?.user?.id;
    if (userId) {
      socketRef.current?.emit("typing:stop", { conversationId, userId });
    }
  }, [session?.user?.id]);

  const value: SocketContextType = {
    socket: socketRef.current,
    isConnected,
    isConnecting,
    unreadCount,
    onlineUsers,
    sendMessage,
    joinConversation,
    leaveConversation,
    markMessagesAsRead,
    startTyping,
    stopTyping,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

// Hook to use socket context
export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
