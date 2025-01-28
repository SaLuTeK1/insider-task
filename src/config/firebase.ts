// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEoNJe8sN2BjerGrC0V0hTx0-r2DrRFnc",
    authDomain: "todo-app-26334.firebaseapp.com",
    projectId: "todo-app-26334",
    storageBucket: "todo-app-26334.firebasestorage.app",
    messagingSenderId: "111842676084",
    appId: "1:111842676084:web:ae0db966975d5e489cb021",
    measurementId: "G-62LZSQ4G8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, signInWithEmailAndPassword };