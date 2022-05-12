import React from 'react'
import '../Private/css/LoginSign.css'
import { Link } from 'react-router-dom'
import GifLogo from './GifLogo'
function Login() {

  const float = () => {
    var data = document.getElementsByClassName('float-label-field');
    for (var i = 0; i < data.length; i++) {
      data[i].classList.add('float')
    }
  }

  return (
    <div className='Lscard' >
      <div className='login'>
        <div>
          <h1>Login</h1>
          <p>Get access to our service</p>
        </div>
        <form>
          <fieldset className='float-label-field'>
            <label htmlFor="email">Email</label>
            <input id="email" type='Email' onFocus={float} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="password">Password</label>
            <input id="password" type='password' onFocus={float} />
          </fieldset>
        </form>
        <button className='loginbutton'>Login</button>
        <p>New to HR Book Store? <Link to='/signup'>Signup</Link></p>
      </div>
      <div className='logoG'>
        <GifLogo/>
      </div>
    </div>

  )
}

export default Login