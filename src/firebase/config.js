import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAh1eQo7TPcO6_fNf_Jdx6_xyfe7jng5tE",
    authDomain: "pwa-exam.firebaseapp.com",
    projectId: "pwa-exam",
    storageBucket: "pwa-exam.appspot.com",
    messagingSenderId: "692469282733",
    appId: "1:692469282733:web:b5c9093ef760e6890a9324"
  };

  // init firebase
  firebase.initializeApp(firebaseConfig)

  // init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  // timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp

  export { projectFirestore, projectAuth, projectStorage, timestamp }