import fetchFromAPI from "../fetchFromAPI";

export default function loginUser({ email, password }: {
    email: string;
    password: string;
}) {
    return fetchFromAPI('/login', { 
        method: 'POST', 
        body: JSON.stringify({ email, password }),
    });
}