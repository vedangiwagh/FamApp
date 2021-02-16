import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyD3CvH07um3yRfCu4qhw0Qk1qL4wNPP0l4",
    authDomain: "familyapp-73c05.firebaseapp.com",
    projectId: "familyapp-73c05",
    storageBucket: "familyapp-73c05.appspot.com",
    messagingSenderId: "545367666725",
    appId: "1:545367666725:web:a24aa6233a15a32a628fcc",
    measurementId: "G-GZZNG31V4M"
});

export default app;