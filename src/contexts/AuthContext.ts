import { createContext } from 'react';

// Define the shape of the AuthContext object
type AuthContextType = {
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  signOut: () => Promise<void>;
};

// Create a new context object with an initial value that corresponds to the AuthContextType shape
const AuthContext = createContext<AuthContextType>({
  username: '',
  setUsername: () => {},
  email: '',
  setEmail: () => {},
  signOut: async () => {}, 
});

export default AuthContext;
