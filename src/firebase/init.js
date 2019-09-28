import firebase from 'firebase/app'
import 'firebase/auth'

// The configuration below is not sensitive data. You can serenely add your config here
const config = {
  apiKey: "AIzaSyD50QJZZNQt9CLAaBMJkxdHI2uiW_K4eio",
  authDomain: "hackatrix-7813c.firebaseapp.com",
  databaseURL: "https://hackatrix-7813c.firebaseio.com",
  projectId: "hackatrix-7813c",
  storageBucket: "",
  messagingSenderId: "254918565521",
  appId: "1:254918565521:web:40143c6c4ba3cd351ca930"
};

export const mainApp = firebase.initializeApp(config);
