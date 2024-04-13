import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCrcj-k5IzABgS5pNlLiVx6LcetW8nMtls",
  authDomain: "myproject-1aac4.firebaseapp.com",
  projectId: "myproject-1aac4",
  storageBucket: "myproject-1aac4.appspot.com",
  messagingSenderId: "177194952753",
  appId: "1:177194952753:web:4e4154525cce002b0e4d10",
  measurementId: "G-J57P58XPQR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Firestore obyektini olish
const db = getFirestore(firebaseApp);

// Authentication obyektini olish
const auth = getAuth(firebaseApp);

// storage
const storage = getStorage(firebaseApp)

export { db, auth,storage };