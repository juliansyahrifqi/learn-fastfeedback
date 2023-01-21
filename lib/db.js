import firebase from './firebase';
import { addDoc, collection, doc, getFirestore, setDoc } from 'firebase/firestore';

const firestore = getFirestore();

export function createUser(uid, data) {
  setDoc(doc(firestore, 'users', uid), {
    uid,
    ...data
  }, { merge: true });
};

export function createSite(data) {
  addDoc(collection(firestore, 'sites'), {
    data
  });
}