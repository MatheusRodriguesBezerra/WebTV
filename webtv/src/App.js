import './components/all.css';
import { AppRoutes } from "./routes";

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

function App() {
  return (
    <AppRoutes />
  );
}

export default App;
