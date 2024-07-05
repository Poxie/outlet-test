import { ProductErrorMessages } from "@/constants/productErrorMessages";
import { z } from "zod";

const { imageIsRequired, parentIdIsRequired } = ProductErrorMessages;

export const createProductSchema = z.object({
    image: z.string({ message: imageIsRequired }),
    parentId: z.string({ message: parentIdIsRequired }),
})