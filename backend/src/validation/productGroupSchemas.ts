import { z } from "zod";

export const createProductGroupSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    banner: z.string().optional(),
    parentId: z.string().optional().nullable(),
    groupType: z.enum(['PRODUCT_GROUP', 'BLOG']).optional(),
})