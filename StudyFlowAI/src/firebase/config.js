
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9h_24Niq0TLqKt5XaXh4omK2CQ4diu2c",
  authDomain: "studyflowai-89993.firebaseapp.com",
  projectId: "studyflowai-89993",
  storageBucket: "studyflowai-89993.firebasestorage.app",
  messagingSenderId: "656291002778",
  appId: "1:656291002778:web:57203d4598bd441e182223",
  measurementId: "G-YCSN9SLSFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;