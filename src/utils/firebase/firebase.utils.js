import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"
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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  console.log(userDocRef)


  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt
      })
    } catch (error) {
      console.log(error)
    }
  }

  return userDocRef;
}