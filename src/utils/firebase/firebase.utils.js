import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAMeNg4R92G2QYsoYQiNK3sRFicATrJz20",
  authDomain: "crwn-clothing-web-app-d388a.firebaseapp.com",
  projectId: "crwn-clothing-web-app-d388a",
  storageBucket: "crwn-clothing-web-app-d388a.appspot.com",
  messagingSenderId: "832343557729",
  appId: "1:832343557729:web:740d3d389fb36f5d0b8c20"
};

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const signInWithGooglePopup = () => {
  signInWithPopup(auth, provider)
}