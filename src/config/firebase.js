import firebase from "firebase/compat/app"
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


var firebaseConfig = {
  apiKey: "AIzaSyD2FrUZGwhLpSSMht65w-pcOeYAxd-OcZ8",
  authDomain: "welearn-78cd8.firebaseapp.com",
  projectId: "welearn-78cd8",
  storageBucket: "welearn-78cd8.appspot.com",
  messagingSenderId: "633348087092",
  appId: "1:633348087092:web:96c98e38b46358cdcb9961"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase;

var firepadRef = firebase.database().ref();

// export const userName = prompt("What's your name?");

// export const userName = "Rname()";


const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

var firepadRefId = "";


if (roomId) {
  firepadRef = firepadRef.child(roomId);
} else {
  firepadRef = firepadRef.push();
  // window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);
  
  firepadRefId = firepadRef.key;
}

const userCallId = firepadRefId;

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const FirestoreDb = getFirestore(app);
const auth = getAuth();

export { app, auth, FirestoreDb, storage, userCallId };
export default firepadRef;