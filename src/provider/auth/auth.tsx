import React, { createContext, useState } from 'react';
import firebase from 'firebase/app';
import { auth } from 'utils/firebase';
import { authDefault } from './default';

type AuthContextProps = {
  user: null | firebase.User;
  accessToken: null | string;
  googleSignIn: () => void;
};

export const AuthContext = createContext<AuthContextProps>(authDefault);

type AuthProviderProps = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<null | firebase.User>(null);
  const [accessToken, setAccessToken] = useState<null | string>(null);

  function googleSignIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    googleAuthProvider.addScope('profile');
    googleAuthProvider.addScope('email');
    auth.signInWithPopup(googleAuthProvider).then((result) => {
      setAccessToken((result?.credential as firebase.auth.OAuthCredential)?.accessToken ?? null);
      setUser(result?.user ?? null);
    });
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
}
