// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check"
import { createContext, useContext, useEffect, useState } from "react";
// import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
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
// window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
// export const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaEnterpriseProvider("6Ldz0S0pAAAAABqnXzpT4Hzp4nzMsBBRbLhTAOcM"),
//   isTokenAutoRefreshEnabled: true
// })

// const analytics = getAnalytics(app);
// const database = getDatabase(app);
// const auth = getAuth();
export const auth = getAuth(app);
export const AuthContext = createContext();

export const AuthContextProvider = ({children, ...props}) => {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const unsubscribe = () => 
      onAuthStateChanged(getAuth(), setUser, setError)
    return unsubscribe
  }, [])
  return <AuthContext.Provider value={{user, error}} {...props}>{children}</AuthContext.Provider>
}

export const useAuthState = () => {
  const authed = useContext(AuthContext)
  console.log(authed)
  return { ...authed }
}

export default app;