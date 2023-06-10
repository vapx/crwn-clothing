import React from 'react'
import { signInWithGooglePopup } from '../../utils/firebase/firebase.utils'

const Signin = () => {
  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup()
    console.log(response)
  }
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
    </div>
  )
}

export default Signin
