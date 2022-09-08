import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { auth, handleUserProfile } from './firebase/utils'

// layouts
import MainLayout from './layout/MainLayout'
import HomepageLayout from './layout/HomepageLayout'

// pages
import Homepage from './pages/Homepage'
import Registration from './pages/Registration'
import Login from './pages/Login'

// style
import './default.scss'

const initialState = {
  currentUser: null
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState,
    }
  }
  authListener = null
  

  // similler the useEffect (execute every render)
  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot=>{
          this.setState({
            currentUser:{
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      })
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {

    const {currentUser} = this.state

    return (
      <div className='App'>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            }
          />
          <Route
            path='/registration'
            element={
              <MainLayout currentUser={currentUser}>
                <Registration />
              </MainLayout>
            }
          />
          <Route
            path='/login'
            element={
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            }
          />
  
        </Routes>
      </div>
    )
  }
}

export default App
