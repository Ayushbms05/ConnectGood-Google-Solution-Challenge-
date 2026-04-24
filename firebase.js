// Import Firebase directly from the web (CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAi8tWqO2pNIL35YMeABB7z4RrvHBvEIQo",
  authDomain: "codecure-resourceapp.firebaseapp.com",
  projectId: "codecure-resourceapp",
  storageBucket: "codecure-resourceapp.firebasestorage.app",
  messagingSenderId: "726504374770",
  appId: "1:726504374770:web:68a1e05311d5eab7d36b6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);