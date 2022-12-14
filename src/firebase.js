// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6BoosXqKQlVvQtPo6lnB4eaKUtbQ22Uo",
  authDomain: "react-realtor-clown.firebaseapp.com",
  projectId: "react-realtor-clown",
  storageBucket: "react-realtor-clown.appspot.com",
  messagingSenderId: "290387367546",
  appId: "1:290387367546:web:5ee604323c57a9c869cdc3"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore();