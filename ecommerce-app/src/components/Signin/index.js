import React, { useState } from 'react'
import './style.scss'
import Button from '../Forms/Button'
import FormInput from '../Forms/FormInput'
import { signinWithGoogle, auth } from '../../firebase/utils'

const Signin = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
      resetForm()
    } catch (error) {
      //console.log(error);
    }
  }

  return (
    <div className='signin'>
      <div className='wrap'>
        <h2>Login</h2>

        <div className='formWrap'>
          <form onSubmit={handleSubmit}>
            <FormInput
              type='email'
              name='email'
              value={email}
              placeholder='Email'
              handleChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              type='password'
              name='password'
              value={password}
              placeholder='Password'
              handleChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit'>Log in</Button>
            <div className='socialSignin'>
              <div className='row'>
                <Button onClick={signinWithGoogle}>Sign in with Google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
