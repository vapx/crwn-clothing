import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  checkUserLoggedIn,
} from '../../utils/firebase/firebase.utils'
import SignupForm from '../../components/sign-up-form/signup-form.component'
import SigninForm from '../../components/sign-in-form/signin-form.component'



const Authentication = () => {
  let navigate = useNavigate()
  

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
      <SignupForm />
      <SigninForm />
    </div>
  )
}

export default Authentication
