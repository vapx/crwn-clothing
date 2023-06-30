import React, { useState } from 'react'
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './signin-form.styles.scss'
import Button from '../button/button.component'

const initialValues = {
  email: '',
  password: '',
}

const SigninForm = () => {
  const [formFields, setFormFields] = useState(initialValues)
  const { email, password } = formFields

  const resetForm = () => {
    setFormFields(initialValues)
  }

  const loginGoogleUser = async e => {
    e.preventDefault()
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
    console.log('Test')
  }

  const submitUser = async e => {
    e.preventDefault()
    try {
      resetForm()
    } catch (error) {
      error.code === 'auth/email-already-in-use' && alert('Email Already Exist')
    }
  }

  const handleAuthChange = event => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitUser}>
        <FormInput
          label="Email"
          type="email"
          value={email}
          required
          onChange={handleAuthChange}
          name="email"
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleAuthChange}
          name="password"
          value={password}
        />
        <Button type="submit">Sign In</Button>
        <Button onClick={loginGoogleUser} buttonType="google" type="button">
          Google sign in
        </Button>
      </form>
    </div>
  )
}

export default SigninForm
