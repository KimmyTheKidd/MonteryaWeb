'use client';
import { useContext, createContext, useState, useEffect } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from '@firebase/auth';
import { auth } from './firebase';
import LoadingScreen from '../components/LoadingScene/LoadingScreen';
import { fetchplayerInfo } from '@/components/authentication/auth-server-action/authorsie';
import { signupWithOAuth } from '@/components/authentication/auth-server-action/signup';

// displayName
// email
// emailVerified
// timeCreated
// userId
// username
// usertype

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currentuser, setCurrentUser] = useState(null);
  const [authorise, setAuthorise] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isGameOpen, setisGameOpen] = useState(false);

  const isAuthed = () =>
    new Promise((resolve, reject) => {
      globalAuthHandler = resolve;
    });

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const data = await signInWithPopup(auth, provider);

      if (!data || data.error) {
        console.error(
          'No user data received or there was an error:',
          data ? data.error : 'Unknown error'
        );
        return { success: false, errorType: 'NO_USER_DATA' };
      }

      // Check if the email domain is correct
      const email = data.user.email;
      // if (!email.endsWith('@woxacorp.com')) {
      //   console.error('You must use a woxacorp.com email address.');
      //   await signOut(auth);
      //   return { success: false, errorType: 'INVALID_EMAIL_DOMAIN' };
      // }

      await signupWithOAuth(data.user);

      return { success: true };
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      return { success: false, errorType: 'SIGN_IN_ERROR' }; // Ensure the function returns error type if there's an error
    }
  };

  const SetGameState = async (param) => {
    setisGameOpen(param);
  };

  const logOut = () => {
    signOut(auth);
    return true;
  };

  useEffect(() => {
    const SetPlayerInfo = async (currentUser) => {
      try {
        const setInfo = await fetchplayerInfo(currentUser.uid);
        // console.log(setInfo);
        setCurrentUser(setInfo);
      } catch (error) {
        console.log(error.message);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        SetPlayerInfo(currentUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        setisGameOpen(false);
        setAuthorise(false);
      }
    });

    return () => unsubscribe();
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        user,
        currentuser,
        googleSignIn,
        logOut,
        SetGameState,
        isGameOpen,
        authorise,
      }}
    >
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
