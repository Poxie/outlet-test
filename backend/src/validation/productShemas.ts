import { ProductErrorMessages } from "@/constants/productErrorMessages";
import { z } from "zod";

const { imagesNonEmpty, imagesMustBeArrayString, parentIdIsRequired, productIdsMustBeArrayString, productIdsNonEmpty } = ProductErrorMessages;

export const createProductSchema = z.object({
    images: z.array(
        z.string({ message: imagesMustBeArrayString }),
        { message: imagesMustBeArrayString }
    ).nonempty({ message: imagesNonEmpty }),
    parentId: z.string({ message: parentIdIsRequired }),
})

export const updateProductPositionsSchema = z.object({
    parentId: z.string({ message: parentIdIsRequired }),
    positions: z.array(
        z.object({
            id: z.string(),
            position: z.number(),
        })
    ).nonempty(),
})

export const deleteProductsSchema = z.object({
    parentId: z.string({ message: parentIdIsRequired }),
    productIds: z.array(
        z.string({ message: productIdsMustBeArrayString }),
        { message: productIdsMustBeArrayString },
    ).nonempty({ message: productIdsNonEmpty }),
})