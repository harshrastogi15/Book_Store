import React, { useEffect, useState } from 'react'
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
  const [signupDetail,updateSignup]=useState({
    name:"",
    phone:"",
    address:"",
    pincode:"",
    email:"",
    password:"",
    Cpassword:""
  })
  const [warningEmail, updateWarningEmail] = useState("");
  const [warningPass, updateWarningPass] = useState("");
  const [warningCPass, updateWarningCPass] = useState("");
  const validateemail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    var check = pattern.test(email);
    if (check) { return true; }
    return false;
  }

  const updatevalue=(e) =>{
    updateSignup({...signupDetail,[e.target.name]:e.target.value});
  }

  useEffect(()=>{
    var valide = validateemail(signupDetail.email);
    if (!valide && signupDetail.email.length > 0) {
      updateWarningEmail("Invalid Email");
    } else {
      updateWarningEmail("")
    }

    if(signupDetail.password.length > 0 && signupDetail.password.length<5){
      updateWarningPass("There should be minimum 5 letter in password");
    }else{
      updateWarningPass("")
    }

    if(signupDetail.Cpassword.length > 0 && signupDetail.Cpassword != signupDetail.password){
      updateWarningCPass("Password and Confirm Password should be same")
    }else{
      updateWarningCPass("")
    }

  })

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
            <input id="name" type='text' onFocus={float} name="name" value={signupDetail.name} onChange={e=>updatevalue(e)}/>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="phone">Phone</label>
            <input id="phone" type='number' onFocus={float} name="phone" value={signupDetail.phone} onChange={e=>updatevalue(e)} />
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="address">Address</label>
            <input id="address" type='text' onFocus={float} name="address" value={signupDetail.address} onChange={e=>updatevalue(e)}/>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="pincode">Pincode</label>
            <input id="pincode" type='number' onFocus={float} name="pincode" value={signupDetail.pincode} onChange={e=>updatevalue(e)}/>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="email">Email</label>
            <input id="email" type='Email' onFocus={float} name="email" value={signupDetail.email} onChange={e=>updatevalue(e)}/>
            <p className='warning'>{warningEmail}</p>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="password">Password</label>
            <input id="password" type='password' onFocus={float} name="password" value={signupDetail.password} onChange={e=>updatevalue(e)}/>
            <p className='warning'>{warningPass}</p>
          </fieldset>
          <fieldset className='float-label-field'>
            <label htmlFor="Cpassword">Confirm Password</label>
            <input id="Cpassword" type='password' onFocus={float} name="Cpassword" value={signupDetail.Cpassword} onChange={e=>updatevalue(e)}/>
            <p className='warning'>{warningCPass}</p>
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