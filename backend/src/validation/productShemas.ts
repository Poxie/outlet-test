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

export const deleteProductsSchema = z.object({
    productIds: z.array(
        z.string({ message: productIdsMustBeArrayString }),
        { message: productIdsMustBeArrayString },
    ).nonempty({ message: productIdsNonEmpty }),
})