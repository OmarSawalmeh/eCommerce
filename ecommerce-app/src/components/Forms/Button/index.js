import React from 'react'
import './style.scss'

function Button({children, ...otherProps}) {
  return (
    <button className='btn' {...otherProps}>
      {children}
    </button>
  )
}

export default Button