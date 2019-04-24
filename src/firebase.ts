import firebase from "firebase"
import "@firebase/firestore"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCO8ZB--ZPVh6_jv8FcwhEKM_cA4nvBesc",
  authDomain: "ecbrodie-pantry-dev.firebaseapp.com",
  databaseURL: "https://ecbrodie-pantry-dev.firebaseio.com",
  projectId: "ecbrodie-pantry-dev",
  storageBucket: "ecbrodie-pantry-dev.appspot.com",
}

firebase.initializeApp(firebaseConfig)

export const DB = firebase.firestore()
