import React from 'react'
import '../Private/css/Navbar.css'
import { Link } from 'react-router-dom';
import Logo from './Logo';
import CartIcon from './CartIcon';
function Navbar() {
  return (
    <div className='navbar'>
      <Logo />
      <ul className='navlinks'>
        <li>
          <Link className='navlinkpath' to="/">Home</Link>
        </li>
        <li><Link className='navlinkpath' to="/search">Search</Link></li>
        <li><Link className='navlinkpath' to="/about">About</Link></li>
      </ul>
      <CartIcon />
      <ul className='navauth'>
        <li>
          <Link className='navauthpath' to="/login">
            Login
          </Link>
        </li>
        <li>Or</li>
        <li><Link className='navauthpath' to="/signup">Signup</Link></li>
      </ul>
    </div>
  )
}

export default Navbar