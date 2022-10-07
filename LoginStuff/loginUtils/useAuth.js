import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase.js'



export function useAuth() {

  const [user, setUser] = React.useState('');

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}