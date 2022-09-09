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

// action / redux
import { connect } from 'react-redux'
import { setCurrentUser } from './redux/User/user.actions'

class App extends React.Component {
  authListener = null

  // similler the useEffect (execute every render)
  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          })
        })
      }

      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.props

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
        </Routes>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
})
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
