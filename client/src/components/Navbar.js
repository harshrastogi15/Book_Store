import React from 'react'
import '../Private/css/Navbar.css'
import { Link } from 'react-router-dom';
import Logo from './Logo';
function Navbar() {
  return (
    <div className='navbar'>
      <Logo/>
      <ul className='navlinks'>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li><Link to="/search">Search</Link></li>
          <li><Link to="/about">About</Link></li>
      </ul>
      <div className='navauth'>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
      </div>
    </div>
  )
}

export default Navbar