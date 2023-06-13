import React, { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from '../../utils/firebase/firebase.utils'

const Signin = () => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await getRedirectResult(auth)
      if (response) {
        const userDocRef = createUserDocumentFromAuth(response.user)
      }
    }

    fetchData()
  }, [])

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
    console.log(user)
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  )
}

export default Signin
