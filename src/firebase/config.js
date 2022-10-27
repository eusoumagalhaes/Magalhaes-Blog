import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo0mArI9LVBumy1MoISre_Q3eEJd_Nao8",
  authDomain: "blog-d06a7.firebaseapp.com",
  projectId: "blog-d06a7",
  storageBucket: "blog-d06a7.appspot.com",
  messagingSenderId: "1030464580359",
  appId: "1:1030464580359:web:9a042f97cb55c0d18df3a2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db }