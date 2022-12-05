import React from 'react'
import './header.css'

const Header = () => {
  return (
    <div className='header-container'>
      <div className='header-logo'>
        <span>BOUTIQUE</span>
      </div>
      <div className='header-buttons'>
        <a href="/signin">Sign Out</a>
      </div>
    </div>
  )
}

export default Header