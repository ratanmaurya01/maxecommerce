import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Firebase Storage


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX-kMj1l2sDba5MTQTwuaZu7g_2XVkmWo",
  authDomain: "blogg-62007.firebaseapp.com",
  databaseURL: "https://blogg-62007-default-rtdb.firebaseio.com",
  projectId: "blogg-62007",
  storageBucket: "blogg-62007.appspot.com",
  messagingSenderId: "675070634016",
  appId: "1:675070634016:web:6938d7389c5f5c4b633445",
  measurementId: "G-9Y2VQ9LYM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Export Firebase services for use in your app
export { auth, db, storage }; // Export storage

