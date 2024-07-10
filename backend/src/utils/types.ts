import { Store, User } from "@prisma/client";

export type MutableUserProps = Pick<User, 'name' | 'email' | 'password' | 'role'>;
export type MutableStoreProps = Pick<Store, 'name' | 'address' | 'phoneNumber' | 'email'>;

// Helper types
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;