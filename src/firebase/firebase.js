import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase initialiation for client-side use
const firebaseConfig = {
    apiKey: "AIzaSyC2KQ5F1GnZy5vb7lYdud2kPdGZYpOueXE",
    authDomain: "sc2006-temp.firebaseapp.com",
    projectId: "sc2006-temp",
    storageBucket: "sc2006-temp.appspot.com",
    messagingSenderId: "536059698645",
    appId: "1:536059698645:web:5ba6c948cc9cbc3ee3b15c",
    measurementId: "G-FERZP9VZ9T"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }