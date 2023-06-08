import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import style from '../../Private/css/Userprofile.module.css';
import Lurl from '../../Private/data/tittleLogo.png';
import UserReview from './UserReview';
import {Link} from 'react-router-dom';


function UserProfile() {
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const phone = useSelector((state) => state.user.phone);
  const address = useSelector((state) => state.user.address);
  const login = useSelector((state) => state.user.login);
  const isEmailVerify = useSelector((state) => state.user.isEmail);
  const navigate = useNavigate();

  useEffect(()=>{
    if (isEmailVerify === false) {
      navigate('/email/verify');
    }
  }, [isEmailVerify]);

  useEffect(()=>{
    if (!login) {
      navigate('/login');
    }
  }, [login, navigate]);

  return <div className={style.userprofile}>
    <div className={style.AboutUser}>
      <div className={style.UserName}>
        <div className={style.ProfileLogo}>
          <img src={Lurl} alt="ServerError" width='100%' height='100%' />
        </div>
        <p>{name}</p>
      </div>
      <div className={style.Userdetail}>
        <p> Email : <span>{email}</span></p>
        <p> Phone : <span>{phone}</span></p>
        <p> Address : <span>{address}</span></p>
      </div>
      <div>
        <Link to='/user/update'>
          <button type='button'>Edit</button>
        </Link>
      </div>
    </div>
    <div className={style.UserReviewDetail}>
      <UserReview/>
    </div>
  </div>;
}

export default UserProfile;
