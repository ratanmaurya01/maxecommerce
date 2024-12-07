import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0xNzFrONhhi103KGhVl28pB4Izkce4nw",
  authDomain: "ecommerce-29646.firebaseapp.com",
  projectId: "ecommerce-29646",
  storageBucket: "ecommerce-29646.appspot.com",
  messagingSenderId: "386308228512",
  appId: "1:386308228512:web:ab8527918e5243943490c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
