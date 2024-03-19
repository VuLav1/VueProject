// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, onValue } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAx-FF5N9iuscjgRhY-Zu3m5Fskl5dBAkI",
    authDomain: "new1-a9fb4.firebaseapp.com",
    projectId: "new1-a9fb4",
    storageBucket: "new1-a9fb4.appspot.com",
    messagingSenderId: "998052732812",
    appId: "1:998052732812:web:7d7a3bf0b38c1fb2a700a9",
    measurementId: "G-KNCRL8HNJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app)


export { auth }

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export {database, ref, push, onValue}
