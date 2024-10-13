// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "studentnest-21781.firebaseapp.com",
  projectId: "studentnest-21781",
  storageBucket: "studentnest-21781.appspot.com",
  messagingSenderId: "138674078656",
  appId: "1:138674078656:web:5fbb852ca30d358ecd7e25",
  measurementId: "G-H0J9Z8DSP4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
