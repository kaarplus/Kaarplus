import { prisma } from "@kaarplus/database";
import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { requireAuth } from "../middleware/auth";
import { authLimiter } from "../middleware/rateLimiter";
import { AuthError, BadRequestError } from "../utils/errors";

export const authRouter = Router();

// Apply rate limiter to all auth routes
authRouter.use(authLimiter);

const JWT_SECRET = process.env.JWT_SECRET || "development_secret_do_not_use_in_production";
const JWT_EXPIRES_IN = "24h";

// Zod schemas
const registerSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    name: z.string().optional(),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

// POST /api/auth/register
authRouter.post("/register", async (req: Request, res: Response) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.issues[0].message);
    }

    const { email, password, name } = result.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new BadRequestError("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
            name,
            role: "BUYER", // Default role
        },
    });

    // Create session/token
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    // Set HTTP-only cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(201).json({
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        token, // Return token for client-side use if needed (usually redundant with cookie but helpful for debugging/mobile)
    });
});

// POST /api/auth/login
authRouter.post("/login", async (req: Request, res: Response) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.issues[0].message);
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
        throw new AuthError("Invalid email or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
        throw new AuthError("Invalid email or password");
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        },
        token,
    });
});

// POST /api/auth/logout
authRouter.post("/logout", (_req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.json({ message: "Logged out successfully" });
});

// GET /api/auth/session
authRouter.get("/session", requireAuth, (req: Request, res: Response) => {
    res.json({ user: req.user });
});

// POST /api/auth/forgot-password (Stub)
authRouter.post("/forgot-password", async (req: Request, res: Response) => {
    const { email } = req.body;
    // In a real app, generate token, save to DB, send email
    // For MVP, just acknowledge
    console.log(`[Stub] Password reset requested for ${email}`);
    res.json({ message: "If an account exists, a password reset email has been sent." });
});

// POST /api/auth/reset-password (Stub)
authRouter.post("/reset-password", async (req: Request, res: Response) => {
    // const { token, newPassword } = req.body;
    // Validate token, update password
    res.json({ message: "Password reset functionality pending implementation." });
});
