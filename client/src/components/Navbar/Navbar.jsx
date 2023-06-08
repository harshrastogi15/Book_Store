import React, {useEffect} from 'react';
import '../../Private/css/Navbar.css';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import CartIcon from '../Cart/CartIcon';
import Sidenavbar from './Sidenavbar';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../actions/user';
import {authToken, urlauth} from '../../Appurl';


function Navbar() {
  const location = useLocation();
  const user = useSelector((state) => state.user.name);
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isEmailVerify = useSelector((state) => state.user.isEmail);

  useEffect(()=>{
    if (isEmailVerify === false) {
      navigate('/email/verify');
    }
  }, [isEmailVerify]);

  async function fetchdata() {
    let userdata = {};
    await fetch(`${urlauth}/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': authToken,
      },
    }).then((response) => response.json())
        .then((data) => {
          userdata = data;
        });
    if (userdata.status === 0) {
      dispatch(updateUser(userdata.data));
    } else {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }

  const logoutuser = async () => {
    await localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  const navtoggler = () => {
    document.getElementById('sidenavdisplay').style.width = '100%';
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchdata();
    }
  }, []);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [location]);

  return (
    <div className='navbar'>
      <div className='navtoggler' onClick={navtoggler}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <Sidenavbar logoutfunc={logoutuser} />
      <Logo />
      <ul className='navlinks'>
        <li>
          <Link className='navlinkpath' to="/">Home</Link>
        </li>
        <li><Link className='navlinkpath' to="/search">Search</Link></li>
        <li><Link className='navlinkpath' to="/about">About</Link></li>
      </ul>
      <CartIcon />
      <ul className='navauth'>
        {login ?
          <div className="dropdown">
            <button className="dropbtn" type='button'>{user.toUpperCase()}</button>
            <div className="dropdown-content">
              <Link to="/user">Profile</Link>
              <Link to="/login" onClick={logoutuser}>Logout</Link>
            </div>
          </div> :
          <div className='navauth'>
            <li>
              <Link className='navauthpath' to="/login">
                Login
              </Link>
            </li>
            <li>Or</li>
            <li><Link className='navauthpath' to="/signup">Signup</Link></li>
          </div>
        }
      </ul>
    </div>
  );
}

export default Navbar;
