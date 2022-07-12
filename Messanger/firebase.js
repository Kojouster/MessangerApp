// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCPdv3lG0s4_hEPQzeUHlSuGwwJ4rPJrwU",
    authDomain: "messangerapp-f0fe3.firebaseapp.com",
    projectId: "messangerapp-f0fe3",
    storageBucket: "messangerapp-f0fe3.appspot.com",
    messagingSenderId: "1022319080040",
    appId: "1:1022319080040:web:65dfa90f174f99747781dd",
    measurementId: "G-DKZ4BRVYC6"
  };


  // initializing firebase
  let app;
  if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)

  }
  else{
    app = firebase.app();
  }

  // saving databse access variable
  const db = app.firestore();
  //Setting up firebaase authentification variable
  const auth = firebase.auth();

  // now this allows to get acces to firebase variables
  export {db,auth};
  