import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from 'firebase/auth'
import { getFirebaseApp } from './app'

let authServices = null

export function getFirebaseAuthServices() {
  if (!authServices) {
    const app = getFirebaseApp()
    authServices = {
      auth: getAuth(app),
      googleProvider: new GoogleAuthProvider(),
      microsoftProvider: new OAuthProvider('microsoft.com'),
      signInWithRedirect,
      getRedirectResult,
      signOut,
      onAuthStateChanged,
      createUserWithEmailAndPassword,
      signInWithEmailAndPassword,
      sendEmailVerification,
      sendPasswordResetEmail,
    }
  }

  return authServices
}