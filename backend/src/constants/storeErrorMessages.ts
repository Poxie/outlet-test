import {
    STORE_NUMBER_MIN_LENGTH, STORE_NUMBER_MAX_LENGTH,
    STORE_NAME_MIN_LENGTH, STORE_NAME_MAX_LENGTH,
    STORE_ADDRESS_MIN_LENGTH, STORE_ADDRESS_MAX_LENGTH,
    STORE_PHONE_NUMBER_MIN_LENGTH,
    STORE_PHONE_NUMBER_MAX_LENGTH,
    STORE_EMAIL_MAX_LENGTH,
} from '@/utils/stores/storeConstants'

export const StoreErrorMessages = {
    storeNumberRequired: 'Store number is required',
    storeNumberLength: `Store number must be between ${STORE_NUMBER_MIN_LENGTH} and ${STORE_NUMBER_MAX_LENGTH} characters`,

    storeNameRequired: 'Store name is required',
    storeNameLength: `Store name must be between ${STORE_NAME_MIN_LENGTH} and ${STORE_NAME_MAX_LENGTH} characters`,

    storeAddressRequired: 'Store address is required',
    storeAddressLength: `Store address must be between ${STORE_ADDRESS_MIN_LENGTH} and ${STORE_ADDRESS_MAX_LENGTH} characters`,

    storeEmailRequired: 'Store email is required',
    storeEmailInvalid: 'Store email is malformed',
    storeEmailLength: `Store email must be less than ${STORE_EMAIL_MAX_LENGTH} characters`,

    storePhoneNumberRequired: 'Store phone number is required',
    storePhoneNumberLength: `Store phone number must be between ${STORE_PHONE_NUMBER_MIN_LENGTH} and ${STORE_PHONE_NUMBER_MAX_LENGTH} characters`,

    storeNumberExists: (storeNumber: string) => `Store number ${storeNumber} already exists`,
}