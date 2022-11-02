import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2q3JIufT2yj5VjHgIB-x_L6BQpqWc1Bc",
    authDomain: "criclive-b357f.firebaseapp.com",
    databaseURL: "https://criclive-b357f-default-rtdb.firebaseio.com",
    projectId: "criclive-b357f",
    storageBucket: "criclive-b357f.appspot.com",
    messagingSenderId: "432948781877",
    appId: "1:432948781877:web:638c9c9c9cde1111a0a27c",
    measurementId: "G-2TJX8SXGTS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth };