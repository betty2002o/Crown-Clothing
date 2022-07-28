import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBRehqn7-Bwc5R9wTnpP_3I4XuKWVmvabU',
  authDomain: 'crown-clothing-db-d87cf.firebaseapp.com',
  projectId: 'crown-clothing-db-d87cf',
  storageBucket: 'crown-clothing-db-d87cf.appspot.com',
  messagingSenderId: '941351849522',
  appId: '1:941351849522:web:80ec4c16c7000feb91362b',
};
export const SignOutUser = async () => await signOut(auth);


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
export const SignInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async (collectionKey) => {
  const q = query(collection(db, 'collections'));
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const docRef = doc(db, 'users', userAuth.uid);

  const userSnapShot = await getDoc(docRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(docRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return docRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailandPassord = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
