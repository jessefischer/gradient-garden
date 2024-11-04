import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCwcW4UAqvbOPugHPeVKQW-J3pJO6QQyrI",
  authDomain: "gradient-pollinator.firebaseapp.com",
  databaseURL: "https://gradient-pollinator-default-rtdb.firebaseio.com",
  projectId: "gradient-pollinator",
  storageBucket: "gradient-pollinator.firebasestorage.app",
  messagingSenderId: "818850076089",
  appId: "1:818850076089:web:4826719ea67d989606d268"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };