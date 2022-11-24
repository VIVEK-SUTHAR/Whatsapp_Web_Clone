import fs from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAziOy6yqJh24LbhEMFBsRKhM91sypA7BY",
    authDomain: "whatsapp-clone-6100c.firebaseapp.com",
    projectId: "whatsapp-clone-6100c",
    storageBucket: "whatsapp-clone-6100c.appspot.com",
    messagingSenderId: "224852565229",
    appId: "1:224852565229:web:128d2972cdf9ccdce040e4"
};
const firebaseApp = fs.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
var provider = new fs.auth.GoogleAuthProvider();
export { auth, provider };
export default db;