import React, { useState, useEffect, useContext, createContext } from 'react';
import * as firebase from 'firebase/app';
import { getAuth, signInWithPopup, GithubAuthProvider, signOut, onAuthStateChanged} from "firebase/auth";


// Initialize Firebase App
if(!firebase.getApps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

  });
}

// Create Context for Auth
const authContext = createContext();

// Create Auth from Firebase
const auth = getAuth();

// Auth Provider using Context
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Create Custom Hooks for Authetication Context
export const useAuth = () => {
  return useContext(authContext);
};

// Create Custom Hooks for Authentication Method 
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signinWithGithub = () => {
      signInWithPopup(auth, new GithubAuthProvider)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
      signOut(auth)
      .then(() => {
        setUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout
  };
}