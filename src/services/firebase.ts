import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

//const firebaseConfig = {
//apiKey: process.env.REACT_API_KEY,
//authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//databaseURL: process.env.REACT_APP_DATABASE_URL,
//projectId: process.env.REACT_APP_PROJECT_ID,
//storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//appId: process.env.REACT_APP_APP_ID,
//measurementId: process.env.REACT_APP_MEASUREMENT_ID,
//};

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv-510Y1F0H3nETUF0KTQy2Iikj9ngxvw",
  authDomain: "togetherproject-52812.firebaseapp.com",
  databaseURL: "https://togetherproject-52812-default-rtdb.firebaseio.com",
  projectId: "togetherproject-52812",
  storageBucket: "togetherproject-52812.appspot.com",
  messagingSenderId: "824610921519",
  appId: "1:824610921519:web:311b6e4e7cbe7196b8fada",
  measurementId: "G-JXG9QWTQQ1",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
