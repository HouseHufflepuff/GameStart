import React from 'react';
import { useAuth } from './loginUtils/useAuth.js';
import LoggedInStack from './LoggedInStack';
import AuthStack from './AuthStack';

export default function RootNavigation() {
  const { user } = useAuth();

  return user ? <LoggedInStack /> : < AuthStack />;
}


//add this to app.js to handle stack