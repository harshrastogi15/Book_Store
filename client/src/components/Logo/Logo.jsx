import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../Private/data/LogoColcomp.png';
import './Logo.module.css';
function Logo() {
  return (
    <div className='logo'>
      <Link to='/'>
        <img src={logo} alt='roload' width={200} height={50} />
      </Link>
    </div>
  );
}

export default Logo;
