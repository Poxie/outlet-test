import { z } from "zod";

export const createProductGroupSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    banner: z.string(),
})