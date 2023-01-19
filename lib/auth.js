import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import { createUser } from './db';
import { getAuth, signInWithPopup, GithubAuthProvider, signOut, onAuthStateChanged} from "firebase/auth";

// Create Context for Auth
const authContext = createContext();

// Create Auth from Firebase
const auth = getAuth();

// Auth Provider using Context
export function AuthProvider({ children }) {
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

  // Handle for for user
  const handleUser = (rawUser) => {
    if(rawUser) {
      const user = formatUser(rawUser);

      // Add user to firestore database
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  }

  const signinWithGithub = () => {
      signInWithPopup(auth, new GithubAuthProvider)
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signout = () => {
      signOut(auth)
      .then(() => {
        handleUser(false);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout
  };
}

// Format user for only field below
const formatUser = (user) => {
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoURL: user.photoURL
  };
};