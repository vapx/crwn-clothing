import React from 'react'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

const Signin = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
    console.log(user)
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
    </div>
  )
}

export default Signin
