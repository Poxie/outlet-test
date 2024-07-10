import { z } from "zod";
import { StoreErrorMessages } from "@/constants/storeErrorMessages";
import { STORE_ADDRESS_MAX_LENGTH, STORE_ADDRESS_MIN_LENGTH, STORE_EMAIL_MAX_LENGTH, STORE_NAME_MAX_LENGTH, STORE_NAME_MIN_LENGTH, STORE_NUMBER_MAX_LENGTH, STORE_NUMBER_MIN_LENGTH, STORE_PHONE_NUMBER_MAX_LENGTH, STORE_PHONE_NUMBER_MIN_LENGTH } from "@/utils/stores/storeConstants";

const {
    storeNumberRequired, storeNumberLength,
    storeNameRequired, storeNameLength,
    storeAddressRequired, storeAddressLength,
    storeEmailRequired, storeEmailInvalid, storeEmailLength,
    storePhoneNumberRequired, storePhoneNumberLength,
} = StoreErrorMessages;

export const createStoreSchema = z.object({
    storeNumber: z.string({
        message: storeNumberRequired,
    }).min(STORE_NUMBER_MIN_LENGTH, {
        message: storeNumberLength,
    }).max(STORE_NUMBER_MAX_LENGTH, {
        message: storeNumberLength,
    }),
    name: z.string({
        message: storeNameRequired,
    }).min(STORE_NAME_MIN_LENGTH, {
        message: storeNameLength,
    }).max(STORE_NAME_MAX_LENGTH, {
        message: storeNameLength,
    }),
    address: z.string({
        message: storeAddressRequired
    }).min(STORE_ADDRESS_MIN_LENGTH, {
        message: storeAddressLength,
    }).max(STORE_ADDRESS_MAX_LENGTH, {
        message: storeAddressLength,
    }),
    email: z.string({
        message: storeEmailRequired,
    }).email({
        message: storeEmailInvalid,
    }).max(STORE_EMAIL_MAX_LENGTH, {
        message: storeEmailLength,
    }),
    phoneNumber: z.string({
        message: storePhoneNumberRequired,
    }).min(STORE_PHONE_NUMBER_MIN_LENGTH, {
        message: storePhoneNumberLength,
    }).max(STORE_PHONE_NUMBER_MAX_LENGTH, {
        message: storePhoneNumberLength,
    }),
})