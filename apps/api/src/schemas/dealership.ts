import { z } from "zod";

export const contactDealershipSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, "Message is required"),
    phone: z.string().optional(),
});
