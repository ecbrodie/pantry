import firebase from "firebase"
import "@firebase/firestore"
import { ShoppingListItem } from "./types"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCO8ZB--ZPVh6_jv8FcwhEKM_cA4nvBesc",
  authDomain: "ecbrodie-pantry-dev.firebaseapp.com",
  databaseURL: "https://ecbrodie-pantry-dev.firebaseio.com",
  projectId: "ecbrodie-pantry-dev",
  storageBucket: "ecbrodie-pantry-dev.appspot.com",
}

firebase.initializeApp(firebaseConfig)

const DB = firebase.firestore()
const docRef = DB.collection("shoppingLists").doc("MAIN")

export const getCacheData = async (): Promise<ShoppingListItem[]> => {
  const document = await docRef.get()
  return document.exists ? document.data()!.items : []
}

export const setCacheData = async (items: ShoppingListItem[]) => {
  await docRef.set({ items })
}
