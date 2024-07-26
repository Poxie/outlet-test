import { Store } from "./types";

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAPS_BASE_URL = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BASE_URL;

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

export const getOpenText = (store: Store) => {
    const today = new Date().getDay();

    let times = store.weekdayOpenHours;
    if(today === 0) {
        times = store.sundayOpenHours;
    }
    if(today === 6) {
        times = store.saturdayOpenHours;
    }

    return `Öppet idag ${times}`;
}