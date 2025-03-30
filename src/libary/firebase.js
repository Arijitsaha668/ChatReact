// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2ZDeu9qv3W-bAE7nQOBiP5o6P5ytR934",
  authDomain: "reactchat-9f893.firebaseapp.com",
  projectId: "reactchat-9f893",
  storageBucket: "reactchat-9f893.firebasestorage.app",
  messagingSenderId: "725318224977",
  appId: "1:725318224977:web:e1417b0cacb3fb9314bc70",
  measurementId: "G-CRBQV9NPGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;