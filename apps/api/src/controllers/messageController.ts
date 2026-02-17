import { Request, Response, NextFunction } from "express";

import { messageService } from "../services/messageService";
import { socketService } from "../services/socketService";
import { BadRequestError, NotFoundError, ErrorCode } from "../utils/errors";
import { logger } from "../utils/logger";

/**
 * Parse pagination parameters from query string
 */
function getPaginationParams(req: Request): { page: number; pageSize: number } {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(req.query.pageSize as string) || 20));
    return { page, pageSize };
}

/**
 * GET /api/user/messages
 * Get all conversations for the authenticated user with pagination.
 */
export async function getConversations(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const pagination = getPaginationParams(req);
        const result = await messageService.getConversations(userId, pagination);

        res.json(result);
    } catch (error) {
        next(error);
    }
}

/**
 * GET /api/user/messages/thread?userId=X&listingId=Y
 * Get messages in a conversation thread with another user with pagination.
 * Also marks unread messages as read and emits socket events.
 */
export async function getThread(req: Request, res: Response, next: NextFunction) {
    try {
        const currentUserId = req.user!.id;
        const otherUserId = req.query.userId as string;
        const listingId = req.query.listingId as string | undefined;

        if (!otherUserId) {
            throw new BadRequestError("userId query parameter is required");
        }

        const pagination = getPaginationParams(req);
        const result = await messageService.getThread(currentUserId, otherUserId, listingId, pagination);

        // Emit socket events for messages marked as read
        if (socketService.isInitialized()) {
            const conversationId = `${[currentUserId, otherUserId].sort().join("-")}:${listingId || "general"}`;
            
            // Notify sender that their messages were read
            socketService.emitToUser(otherUserId, "messages:read", {
                readerId: currentUserId,
                conversationId,
                readAt: new Date(),
            });

            // Update unread count for current user
            const unreadCount = await messageService.getUnreadCount(currentUserId);
            socketService.emitToUser(currentUserId, "unread_count:update", { count: unreadCount });
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
}

/**
 * POST /api/user/messages
 * Send a message to another user.
 * Also emits socket event for real-time delivery.
 */
export async function sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
        const senderId = req.user!.id;
        const { recipientId, listingId, subject, body } = req.body;

        if (!recipientId) {
            throw new BadRequestError("recipientId is required");
        }

        if (!body || typeof body !== "string" || body.trim().length === 0) {
            throw new BadRequestError("Message body is required and cannot be empty");
        }

        if (body.length > 10000) {
            throw new BadRequestError("Message body cannot exceed 10000 characters");
        }

        const message = await messageService.sendMessage(senderId, {
            recipientId,
            listingId,
            subject,
            body: body.trim(),
        });

        // Emit socket event for real-time delivery (if socket service is initialized)
        if (socketService.isInitialized()) {
            try {
                socketService.emitNewMessage(message as unknown as {
                    id: string;
                    senderId: string;
                    recipientId: string;
                    listingId: string | null;
                    subject: string | null;
                    body: string;
                    read: boolean;
                    delivered: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    sender: { id: string; name: string | null; image: string | null };
                });

                // Mark as delivered if recipient is online
                if (socketService.isUserOnline(recipientId)) {
                    socketService.emitMessageStatus(senderId, message.id, "delivered");
                }
            } catch (socketError) {
                // Log but don't fail - the message is already saved to DB
                logger.error("[MessageController] Failed to emit socket event:", socketError);
            }
        }

        res.status(201).json({ data: message });
    } catch (error) {
        if (error instanceof Error && error.message === "CANNOT_MESSAGE_SELF") {
            next(new BadRequestError("Cannot send message to yourself", ErrorCode.CANNOT_MESSAGE_SELF));
            return;
        }
        if (error instanceof Error && error.message === "RECIPIENT_NOT_FOUND") {
            next(new NotFoundError("Recipient not found", ErrorCode.RECIPIENT_NOT_FOUND));
            return;
        }
        next(error);
    }
}

/**
 * GET /api/user/messages/unread-count
 * Get the count of unread messages for the authenticated user.
 */
export async function getUnreadCount(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const count = await messageService.getUnreadCount(userId);

        res.json({ data: { count } });
    } catch (error) {
        next(error);
    }
}

/**
 * PATCH /api/user/messages/mark-read
 * Mark messages as read (REST API fallback for non-socket clients).
 */
export async function markMessagesAsRead(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.user!.id;
        const { senderId, listingId } = req.body;

        if (!senderId) {
            throw new BadRequestError("senderId is required");
        }

        // Update messages as read
        const { prisma } = await import("@kaarplus/database");
        await prisma.message.updateMany({
            where: {
                recipientId: userId,
                senderId,
                ...(listingId ? { listingId } : {}),
                read: false,
            },
            data: { read: true },
        });

        // Emit socket events
        if (socketService.isInitialized()) {
            const conversationId = `${[userId, senderId].sort().join("-")}:${listingId || "general"}`;
            
            socketService.emitToUser(senderId, "messages:read", {
                readerId: userId,
                conversationId,
                readAt: new Date(),
            });

            const unreadCount = await messageService.getUnreadCount(userId);
            socketService.emitToUser(userId, "unread_count:update", { count: unreadCount });
        }

        res.json({ data: { message: "Messages marked as read" } });
    } catch (error) {
        next(error);
    }
}
