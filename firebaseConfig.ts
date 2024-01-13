// Import the functions you need from the SDKs you need
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCh1-JNdyucFCmrHGrtN_pPxbvZcjM_7ks",
  authDomain: "eco-arcade.firebaseapp.com",
  databaseURL:
    "https://eco-arcade-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eco-arcade",
  storageBucket: "eco-arcade.appspot.com",
  messagingSenderId: "603676636472",
  appId: "1:603676636472:web:ee78d1f2904e2548e13dcd",
  measurementId: "G-X9XPHYEPRJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;
