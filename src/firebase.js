import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";

 

const firebaseConfig = {
  apiKey: "AIzaSyCjxPqbA_a0I38qCZwCRjxC9D_VB42XMn8",
  authDomain: "lama-chat-app-67e2b.firebaseapp.com",
  projectId: "lama-chat-app-67e2b",
  storageBucket: "lama-chat-app-67e2b.appspot.com",
  messagingSenderId: "914675689168",
  appId: "1:914675689168:web:9ef3d47bb68fe7f5c8e0d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
