//yarn add firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMamAfQTcNEOygZI_Of3tD7_5GBZ5PFjE",
  authDomain: "awesome-destiny-261419.firebaseapp.com",
  projectId: "awesome-destiny-261419",
  storageBucket: "awesome-destiny-261419.appspot.com",
  messagingSenderId: "875294921032",
  appId: "1:875294921032:web:9813cd090034254724a37d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;