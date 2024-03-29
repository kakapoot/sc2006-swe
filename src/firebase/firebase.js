import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase initialiation for client-side use
const firebaseConfig = {
    apiKey: "AIzaSyDwu4cOwzt9YklyrbsLeSFT1XqDpdea9Ns",
    authDomain: "sc2006-e3ff1.firebaseapp.com",
    databaseURL: "https://sc2006-e3ff1-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sc2006-e3ff1",
    storageBucket: "sc2006-e3ff1.appspot.com",
    messagingSenderId: "79165116879",
    appId: "1:79165116879:web:fd7ee949a4e43f98d482ba",
    measurementId: "G-NY9HXKB79F"
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }