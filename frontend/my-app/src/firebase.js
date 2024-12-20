import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmTrNHSDX5OYp2Rxe3OaETWp9qGygabZ4",
  authDomain: "deepblue-76e4d.firebaseapp.com",
  projectId: "deepblue-76e4d",
  storageBucket: "deepblue-76e4d.firebasestorage.app",
  messagingSenderId: "198602347461",
  appId: "1:198602347461:web:217539d740a8731f62b1ac",
  measurementId: "G-Q1MMR5DSQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);