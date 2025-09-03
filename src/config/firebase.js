// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // 👈 Add GoogleAuthProvider import
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYN3nU_dGb42p2jSoFMyGoZlCUWsFGq8E",
  authDomain: "background-removal-746e0.firebaseapp.com",
  projectId: "background-removal-746e0",
  storageBucket: "background-removal-746e0.firebasestorage.app",
  messagingSenderId: "668356977600", 
  appId: "1:668356977600:web:c80e3117ebe66e30d35e25",
  measurementId: "G-RQQ71YLT2X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

// ✅ Create and export Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Optional: Add any custom configuration for the Google provider
googleProvider.setCustomParameters({
  prompt: "select_account" // This forces users to select an account every time
});