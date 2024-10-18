// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "mern-estate-86152.firebaseapp.com",
  projectId: "mern-estate-86152",
  storageBucket: "mern-estate-86152.appspot.com",
  messagingSenderId: "860810024338",
  appId: "1:860810024338:web:8992328263bb403f1f5d4b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
