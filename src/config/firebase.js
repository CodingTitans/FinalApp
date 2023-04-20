import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';


// Firebase project configuration object
const firebaseConfig = {
  apiKey: 'AIzaSyBUNUy2R9cpQ6K9mWAOYQfVYvN-hTI0xT4',
  authDomain: 'mvcauth-8c9f5.firebaseapp.com',
  projectId: 'mvcauth-8c9f5',
  storageBucket: 'mvcauth-8c9f5.appspot.com',
  messagingSenderId: '1062003614338',
  appId: '1:1062003614338:web:352bed2e77cd597944ca9b',
};

// Initialize the Firebase app with the configuration object
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};
