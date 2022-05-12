import fs from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
   
};
const firebaseApp = fs.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var provider = new fs.auth.GoogleAuthProvider();
export { auth, provider };
export default db;