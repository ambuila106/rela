import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBq6EE8P1jXvAilEttEb0zAjFwGAzw0VXU",
    authDomain: "rela-d975b.firebaseapp.com",
    projectId: "rela-d975b",
    storageBucket: "rela-d975b.appspot.com",
    messagingSenderId: "22055814208",
    appId: "1:22055814208:web:03a096b25474169ae48ba5",
    measurementId: "G-5JRSLYFG31"
  };

firebase.initializeApp(firebaseConfig);



export default class Api {
    dbRef = firebase.database().ref();
    getDatabase(name) {
        return this.dbRef.child(name).get();
    }
}