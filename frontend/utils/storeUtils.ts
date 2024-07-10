import { Store } from "./types";

const MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const MAPS_BASE_URL = process.env.GOOGLE_MAPS_BASE_URL;
const MAPS_API_BASE_URL = process.env.GOOGLE_MAPS_API_BASE_URL;

export const getAllStoresIframeSrc = () => {
    const src = `${MAPS_BASE_URL}/embed/v1/search?q=Ahlens Outlet Sweden&key=${MAPS_API_KEY}`;
    return src;
}

export const getStoreIframeSrc = (store: Store) => {
    const src = `${MAPS_BASE_URL}/embed/v1/place?q=Åhléns+Outlet+${store.name}+${store.address}&key=${MAPS_API_KEY}&zoom=11`;
    return src;
}
export const getStoreMapLocation = (store: Store) => {
    const src = `${MAPS_BASE_URL}/place?q=Åhléns+Outlet+${store.name}+${store.address}&key=${MAPS_API_KEY}`;
    return src;
}
export const getStoreMapImage = (store: Store) => {
    const address = store.address.replaceAll(' ', '+') + '+Åhléns+Outlet';
    const src = `${MAPS_API_BASE_URL}/staticmap?center=${address}&zoom=12&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${store.name}&key=${MAPS_API_KEY}`;
    return src;
}