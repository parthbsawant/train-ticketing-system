import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7z3YgczoslpGMQK2cgetxoYv_Lxtapls",
  authDomain: "train-ticketing-system-6f31f.firebaseapp.com",
  projectId: "train-ticketing-system-6f31f",
  storageBucket: "train-ticketing-system-6f31f.firebasestorage.app",
  messagingSenderId: "412407611778",
  appId: "1:412407611778:web:862ad50ab72becc5a38f9b",
  measurementId: "G-20TZR451XG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
