import React from 'react';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const GoogleSignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("User signed in: ", user);
    } catch (error) {
      console.error("Error signing in with Google: ", error.message);
    }
  };

  return (
    <button onClick={handleGoogleSignIn}>Sign in with Google</button>
  );
};

export default GoogleSignIn;
