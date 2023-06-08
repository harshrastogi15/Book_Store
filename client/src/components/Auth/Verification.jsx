import React, {useEffect, useRef, useState} from 'react';
import style from './Verification.module.css';
import Timer from '../../specialFunction/Timer';
import {useSelector} from 'react-redux';
import {authToken, urlauth} from '../../Appurl';
import {callMessage} from '../Alert/CallMessage';
import LoaderCorousel from '../../loader/LoaderCorousel';
import {useNavigate} from 'react-router-dom';

function Verification() {
  const [startTimer, setTimer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const email = useSelector((state) => state.user.email);
  const login = useSelector((state) => state.user.login);
  const isEmailVerify = useSelector((state) => state.user.isEmail);
  const collectOTP = useRef();
  const buttonOTP = useRef();
  const navigation = useNavigate();

  const sendOTP = async () => {
    setLoading(true);
    fetch(`${urlauth}/sendotp`, {
      method: 'POST',
      headers: {
        auth_token: authToken,
      },
    })
        .then((res) => res.json())
        .then((res) => {
          if ( res.status===0 ) {
            buttonOTP.current.style.display = 'none';
            collectOTP.current.style.display = 'block';
            setTimer(true);
            callMessage('Successful', 'OTP is sent to your email address');
          } else {
            callMessage('OOPs!', 'Unable to send otp');
          }
          setLoading(false);
        })
        .catch((err)=>{
          callMessage('OOPs!', 'Unable to send otp');
          setLoading(false);
        });
  };
  const verifyOTP = async () => {
    if (otp.length!==6) {
      callMessage('OOPs', 'OTP must be six length');
      return;
    }
    setLoading(true);
    fetch(`${urlauth}/verify`, {
      method: 'POST',
      headers: {
        'auth_token': authToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({otp: otp}),
    })
        .then((res) => res.json())
        .then((res) => {
          if ( res.status===0 ) {
            callMessage('Successful', 'Your address is verified');
            window.location.reload();
          } else if ( res.status===-1 ) {
            callMessage('Unsuccessful', 'OTP mismatched');
          } else {
            callMessage('OOPs', 'Server Error');
          }
          setLoading(false);
        })
        .catch((err)=>{
          callMessage('OOPs', 'Server Error');
          setLoading(false);
        });
  };

  useEffect(()=>{
    if (!login) {
      navigation('/');
    }
  }, [login]);
  useEffect(()=>{
    if (isEmailVerify) {
      navigation('/');
    }
  }, [isEmailVerify]);

  return (
    <div className={style.verifyclass}>
      <h4>Verify Email Address</h4>
      <div>
        <div className={style.verificationemail}>{email}</div>
        <button ref={buttonOTP} className={style.otpbutton} onClick={sendOTP}>
          Get OTP
        </button>
      </div>
      {loading?<LoaderCorousel/>:''}
      <div ref={collectOTP} className={style.collectOTP}>
        <div> Email is sent at your email address</div>
        <input
          className={style.inputOTP}
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className={style.otpbutton} onClick={verifyOTP}>
          Verify
        </button>
        <Timer totalSecond={300} timer={startTimer} />
      </div>
    </div>
  );
}

export default Verification;
