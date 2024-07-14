import axios from 'axios';
import {auth} from "../../init/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { getFirebaseToken } from "../firebase"


const createWebsite = async (projectId,config) => {
    try {
        const token = await getFirebaseToken();
        const response = await axios.post(`/project`, {
            project_id: projectId,
            config
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            data: response.data,
            status: response.status
        };
    } catch (error) {
        console.error(error);
        alert("Error Creating Website");
        throw error;
    }
}

const postHTMLContent = async (projectId, htmlContent) => {
    try {

        const token = await getFirebaseToken();
        const response = await axios.post(`/project/html/${projectId}`, {
            html_content: htmlContent
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            message: response.data.message,
            status: response.status
        };
    } catch (error) {
        console.error(error);
        alert("Error Posting HTML Content");
        throw error;
    }

}

const listUserProjects = async () => {
    try {
        const token = await getFirebaseToken();
        const response = await axios.get(`/project/list`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
        alert("Error Listing User Projects");
        throw error;
    }
}



const getHTMLContent = async (projectId) => {
    try {
        const token = await getFirebaseToken();
        const response = await axios.get(`/project/html/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data
    } catch (error) {
        console.error(error);
        alert("Error Getting HTML Content");
        throw error;
    }
}

export default {
    createWebsite,
    getHTMLContent,
    postHTMLContent,
    listUserProjects
}