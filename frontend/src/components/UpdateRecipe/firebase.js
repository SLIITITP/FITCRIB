import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCJjwBqYJErrlW_aJqpfm-rW85crfgx6vw",
  authDomain: "uploadingfile-a887c.firebaseapp.com",
  projectId: "uploadingfile-a887c",
  storageBucket: "uploadingfile-a887c.appspot.com",
  messagingSenderId: "631127202289",
  appId: "1:631127202289:web:b07103bbda2a19f1768c50"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);