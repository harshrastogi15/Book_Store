import React from 'react'
import { Link } from 'react-router-dom'
import '../Private/css/LoginSign.css'
import GifLogo from './GifLogo';
function Signup() {
  const float = () => {
    var data = document.getElementsByClassName('float-label-field');
    for (var i = 0; i < data.length; i++) {
      data[i].classList.add('float')
    }
  }
  return (
    <div className='Lscard' >
      <div className='signup'>
        <div>
          <h1>Create account</h1>
          <p>Get access to our service</p>
        </div>
        <form>
          <fieldset className='float-label-field'>
            <label htmlFor="name">Name</label>
            <input id="name" type='text' onFocus={float} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type='number' onFocus={float} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="address">Address</label>
            <input id="address" type='text' onFocus={float} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="pincode">Pincode</label>
            <input id="pincode" type='number' onFocus={float} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="email">Email</label>
            <input id="email" type='Email' onFocus={float} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="password">Password</label>
            <input id="password" type='password' onFocus={float} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="Cpassword">Confirm Password</label>
            <input id="Cpassword" type='password' onFocus={float} />
          </fieldset>
        </form>
        <button className='signbutton'>Create</button>
        <p>Already have account? <Link to='/login'>Login</Link></p>
      </div>
      <div className='logoG'>
        <GifLogo/>
      </div>
    </div>
  )
}

export default Signup