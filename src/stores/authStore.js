import { defineStore } from 'pinia'
import { ref } from 'vue'

let firebaseAuthServicesPromise = null
let firebaseFirestoreServicesPromise = null

async function getFirebaseAuthServices() {
  if (!firebaseAuthServicesPromise) {
    firebaseAuthServicesPromise = import('@/lib/firebase/auth').then((module) => module.getFirebaseAuthServices())
  }

  return firebaseAuthServicesPromise
}

async function getFirebaseFirestoreServices() {
  if (!firebaseFirestoreServicesPromise) {
    firebaseFirestoreServicesPromise = import('@/lib/firebase/firestore').then((module) => module.getFirebaseFirestoreServices())
  }

  return firebaseFirestoreServicesPromise
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthReady = ref(false)
  let authUnsubscribe = null

  // Track user in Firestore
  async function trackUserActivity(firebaseUser) {
    if (!firebaseUser) return
    try {
      const { db, doc, setDoc } = await getFirebaseFirestoreServices()
      const userRef = doc(db, 'users', firebaseUser.uid)
      await setDoc(userRef, {
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'Unknown User',
        photoURL: firebaseUser.photoURL || '',
        lastActive: new Date().toISOString()
      }, { merge: true }) // merge: true prevents overwriting other data we might add later
    } catch (e) {
      console.error("Failed to track user activity in Firestore", e)
    }
  }

  async function initAuth() {
    if (authUnsubscribe) return

    try {
      const { auth, onAuthStateChanged } = await getFirebaseAuthServices()
      authUnsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser
        isAuthReady.value = true

        if (firebaseUser) {
          trackUserActivity(firebaseUser)
        }
      })
    } catch (error) {
      console.error('Failed to initialize Firebase auth', error)
      isAuthReady.value = true
    }
  }

  initAuth()

  async function loginWithGoogle() {
    try {
      const { auth, googleProvider, signInWithPopup } = await getFirebaseAuthServices()
      const result = await signInWithPopup(auth, googleProvider)
      user.value = result.user
      return result.user
    } catch (error) {
      console.error("Google Sign-In Error:", error)
      throw error
    }
  }

  async function loginWithMicrosoft() {
    try {
      const { auth, microsoftProvider, signInWithPopup } = await getFirebaseAuthServices()
      const result = await signInWithPopup(auth, microsoftProvider)
      user.value = result.user
      return result.user
    } catch (error) {
      console.error("Microsoft Sign-In Error:", error)
      throw error
    }
  }

  async function loginWithEmail(email, password) {
    try {
      const { auth, signInWithEmailAndPassword } = await getFirebaseAuthServices()
      const result = await signInWithEmailAndPassword(auth, email, password)
      user.value = result.user
      return result.user
    } catch (error) {
      console.error("Email Sign-In Error:", error)
      throw error
    }
  }

  async function signUpWithEmail(email, password) {
    try {
      const { auth, createUserWithEmailAndPassword, sendEmailVerification } = await getFirebaseAuthServices()
      const result = await createUserWithEmailAndPassword(auth, email, password)
      user.value = result.user
      // Send verification right away
      await sendEmailVerification(result.user)
      return result.user
    } catch (error) {
      console.error("Email Sign-Up Error:", error)
      throw error
    }
  }

  async function resendVerification() {
    if (user.value) {
      const { sendEmailVerification } = await getFirebaseAuthServices()
      await sendEmailVerification(user.value)
    }
  }

  async function reloadUser() {
    const { auth } = await getFirebaseAuthServices()
    if (auth.currentUser) {
      await auth.currentUser.reload()
      user.value = auth.currentUser
    }
  }

  async function logout() {
    try {
      const { auth, signOut } = await getFirebaseAuthServices()
      await signOut(auth)
      user.value = null
    } catch (error) {
      console.error("Sign-Out Error:", error)
    }
  }

  return {
    user,
    isAuthReady,
    loginWithGoogle,
    loginWithMicrosoft,
    loginWithEmail,
    signUpWithEmail,
    resendVerification,
    reloadUser,
    logout,
    initAuth,
  }
})
