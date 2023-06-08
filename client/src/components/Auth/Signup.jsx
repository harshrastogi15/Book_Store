import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {urlauth} from '../../Appurl';
import '../../Private/css/LoginSign.css';
import {GifLogo1} from '../Logo/GifLogo';
function Signup() {
  const float = () => {
    const data = document.getElementsByClassName('float-label-field');
    for (let i = 0; i < data.length; i++) {
      data[i].classList.add('float');
    }
  };

  const [signupDetail, updateSignup] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    Cpassword: '',
  });

  const [warning, updateWarning] = useState('');
  const [warningEmail, updateWarningEmail] = useState('');
  const [warningPass, updateWarningPass] = useState('');
  const [warningCPass, updateWarningCPass] = useState('');

  const navigate = useNavigate();

  const validateemail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const check = pattern.test(email);
    if (check) {
      return true;
    }
    return false;
  };

  const updatevalue = (e) => {
    updateSignup({...signupDetail, [e.target.name]: e.target.value});
  };

  const onclickSign = async () => {
    updateWarning('Loading ...');
    await fetch(`${urlauth}/signup`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(signupDetail),
        },
    )
        .then((response) => response.json())
        .then((data) => {
        // console.log(data)
          if (data.status !== 0) {
            updateWarning('Email already exist or Invalid details');
          } else {
            updateWarning('');
            localStorage.setItem('token', data.authtoken);
            window.location.reload();
          }
        })
        .catch(() => {
          updateWarning('Something is wrong');
        });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onclickSign();
    }
  };

  useEffect(() => {
    const valide = validateemail(signupDetail.email);
    if (!valide && signupDetail.email.length > 0) {
      updateWarningEmail('Invalid Email');
    } else {
      updateWarningEmail('');
    }

    if (signupDetail.password.length > 0 && signupDetail.password.length < 5) {
      updateWarningPass('There should be minimum 5 letter in password');
    } else {
      updateWarningPass('');
    }

    if (signupDetail.Cpassword.length > 0 && signupDetail.Cpassword !== signupDetail.password) {
      updateWarningCPass('Password and Confirm Password should be same');
    } else {
      updateWarningCPass('');
    }

    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, [signupDetail.email, signupDetail.password, signupDetail.Cpassword, navigate]);

  return (
    <div className='Lscard' >
      <div className='signup'>
        <div>
          <h1>Create account</h1>
          <p>Get access to our service</p>
          <p className='warning'>{warning}</p>
        </div>
        <form onKeyDown={handleKeyPress}>
          <fieldset className='float-label-field'>
            <label htmlFor="name">Name</label>
            <input id="name" type='text' onFocus={float} name="name" value={signupDetail.name} onChange={(e) => updatevalue(e)} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type='number' onFocus={float} name="phone" value={signupDetail.phone} onChange={(e) => updatevalue(e)} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="address">Address</label>
            <input id="address" type='text' onFocus={float} name="address" value={signupDetail.address} onChange={(e) => updatevalue(e)} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="email">Email</label>
            <input id="email" type='Email' onFocus={float} name="email" value={signupDetail.email} onChange={(e) => updatevalue(e)} />
            <p className='warning'>{warningEmail}</p>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="password">Password</label>
            <input id="password" type='password' onFocus={float} name="password" value={signupDetail.password} onChange={(e) => updatevalue(e)} />
            <p className='warning'>{warningPass}</p>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="Cpassword">Confirm Password</label>
            <input id="Cpassword" type='password' onFocus={float} name="Cpassword" value={signupDetail.Cpassword} onChange={(e) => updatevalue(e)} />
            <p className='warning'>{warningCPass}</p>
          </fieldset>
        </form>
        <button className='signbutton' type='button' onClick={onclickSign}>Create</button>
        <p>Already have account? <Link to='/login'>Login</Link></p>
      </div>
      <div className='logoG'>
        <GifLogo1 />
      </div>
    </div>
  );
}

export default Signup;
