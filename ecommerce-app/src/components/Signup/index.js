import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { signupUser, resetAllAuthForms } from './../../redux/User/user.actions'
import { useNavigate } from 'react-router'
import './style.scss'

import FormInput from '../Forms/FormInput'
import Button from '../Forms/Button'

const mapState = ({user})=>({
  signupSuccess: user.signupSuccess,
  signupError: user.signupError
})

const Signup = (props) => {
  const {signupSuccess, signupError} = useSelector(mapState)
  const dispatch = useDispatch();
  const history = useNavigate();
  
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(()=>{
    if(signupSuccess){
      resetState();
      dispatch(resetAllAuthForms())
      history('/')
    }
  }, [signupSuccess])

  useEffect(()=>{
    if(Array.isArray(signupError) && signupError.length>0){
      setErrors(signupError);
    }
  }, [signupError])

  const resetState = () => {
    setDisplayName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors([])
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    dispatch(signupUser({ 
      displayName,
      email,
      password,
      confirmPassword
    }))

  }

  return (
    <div className='signup'>
      <div className='wrap'>
        <h2>Signup</h2>

        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => {
              return <li key={index}>{err}</li>
            })}
          </ul>
        )}

        <div className='formWrap'>
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type='text'
              name='displayName'
              value={displayName}
              placeholder='Full name'
              handleChange={(e) => setDisplayName(e.target.value)}
            />

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

            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              placeholder='Confirm Password'
              handleChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button type='submit'>Register</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
