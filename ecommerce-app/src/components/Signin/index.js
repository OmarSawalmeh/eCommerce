import React, { useState, useEffect } from 'react'
import './style.scss'
import Button from '../Forms/Button'
import FormInput from '../Forms/FormInput'
import { useNavigate } from 'react-router'
import { signinWithGoogle } from '../../firebase/utils'
import {useDispatch, useSelector} from 'react-redux'
import { signinUser, resetAllAuthForms } from './../../redux/User/user.actions'


const mapState = ({ user }) => ({
  signinSuccess: user.signinSuccess,
})

const Signin = (props) => {
  const { signinSuccess } = useSelector(mapState)
  const dispatch = useDispatch();
  const history = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if(signinSuccess){
      resetForm()
      dispatch(resetAllAuthForms())
      history('/')
    }
  }, [signinSuccess])

  const resetForm = () => {
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signinUser({ email, password }))
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
