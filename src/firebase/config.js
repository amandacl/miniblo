// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgTwADThYeF-2OZ9xOzFgCL6WsODDo4jM",
  authDomain: "miniblog-dc1d6.firebaseapp.com",
  projectId: "miniblog-dc1d6",
  storageBucket: "miniblog-dc1d6.appspot.com",
  messagingSenderId: "455145498819",
  appId: "1:455145498819:web:8a0642c18160a18505da76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};