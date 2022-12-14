import React from 'react'
import { Link } from 'react-router-dom';
import ShopMen from './../../assets/shopMens.jpg';
import ShopWomen from './../../assets/shopWomens.jpg'
import './style.scss'


function Directory(props) {
  return (
    <div className='directory'>
      <div className='wrap'>
        <div className='item' style={{ backgroundImage: `url(${ShopWomen})` }}>
          <a href='/search/womens'>
            <Link to={'/search/womens'}>Shop Womens</Link>
          </a>
        </div>

        <div className='item' style={{ backgroundImage: `url(${ShopMen})` }}>
          <a href=''>
            <Link to={'/search/mens'}>Shop Mens</Link>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Directory