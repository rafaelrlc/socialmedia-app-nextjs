import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5EamSeZwbCL8LKPTQM-CiDe3arYR8gmk",
  authDomain: "nextjs-socialmedia-app-c56e8.firebaseapp.com",
  projectId: "nextjs-socialmedia-app-c56e8",
  storageBucket: "nextjs-socialmedia-app-c56e8.appspot.com",
  messagingSenderId: "765843195556",
  appId: "1:765843195556:web:d2a3abe9b63b8bda924831",
  measurementId: "G-MPNXMWBR29",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
