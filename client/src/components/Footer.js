import React from 'react'
import '../Private/css/Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <div className='footerSection'>
        <div className='footerSecA'>
          <Link to='/'>Home</Link>
          <Link to='/search'>Search</Link>
          <Link to='/user'>Profile</Link>
          <Link to='/favourite'>Favourite</Link>
          <Link to='/user'>Reviews</Link>
          <Link to='/about'>Help</Link>
        </div>
        <div className='footerSecA'>
          <Link to='/category/All'>All books</Link>
          <Link to='/category/Novel'>Novel</Link>
        </div>
        <div className='footerSecA'>
        </div>
        <div className='footerSecB'>
          <p>
            If you have any book details that are not available
            on our platform. you can inform us by sending a mail
          </p>
          <Link to='/mail' >Click Here</Link>
        </div>
      </div>
      <div className='copyright'>
        <a rel="noreferrer" href='https://harshrastogi15.github.io/Personal/' target='_blank'>Harsh Rastogi</a>
        <p>Copyright reserved </p>
      </div>
    </div>
  )
}

export default Footer