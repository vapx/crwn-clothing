import React, { useState } from 'react'
import {
  createEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
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
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit={submitUser}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleAuthChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={handleAuthChange}
          name="email"
        />
        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleAuthChange}
          name="password"
          value={password}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleAuthChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignupForm
