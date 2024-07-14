import { auth } from "../init/firebase";
import * as jose from 'jose'


export async function getFirebaseToken() {
    const storedToken = localStorage.getItem('firebaseToken');

    if (storedToken) {
        try {
            const decodedToken = null;
            if (decodedToken && decodedToken.exp * 1000 > Date.now()) {
                return storedToken;
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }

    const newToken = await auth.currentUser.getIdToken();
    localStorage.setItem('firebaseToken', newToken);

    return newToken;
}