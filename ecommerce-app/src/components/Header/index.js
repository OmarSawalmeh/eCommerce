import React from 'react';
import {useSelector} from 'react-redux';
import './style.scss';
import {Link} from 'react-router-dom'
import { auth } from './../../firebase/utils'
import logo from '../../assets/logo.png';

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
})

function Header(props) {

  const { currentUser } = useSelector(mapState)

  return (
    <>
      <header className='header'>
        <div className='wrap'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt='h&m' />
            </Link>
          </div>

          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/search'>Search</Link>
              </li>
            </ul>
          </nav>

          <div className='callToActions'>
            {currentUser && (
              <ul>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <span onClick={() => auth.signOut()}>LogOut</span>
                </li>
              </ul>
            )}
            {!currentUser && (
              <ul>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <Link to='/registration'>Register</Link>
                </li>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

Header.defaultProps={
  currentUser: null
}

export default Header;