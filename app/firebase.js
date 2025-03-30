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
  apiKey: "xxxxxx",
  authDomain: "xxxxxx",
  projectId: "xxxxxx",
  storageBucket: "xxxxxx",
  messagingSenderId: "xxxxxx",
  appId: "xxx:xxxxx:xxxxxx",
  measurementId: "xxxxxx"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Otetaan käyttöön autentikaatio
const db = getFirestore(app); // Otetaan käyttöön Firestore (tietokanta)
//const analytics = getAnalytics(app);


export { app, auth, db };
