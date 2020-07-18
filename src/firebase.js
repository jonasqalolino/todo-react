import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDW6Ux9rMN-90kNJLNLSM1F21B-0upr11w',
  authDomain: 'todo-react-2bdac.firebaseapp.com',
  databaseURL: 'https://todo-react-2bdac.firebaseio.com',
  projectId: 'todo-react-2bdac',
  storageBucket: 'todo-react-2bdac.appspot.com',
  messagingSenderId: '260567756967',
  appId: '1:260567756967:web:e2af809df88d2987742b82',
  measurementId: 'G-1318L13P6Q',
});

const db = firebaseApp.firestore();

export default db;
