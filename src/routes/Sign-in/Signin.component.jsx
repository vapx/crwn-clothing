import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  checkUserLoggedIn,
} from '../../utils/firebase/firebase.utils'
import SignupForm from '../../components/sign-up-form/signup-form.component'

const Signin = () => {
  let navigate = useNavigate()
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    createUserDocumentFromAuth(user)
    console.log(user)
  }

  useEffect(() => {
    checkUserLoggedIn()
    // const existing = checkUserLoggedIn()
    // if (existing) {
    //   navigate('/')
    // } else {
    //   navigate('/sign-in')
    // }
  }, [])

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with google</button>
      <SignupForm />
    </div>
  )
}

export default Signin
