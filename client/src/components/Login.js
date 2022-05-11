import React, { useEffect } from 'react'
import '../Private/css/Login.css'
function Login() {

  useEffect(()=>{
    
  })

  const float=()=>{
    var data = document.getElementsByClassName('float-label-field');
    for(var i=0;i<data.length;i++){
      data[i].classList.add('float')
    }
  }

  return (
    <div className='Lscard' >
      <div className='login'>
        <div>Login</div>
        <p>Get access to our service</p>
        <form>
          <fieldset className='float-label-field'>
            <label htmlFor="email">Email</label>
            <input id="email" type='Email' onFocus={float}/>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="password">Password</label>
            <input id="password" type='password' onFocus={float}/>
          </fieldset>
        </form>
      </div>
      <div></div>
    </div>

  )
}

export default Login