import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpP6CKhAESQBIC5Awiu5H6_jUQVvCWYYw",
  authDomain: "maritda.firebaseapp.com",
  projectId: "maritda",
  storageBucket: "maritda.firebasestorage.app",
  messagingSenderId: "351479345228",
  appId: "1:351479345228:web:a77787603f39cdc19904e9",
  measurementId: "G-BMQ2K0LPLQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app; 