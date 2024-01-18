import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC35eJOBswMhSEr3ph9gHqcscbAMYXS9qs",
  authDomain: "thyroid-405309.firebaseapp.com",
  projectId: "thyroid-405309",
  storageBucket: "thyroid-405309.appspot.com",
  messagingSenderId: "494514960560",
  appId: "1:494514960560:web:dddcc91b169f53d01be375",
  measurementId: "G-2C1DZDKSVL",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
