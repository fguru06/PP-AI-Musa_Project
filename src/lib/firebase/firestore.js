import { collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, setDoc, writeBatch } from 'firebase/firestore'
import { getFirebaseApp } from './app'

let firestoreServices = null

export function getFirebaseFirestoreServices() {
  if (!firestoreServices) {
    const app = getFirebaseApp()
    firestoreServices = {
      db: getFirestore(app),
      collection,
      deleteDoc,
      doc,
      getDocs,
      onSnapshot,
      setDoc,
      writeBatch,
    }
  }

  return firestoreServices
}