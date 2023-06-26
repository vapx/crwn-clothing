import React, { useState } from 'react'
import {
  createEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import './signup-form.styles.scss'
import Button from '../button/button.component'

const initialValues = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignupForm = () => {
  const [formFields, setFormFields] = useState(initialValues)
  const { displayName, email, password, confirmPassword } = formFields

  const resetForm = () => {
    setFormFields(initialValues)
  }
  const submitUser = async e => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Password and confirm password does not match')
    }
    try {
      const { user } = await createEmailAndPassword(
        formFields.email,
        formFields.password,
      )

      await createUserDocumentFromAuth(user, { displayName })
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
      <h2>Don't have an account</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={submitUser}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleAuthChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleAuthChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit" buttonType="inverted">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

export default SignupForm
