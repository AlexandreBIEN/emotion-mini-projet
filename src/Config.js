// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4rD9WMrlk1HQU_MZOEIENFODepJALyyE",
  authDomain: "emotion-mini-projet.firebaseapp.com",
  projectId: "emotion-mini-projet",
  storageBucket: "emotion-mini-projet.appspot.com",
  messagingSenderId: "12564660993",
  appId: "1:12564660993:web:5b6a00fcbdd414be95d100"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;