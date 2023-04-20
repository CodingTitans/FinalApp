import React, { useState } from 'react';
import AuthContext from './AuthContext';

// Define the shape of the AuthProviderProps object
type AuthProviderProps = {
  children: React.ReactNode;
};

// Define a functional component that provides authentication-related data and functions to child components
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  // Define a function that signs out the current user and clears the username and email
  const signOut = async () => {
    console.log('signing out');
    setUsername('');
    setEmail('');
    console.log('username and email cleared');
  };

  return (
    <AuthContext.Provider value={{ username, setUsername, email, setEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
