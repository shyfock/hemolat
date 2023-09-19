// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXd6qjyVwrluGi_MM_DKAHtse2ZKGpB48",
  authDomain: "hemolat123.firebaseapp.com",
  databaseURL: "https://hemolat123-default-rtdb.firebaseio.com",
  projectId: "hemolat123",
  storageBucket: "hemolat123.appspot.com",
  messagingSenderId: "532965912198",
  appId: "1:532965912198:web:6aa22b991a9be6f17a6b07",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export const auth = getAuth(app);
export default app;