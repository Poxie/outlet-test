import { WeeklyProductErrorMessages } from "@/constants/weeklyProductErrorMessages";
import { z } from "zod";

const { imagesMustBeArrayString, imagesNonEmpty } = WeeklyProductErrorMessages;

export const createWeeklyProductSchema = z.object({
    images: z.array(z.string({
        message: imagesMustBeArrayString
    }), {
        message: imagesMustBeArrayString,
    }).nonempty({
        message: imagesNonEmpty
    }),
})