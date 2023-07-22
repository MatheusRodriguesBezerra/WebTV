// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4fBLIdPIT9YJJ5f9hqAvlFaNt2RN3eu0",
  authDomain: "webtv-b37ee.firebaseapp.com",
  projectId: "webtv-b37ee",
  storageBucket: "webtv-b37ee.appspot.com",
  messagingSenderId: "553920112389",
  appId: "1:553920112389:web:6048cbeadc2eee0199b96c",
  measurementId: "G-8CDKFPWX8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);