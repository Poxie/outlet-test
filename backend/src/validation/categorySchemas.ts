import { z } from "zod";
import { CategoryErrorMessages } from "@/constants/categoryErrorMessages";
import { DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from "@/utils/categories/categoryConstants";

const {
    titleIsRequired, minTitleLength, maxTitleLength,
    descriptionIsRequired, minDescriptionLength, maxDescriptionLength,
    bannerIsRequired,
} = CategoryErrorMessages

export const createCategorySchema = z.object({
    title: z.string({ message: titleIsRequired })
        .min(TITLE_MIN_LENGTH, { message: minTitleLength })
        .max(TITLE_MAX_LENGTH, { message: maxTitleLength }),
    description: z.string({ message: descriptionIsRequired })
        .min(DESCRIPTION_MIN_LENGTH, { message: minDescriptionLength })
        .max(DESCRIPTION_MAX_LENGTH, { message: maxDescriptionLength }),
    banner: z.string({ message: bannerIsRequired })
        .min(1, { message: bannerIsRequired }),
})