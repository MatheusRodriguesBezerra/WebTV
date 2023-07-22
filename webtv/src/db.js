import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4fBLIdPIT9YJJ5f9hqAvlFaNt2RN3eu0",
  authDomain: "webtv-b37ee.firebaseapp.com",
  projectId: "webtv-b37ee",
  storageBucket: "webtv-b37ee.appspot.com",
  messagingSenderId: "553920112389",
  appId: "1:553920112389:web:6048cbeadc2eee0199b96c",
  measurementId: "G-8CDKFPWX8B"
};

firebase.initializeApp(firebaseConfig);

export default firebase;