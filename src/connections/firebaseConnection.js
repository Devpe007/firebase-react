import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyCq6Zmnh-pADLrdKF1Di1vazqQubZDe1M8",
    authDomain: "curso-c44d5.firebaseapp.com",
    projectId: "curso-c44d5",
    storageBucket: "curso-c44d5.appspot.com",
    messagingSenderId: "189452383016",
    appId: "1:189452383016:web:7d213abfa89346e62b161d",
    measurementId: "G-CE9HV4WR44"
};
  
if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};

export default firebase;