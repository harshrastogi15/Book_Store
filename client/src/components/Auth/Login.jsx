import React, {useEffect, useState} from 'react';
import '../../Private/css/LoginSign.css';
import {Link, useNavigate} from 'react-router-dom';
import {GifLogo1} from '../Logo/GifLogo';
import Loader from '../../loader/Loader';
import {urlauth} from '../../Appurl';

function Login() {
  const float = () => {
    const data = document.getElementsByClassName('float-label-field');
    for (let i = 0; i < data.length; i++) {
      data[i].classList.add('float');
    }
  };
  const [Isloding, updateLoding] = useState(false);

  const [logindetail, updatelogin] = useState({
    email: '',
    password: '',
  });
  const [warning, updateWarning] = useState('');
  const [warningEmail, updateWarningEmail] = useState('');
  const [warningPass, updateWarningPass] = useState('');

  const navigate = useNavigate();

  const updatevalue = (event) => {
    updatelogin({...logindetail, [event.target.name]: event.target.value});
  };

  const validateemail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const check = pattern.test(email);
    if (check) {
      return true;
    }
    return false;
  };

  const onclickLogin = async () => {
    updateWarning('Loading ...');
    updateLoding(true);
    await fetch(`${urlauth}/login`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(logindetail),
        },
    )
        .then((response) => response.json())
        .then((data) => {
        // console.log(data)
          if (data.status!==0) {
            updateWarning('Wrong Email or Password');
          } else {
            updateWarning('');
            localStorage.setItem('token', data.authtoken);
            window.location.reload();
          }
        })
        .catch(() => {
          updateWarning('Something is wrong');
        });
    updateLoding(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onclickLogin();
    }
  };


  useEffect(() => {
    const valide = validateemail(logindetail.email);
    if (!valide && logindetail.email.length > 0) {
      updateWarningEmail('Invalid Email');
    } else {
      updateWarningEmail('');
    }

    if (logindetail.password.length > 0 && logindetail.password.length < 5) {
      updateWarningPass('There should be minimum 5 letter in password');
    } else {
      updateWarningPass('');
    }
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [logindetail.email, logindetail.password.length], navigate);

  return (
    <div className='Lscard' >
      {Isloding?
        <Loader/>:<div></div>
      }
      <div className='login'>
        <div>
          <h1>Login</h1>
          <p>Get access to our service</p>
          <p className='warning'>{warning}</p>
        </div>
        <form onKeyDown={handleKeyPress}>
          <fieldset className='float-label-field'>
            <label htmlFor="email">Email</label>
            <input id="email" type='Email' onFocus={float} name='email' value={logindetail.email} onChange={(e) => updatevalue(e)} />
            <p className='warning'>{warningEmail}</p>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="password">Password</label>
            <input id="password" type='password' onFocus={float} name='password' value={logindetail.password} onChange={(e) => updatevalue(e)} />
            <p className='warning'>{warningPass}</p>
          </fieldset>
        </form>
        <button className='loginbutton' type='button' onClick={onclickLogin}>Login</button>
        <p>New to HR Book Store? <Link to='/signup'>Signup</Link></p>
      </div>
      <div className='logoG'>
        <GifLogo1 />
      </div>
    </div>

  );
}

export default Login;
