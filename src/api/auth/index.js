import axios from 'axios';
import {auth} from "../../init/firebase";
import { signInWithCustomToken } from "firebase/auth";

const requestLoginOTP = async (event) => {
    return axios.post('/user/login', {
        email: event.email,
        event: "generate-otp"
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error;
    })
}

const verifyLoginOTP = async (event) => {
    return axios.post('/user/login', {
        email: event.email,
        otp: (event.otp).toString(),
        event: "verify-otp"
    }).then(async(response) => {
        await loginUsingFirebaseToken(response.data)
        return response.data;
    }).catch((error) => {
        return error;
    })

}


const loginUsingFirebaseToken = async (event) => {
    try {
        console.log("At Login", event)
        const auth_data = await signInWithCustomToken(auth, event.login_token);
        console.log('User logged in:', auth_data.user);
    }
    catch (error) {
        console.error('Error logging in:', error);
        alert('Error logging in:', error);
        throw error;
    }   
}

export default {
    requestLoginOTP: requestLoginOTP,
    verifyLoginOTP: verifyLoginOTP,
    loginUsingFirebaseToken,
}


