import fs from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
const firebaseConfig = {
   
};
const firebaseApp = fs.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var provider = new fs.auth.GoogleAuthProvider();
export { auth, provider };
export default db;