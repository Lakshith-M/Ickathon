import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5d6eFDybAgG3dDWBUVnYeOZNJ2anpmMM",
  authDomain: "importwinners-123.firebaseapp.com",
  projectId: "importwinners-123",
  storageBucket: "importwinners-123.firebasestorage.app",
  messagingSenderId: "253800275260",
  appId: "1:253800275260:web:6fef953fcd47c55f40d239",
  measurementId: "G-B8CEMQ2DYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
