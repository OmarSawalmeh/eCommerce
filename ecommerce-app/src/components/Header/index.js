import React from 'react';
import {useSelector} from 'react-redux';
import './style.scss';
import {Link} from 'react-router-dom'
import { auth } from './../../firebase/utils'
import logo from '../../assets/logo.png';
import {selectCartItemsCount} from './../../redux/Cart/cart.selectors'

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItem: selectCartItemsCount(state),
})


function Header(props) {

  const { currentUser, totalNumCartItem } = useSelector(mapState)

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
            <ul>
              <li>
                <Link to='/cart' className='cart'>
                  <strong>Your Cart({totalNumCartItem})</strong>
                </Link>
              </li>
              {currentUser && [
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>,
                <li>
                  <span onClick={() => auth.signOut()}>LogOut</span>
                </li>,
              ]}
              {!currentUser && [
                <li>
                  <Link to='/registration'>Register</Link>
                </li>,
                <li>
                  <Link to='/login'>Login</Link>
                </li>,
              ]}
            </ul>
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