import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyBqT4VPfHaqDD0ztNT3cbBDxv9D6yISGgw",

  authDomain: "chatapp-44c0c.firebaseapp.com",

  projectId: "chatapp-44c0c",

  storageBucket: "chatapp-44c0c.appspot.com",

  messagingSenderId: "675226047322",

  appId: "1:675226047322:web:c5707c73e018266fca5963",

  measurementId: "G-W2D9TKPXM0"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const projectAuth=getAuth()



export { projectFirestore,serverTimestamp ,projectAuth,app };