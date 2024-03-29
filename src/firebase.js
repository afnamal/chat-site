import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYZfHMduXBQwiKu_2a5ptrwj3x_WhrrQs",
  authDomain: "btk-vue2.firebaseapp.com",
  projectId: "btk-vue2",
  storageBucket: "btk-vue2.appspot.com",
  messagingSenderId: "1043981859255",
  appId: "1:1043981859255:web:5ed6633c38ba4785d61032",
  measurementId: "G-M0NG5HBEYD"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(app);
const projectAuth=getAuth()



export { projectFirestore,serverTimestamp ,projectAuth,app };