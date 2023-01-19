import firebase from './firebase';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

const firestore = getFirestore();

export function createUser(uid, data) {
  setDoc(doc(firestore, 'users', uid), {
    uid,
    ...data
  }, { merge: true });
};