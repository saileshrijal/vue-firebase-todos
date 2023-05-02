import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBmV5cVjkMSdKpKnh6VvubYFefBxtjdAR0",
  authDomain: "coders-todo.firebaseapp.com",
  projectId: "coders-todo",
  storageBucket: "coders-todo.appspot.com",
  messagingSenderId: "11238848338",
  appId: "1:11238848338:web:e954faf48b2dea57a8ac8b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;