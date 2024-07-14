// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU0v8cXPk3GLhxt6kY3H9_nwDRfXL_C9I",
  authDomain: "educacy-io.firebaseapp.com",
  projectId: "educacy-io",
  storageBucket: "educacy-io.appspot.com",
  messagingSenderId: "934551118642",
  appId: "1:934551118642:web:dfa749db50b33ec9ad6d2b",
  measurementId: "G-RRN7J45S1Y"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);