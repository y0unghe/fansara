import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcCDPEMqWIlJh7uLaycPl07TgoeWV6S2k",
    authDomain: "fansara-d0a39.firebaseapp.com",
    projectId: "fansara-d0a39",
    storageBucket: "fansara-d0a39.appspot.com",
    messagingSenderId: "803312944282",
    appId: "1:803312944282:web:05f540521736e6ae2a8b23",
    measurementId: "G-5J8Z04L1DY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };