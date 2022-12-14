import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function HomepageLayout(props) {
  return (
    <div className='fullheight'>
      <Header {...props}/>
         {props.children}
      <Footer />
    </div>
  )
}

export default HomepageLayout
