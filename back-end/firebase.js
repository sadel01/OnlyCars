// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBgikcE00VlQ8DlEEBGpZJahWnaONoD3cY',
  authDomain: 'onlycars-b8137.firebaseapp.com',
  projectId: 'onlycars-b8137',
  storageBucket: 'onlycars-b8137.appspot.com',
  messagingSenderId: '538165779065',
  appId: '1:538165779065:web:de1867cef2ea83874112a8',
  measurementId: 'G-3QLSP8PRMV'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)