import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../config/firebase';

export class AuthService {
  private readonly auth = getAuth(app);

  async signUp(email: string, password: string) {
    await createUserWithEmailAndPassword(this.auth, email, password);
  }

  // Asynchronously authenticate the user with the specified email and password
  async login(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    const user = result.user;
    if (user) {
      return {
        email: user.email || '',
        username: user.displayName || '',
      };
    } else {
      throw new Error('User not found');
    }
  }

  // Asynchronously sign out the current user
  async logout() {
    await signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  isUserLoggedIn() {
    return !!this.auth.currentUser;
  }
}
