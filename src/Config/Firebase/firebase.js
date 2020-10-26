import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/firebase-messaging";
var firebaseConfig = {
  


    apiKey: "AIzaSyD-blRl-nBRV4_TlrXNUFFrp9vfiJfMdTk",
    authDomain: "siteeyeattendanceautomater.firebaseapp.com",
    databaseURL: "https://siteeyeattendanceautomater.firebaseio.com",
    projectId: "siteeyeattendanceautomater",
    storageBucket: "siteeyeattendanceautomater.appspot.com",
    messagingSenderId: "702598487590",
    appId: "1:702598487590:web:2bb7c2958d8f75bd8f50e7",
    measurementId: "G-13MEJVJRC9"


};

navigator.serviceWorker.register("/my-sw.js").then((registration) => {
  firebase.messaging().useServiceWorker(registration);
});

const provider = new firebase.auth.FacebookAuthProvider();

const firebaseApp = firebase.initializeApp(firebaseConfig);
export { provider, firebaseApp };

