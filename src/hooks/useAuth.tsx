import React, { useState, useEffect, useContext, createContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { User } from 'firebase';
import { firebaseConfig } from '../firebase/firebase.config';

interface ProviderProps {
  children: React.ReactNode;
}

interface ContextValue {
  user: User;
  signOut(): Promise<void>;
  signInWithGoogle(): Promise<void>;
}

firebase.initializeApp(firebaseConfig);
const AuthContext = createContext<ContextValue>({} as ContextValue);

const createUserProfileDocument = async (userAuth: User) => {
  if (!userAuth) return;

  const userRef = firebase
    .firestore()
    .collection('users')
    .doc(userAuth.uid);
  const snapShot = await userRef.get();
  const currentTime = firebase.firestore.FieldValue.serverTimestamp();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;

    await userRef.set({
      displayName,
      email,
      photoURL,
      createdAt: currentTime,
      updatedAt: currentTime,
      lastAccessedAt: currentTime
    });
  } else {
    await userRef.set({ lastAccessedAt: currentTime }, { merge: true });
  }
  return userRef;
};

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async userAuth => {
        if (userAuth) {
          setUser(userAuth);
          await createUserProfileDocument(userAuth);
        } else {
          setUser(null);
        }
      });
    return unregisterAuthObserver;
  }, []);

  const signOut = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({ prompt: 'select_account' });
  const signInWithGoogle = () =>
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      });

  return {
    user,
    signOut,
    signInWithGoogle
  };
};

export const AuthProvider = ({ children }: ProviderProps) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
export const useAuth = () => useContext(AuthContext);
