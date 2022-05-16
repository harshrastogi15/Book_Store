import React, { useState } from 'react'
import '../Private/css/Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo';
import CartIcon from './CartIcon';
import Sidenavbar from './Sidenavbar';
function Navbar() {
  const navigate = useNavigate();
  const [togglerstate,changetooglerstate]=useState(false);

  const logoutuser = async () => {
    await localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  }

  const navtoggler=()=>{
      if(togglerstate)
      changetooglerstate(false)
      else{
        changetooglerstate(true)
      }
  }

  return (
    <div className='navbar'>
      <div className='navtoggler' onClick={navtoggler}>
            <FontAwesomeIcon icon={faBars} /> 
      </div>
      {togglerstate?<Sidenavbar tooglefunc = {navtoggler} logoutfunc= {logoutuser} />:<div/>}
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
        {localStorage.getItem('token') ?
          <div className="dropdown">
            <button className="dropbtn" type='button'>Harsh Rastogi</button>
            <div className="dropdown-content">
              <Link to="/">Profile</Link>
              <Link to="/login" onClick={logoutuser}>Logout</Link>
            </div>
          </div> :
          <div className='navauth'>
            <li>
              <Link className='navauthpath' to="/login">
                Login
              </Link>
            </li>
            <li>Or</li>
            <li><Link className='navauthpath' to="/signup">Signup</Link></li>
          </div>
        }
      </ul>
    </div>
  )
}

export default Navbar