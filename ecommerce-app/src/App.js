import React, {useEffect} from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'

// hoc
import WithAuth from './hoc/withAuth'

// layouts
import MainLayout from './layout/MainLayout'
import HomepageLayout from './layout/HomepageLayout'

// pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

// style
import './default.scss'

// action / redux
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from './redux/User/user.actions'

const App = props => {
  const dispatch = useDispatch();

  useEffect(()=>{
      const authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          }))
        })
      }

      dispatch(setCurrentUser(userAuth))
    })

    return()=>{
      authListener();
    }
  }, [])

    return (
      <div className='App'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <HomepageLayout>
                <Homepage />
              </HomepageLayout>
            }
          />
          <Route
            path='/registration'
            element={
              <MainLayout>
                <Registration />
              </MainLayout>
            }
          />
          <Route
            path='/login'
            element={
              <MainLayout>
                <Login />
              </MainLayout>
            }
          />
          <Route
            path='/dashboard'
            element={
              //<WithAuth>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              //</WithAuth>
            }
          />
        </Routes>
      </div>
    )
  }

export default App
