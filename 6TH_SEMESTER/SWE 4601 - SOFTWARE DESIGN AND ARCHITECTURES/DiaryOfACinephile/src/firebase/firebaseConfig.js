import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Add firebaseconfig values here
const firebaseConfig = {
  apiKey: "AIzaSyB7hb2rt9YfXH6rFIlYPCRc_8Rqjw3PDaE",
  authDomain: "sda-moviejournal.firebaseapp.com",
  projectId: "sda-moviejournal",
  storageBucket: "sda-moviejournal.firebasestorage.app",
  messagingSenderId: "1074245732163",
  appId: "1:1074245732163:web:ca6480d347ea7f5a67d1f6",
  measurementId: "G-MV46FWSTP9",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

/* -_- N4M154 -_- */
