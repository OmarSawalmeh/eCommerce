import React from 'react';
import './style.scss';

import logo from '../../assets/logo.png';

function Header(props) {
  return (
    <>
      <header className='header'>
        <div className='wrap'>
          <div className='logo'>
            <img src={logo} alt='h&m' />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header;