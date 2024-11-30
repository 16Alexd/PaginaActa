// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA--lAo_Y0rkLUhkQ1LEwNvUy8L68XX7jw",
  authDomain: "actanacimiento-ca0ab.firebaseapp.com",
  projectId: "actanacimiento-ca0ab",
  storageBucket: "actanacimiento-ca0ab.firebasestorage.app",
  messagingSenderId: "474852738293",
  appId: "1:474852738293:web:ccafb1bc4f05db55bef1bc",
  measurementId: "G-5NZFYFEZFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const BD = getFirestore(app);//exportarla para usarla en cualquier parte de la apli. web
export const auth =getAuth(app);                      
export const storage =getStorage(app);