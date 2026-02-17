import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA5c81oHymzPb1-L9824CEcMOY5x6jdU-U",
    authDomain: "recipe-app-4703e.firebaseapp.com",
    projectId: "recipe-app-4703e",
    storageBucket: "recipe-app-4703e.firebasestorage.app",
    messagingSenderId: "704116883827",
    appId: "1:704116883827:web:8fa44eaf5c6ff6c89a8506",
    measurementId: "G-EZVNCV9RHZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, analytics };
