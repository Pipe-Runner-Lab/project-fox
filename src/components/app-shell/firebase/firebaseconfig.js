import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "project-fox-ce189.firebaseapp.com",
    projectId: "project-fox-ce189",
    storageBucket: "project-fox-ce189.appspot.com",
    messagingSenderId: "121735803849",
    appId: "1:121735803849:web:812e06791abf7a996d2e18",
    measurementId: "G-CTB76D6M6W"
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export var provider = new firebase.auth.GoogleAuthProvider();

export function handlesignin() {
    auth.signInWithPopup(provider).then((cred) => {
        console.log("signs in succesfully  " + cred.user.email);
    });
}

export function handlesignout() {
    auth.signOut().then(() => {
        console.log("signs out succesfully  ");
    });
}