import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCuUVzM7CwJ0QEQ4OvvKc06nJ8vIn0ylC0",
  authDomain: "socialfamily-9d867.firebaseapp.com",
  databaseURL: "https://socialfamily-9d867.firebaseio.com",
  projectId: "socialfamily-9d867",
  storageBucket: "socialfamily-9d867.appspot.com",
  messagingSenderId: "937726381992",
  appId: "1:937726381992:web:4cd50985c1316a439e979d",
  measurementId: "G-8YSLX7Q1RJ",
}

firebase.initializeApp(firebaseConfig)
export default firebase
