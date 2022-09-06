import React from 'react';
import './style.scss';
import {Link} from 'react-router-dom'

import logo from '../../assets/logo.png';

function Header(props) {
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
            <ul>
              <li>
                <Link to='/registration'>Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;