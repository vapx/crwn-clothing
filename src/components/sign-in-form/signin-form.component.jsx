import React, { useContext, useState } from 'react'
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './signin-form.styles.scss'
import Button from '../button/button.component'
import { UserContext } from '../../context/user.context'

const initialValues = {
  email: '',
  password: '',
}

const SigninForm = () => {
  const [formFields, setFormFields] = useState(initialValues)
  const { email, password } = formFields
  const { setCurrentUser } = useContext(UserContext)

  const resetForm = () => {
    setFormFields(initialValues)
  }

  const loginGoogleUser = async e => {
    e.preventDefault()
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const submitUser = async e => {
    e.preventDefault()
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      setCurrentUser(user)
      resetForm()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for this email')
          break
        case 'auth/email-already-in-use':
          alert('Email Already Exist')
          break
        case 'auth/user-not-found':
          alert('no user associated with this email')
          break
        default:
          console.log(error)
      }
    }
  }

  const handleAuthChange = event => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-in-container">
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
        <div className="buttons-container">
          <Button type="submit" buttonType="inverted">
            Sign In
          </Button>
          <Button onClick={loginGoogleUser} buttonType="google" type="button">
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm
