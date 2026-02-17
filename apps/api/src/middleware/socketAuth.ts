import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "../types/socket";
import { logger } from "../utils/logger";

const JWT_SECRET = process.env.JWT_SECRET;

// Lazy check - will fail at runtime if not set, but won't prevent module loading

/**
 * JWT payload structure from our auth system
 */
interface JWTPayload {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Socket.io authentication middleware.
 * Validates JWT token from socket handshake and attaches user data to socket.
 * 
 * Usage:
 * ```typescript
 * io.use(socketAuthMiddleware);
 * ```
 */
export function socketAuthMiddleware(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
  next: (err?: Error) => void
): void {
  try {
    // Get token from handshake auth or query
    const token = socket.handshake.auth.token || 
                  socket.handshake.query.token as string ||
                  extractTokenFromCookie(socket.handshake.headers.cookie);

    if (!token) {
      logger.warn(`[SocketAuth] Connection rejected: No token provided (socket: ${socket.id})`);
      return next(new Error("Authentication required"));
    }

    // Verify JWT token
    if (!JWT_SECRET) {
      logger.error("[SocketAuth] JWT_SECRET not configured");
      return next(new Error("Server configuration error"));
    }
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    // Attach user data to socket
    socket.data.userId = decoded.id;
    socket.data.userEmail = decoded.email;
    socket.data.userName = decoded.name || null;

    logger.debug(`[SocketAuth] User ${decoded.id} authenticated (socket: ${socket.id})`);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      logger.warn(`[SocketAuth] Connection rejected: Invalid token (socket: ${socket.id})`);
      return next(new Error("Invalid authentication token"));
    }
    if (error instanceof jwt.TokenExpiredError) {
      logger.warn(`[SocketAuth] Connection rejected: Token expired (socket: ${socket.id})`);
      return next(new Error("Authentication token expired"));
    }
    
    logger.error(`[SocketAuth] Authentication error (socket: ${socket.id}):`, error);
    next(new Error("Authentication failed"));
  }
}

/**
 * Extract JWT token from cookie string
 */
function extractTokenFromCookie(cookieHeader?: string): string | null {
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "token") {
      return decodeURIComponent(value);
    }
  }
  return null;
}

/**
 * Require authentication for a socket event handler.
 * Use this as a guard in event handlers if not using the auth middleware.
 */
export function requireSocketAuth(
  socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
): { userId: string; userEmail: string; userName: string | null } | null {
  const { userId, userEmail, userName } = socket.data;
  
  if (!userId) {
    socket.emit("error", {
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
    return null;
  }
  
  return { userId, userEmail, userName };
}
