import React from 'react'
import logo from '../Private/data/LogoColcomp.png'
import '../Private/css/Logo.css'
function Logo() {
  return (
    <div className='logo'>
        <img src={logo} alt='roload' width={200} height={50} />
    </div>
  )
}

export default Logo