// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Tuodaan autentikaatio
import { getFirestore } from "firebase/firestore"; // Firestore (tietokanta)
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLMC08NmwFOln3FdPfKKTLYkPp9R3OprI",
  authDomain: "suuai-577c1.firebaseapp.com",
  projectId: "suuai-577c1",
  storageBucket: "suuai-577c1.firebasestorage.app",
  messagingSenderId: "40235498545",
  appId: "1:40235498545:web:04f2e39d6c6b9683c5e910",
  measurementId: "G-078FR3ZSYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Otetaan käyttöön autentikaatio
const db = getFirestore(app); // Otetaan käyttöön Firestore (tietokanta)
//const analytics = getAnalytics(app);


export { app, auth, db };