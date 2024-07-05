import { DESCRIPTION_MAX_LENGTH, DESCRIPTION_MIN_LENGTH, TITLE_MAX_LENGTH, TITLE_MIN_LENGTH } from "@/utils/categories/categoryConstants";

export const CategoryErrorMessages = {
    titleIsRequired: 'Title is required',
    minTitleLength: `Title must be at least ${TITLE_MIN_LENGTH} characters long`,
    maxTitleLength: `Title must be less than ${TITLE_MAX_LENGTH} characters`,
    descriptionIsRequired: 'Description is required',
    minDescriptionLength: `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters long`,
    maxDescriptionLength: `Description must be less than ${DESCRIPTION_MAX_LENGTH} characters`,
    bannerIsRequired: 'Banner is required',
}