// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVuw-aqLYmtxMlrM71fefc2tDNpiLOMNQ",
  authDomain: "fir-project-a6e08.firebaseapp.com",
  projectId: "fir-project-a6e08",
  storageBucket: "fir-project-a6e08.appspot.com",
  messagingSenderId: "871325682333",
  appId: "1:871325682333:web:7e7e08f2ca824e05cb2274"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export default auth;