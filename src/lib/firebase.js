import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5EamSeZwbCL8LKPTQM-CiDe3arYR8gmk",
  authDomain: "nextjs-socialmedia-app-c56e8.firebaseapp.com",
  projectId: "nextjs-socialmedia-app-c56e8",
  storageBucket: "nextjs-socialmedia-app-c56e8.appspot.com",
  messagingSenderId: "765843195556",
  appId: "1:765843195556:web:d2a3abe9b63b8bda924831",
  measurementId: "G-MPNXMWBR29",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
