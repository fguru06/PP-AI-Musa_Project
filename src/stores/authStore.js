import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, db, googleProvider, microsoftProvider, signInWithPopup, signOut, onAuthStateChanged } from '@/firebase'
import { doc, setDoc } from 'firebase/firestore'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthReady = ref(false)

  // Track user in Firestore
  async function trackUserActivity(firebaseUser) {
    if (!firebaseUser) return
    try {
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

  // Listen to auth state changes
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
    isAuthReady.value = true
    
    if (firebaseUser) {
      trackUserActivity(firebaseUser)
    }
  })

  async function loginWithGoogle() {
    try {
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
      const result = await signInWithPopup(auth, microsoftProvider)
      user.value = result.user
      return result.user
    } catch (error) {
      console.error("Microsoft Sign-In Error:", error)
      throw error
    }
  }

  async function logout() {
    try {
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
    logout
  }
})
