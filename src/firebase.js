// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkLk_YIVM4duj5mlvAkr8PiumSxCmSvP0",
  authDomain: "venora-e6b1c.firebaseapp.com",
  projectId: "venora-e6b1c",
  databaseURL: "https://venora-e6b1c-default-rtdb.firebaseio.com",
  storageBucket: "venora-e6b1c.appspot.com",
  messagingSenderId: "590785476961",
  appId: "1:590785476961:web:2eb6e6e7de079e1dc1ed20"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)
export { db,auth };