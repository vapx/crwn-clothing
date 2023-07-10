import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAMeNg4R92G2QYsoYQiNK3sRFicATrJz20",
  authDomain: "crwn-clothing-web-app-d388a.firebaseapp.com",
  projectId: "crwn-clothing-web-app-d388a",
  storageBucket: "crwn-clothing-web-app-d388a.appspot.com",
  messagingSenderId: "832343557729",
  appId: "1:832343557729:web:740d3d389fb36f5d0b8c20"
};

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
})

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, googleProvider);
};

export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid)
  console.log(userDocRef)


  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt, ...additionalInfo
      })
    } catch (error) {
      console.log(error)
    }
  }

  return userDocRef;
}

export const createEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}


export const checkUserLoggedIn = async () => {
  return await onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid
      console.log(uid)
      console.log("Logged In")
    } else {
      console.log("Not logged in")
    }
  })
}