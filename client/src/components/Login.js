import React, { useEffect, useState } from 'react'
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

  const [logindetail, updatelogin] = useState({
    email: "",
    password: ""
  })
  const [warningEmail, updateWarningEmail] = useState("");
  const [warningPass, updateWarningPass] = useState("");
  const updatevalue = (event) => {
    updatelogin({ ...logindetail, [event.target.name]: event.target.value });
  };

  const validateemail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    var check = pattern.test(email);
    if (check) { return true; }
    return false;
  }

  useEffect(() => {
    var valide = validateemail(logindetail.email);
    if (!valide && logindetail.email.length > 0) {
      updateWarningEmail("Invalid Email");
    } else {
      updateWarningEmail("")
    }

    if(logindetail.password.length > 0 && logindetail.password.length<5){
      updateWarningPass("There should be minimum 5 letter in password");
    }else{
      updateWarningPass("")
    }

  })

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
            <input id="email" type='Email' onFocus={float} name='email' value={logindetail.email} onChange={e => updatevalue(e)} />
            <p className='warning'>{warningEmail}</p>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="password">Password</label>
            <input id="password" type='password' onFocus={float} name='password' value={logindetail.password} onChange={e => updatevalue(e)} />
            <p className='warning'>{warningPass}</p>
          </fieldset>
        </form>
        <button className='loginbutton'>Login</button>
        <p>New to HR Book Store? <Link to='/signup'>Signup</Link></p>
      </div>
      <div className='logoG'>
        <GifLogo />
      </div>
    </div>

  )
}

export default Login