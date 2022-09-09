import React from 'react';
import {connect} from 'react-redux';
import './style.scss';
import {Link} from 'react-router-dom'
import { auth } from './../../firebase/utils'
import logo from '../../assets/logo.png';

function Header(props) {

  const { currentUser  } = props;

  return (
    <>
      <header className='header'>
        <div className='wrap'>
          <div className='logo'>
            <Link to='/'>
              <img src={logo} alt='h&m' />
            </Link>
          </div>

          <div className='callToActions'>
            {currentUser && (
              <ul>
                <li>
                  <span onClick={()=> auth.signOut()}>
                    LogOut
                  </span>
                </li>
              </ul>
            )}
            {!currentUser && (
              <ul>
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

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps, null)(Header);