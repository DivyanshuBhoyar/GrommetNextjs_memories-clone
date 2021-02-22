import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCt50k__Ew6-W24wjqqrPfy7WUEe2TstC0",
    authDomain: "memories-8d7b6.firebaseapp.com",
    projectId: "memories-8d7b6",
    storageBucket: "memories-8d7b6.appspot.com",
    messagingSenderId: "793117001141",
    appId: "1:793117001141:web:7646db0b34c8d928c005fc",
  });
} else {
  firebase.app(); // if already initialized, use that one
}
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export const auth = firebase.auth();
export const firestore = firebase.firestore();
