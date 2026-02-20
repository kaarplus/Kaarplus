import { z } from "zod";

export const updateNotificationPrefsSchema = z.object({
    email: z.boolean().optional(),
    messages: z.boolean().optional(),
    favorites: z.boolean().optional(),
    marketing: z.boolean().optional(),
});
