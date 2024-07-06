import { WeeklyProductErrorMessages } from "@/constants/weeklyProductErrorMessages";
import { z } from "zod";

const { imagesMustBeArrayString, imagesNonEmpty, productIdsMustBeArrayString, productIdsNonEmpty } = WeeklyProductErrorMessages;

export const createWeeklyProductSchema = z.object({
    images: z.array(z.string({
        message: imagesMustBeArrayString
    }), {
        message: imagesMustBeArrayString,
    }).nonempty({
        message: imagesNonEmpty
    }),
})

export const deleteWeeklyProductsSchema = z.object({
    productIds: z.array(
        z.string({ message: productIdsMustBeArrayString }),
        { message: productIdsMustBeArrayString },
    ).nonempty({ message: productIdsNonEmpty }),
})