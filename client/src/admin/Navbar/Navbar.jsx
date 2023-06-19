import React, {useRef} from 'react';
import style from './Navbar.module.css';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const adminNavbarref = useRef();
  const logout = ()=>{
    localStorage.removeItem('adminToken');
    window.location.reload();
  };

  const toggler = ()=>{
    if (adminNavbarref.current.style.width==='200px') {
      adminNavbarref.current.style.width = '0px';
    } else {
      adminNavbarref.current.style.width = '200px';
    }
  };

  return (
    <div ref={adminNavbarref} className={style.adminNavbar}>
      <div className={style.adminNavToggler} onClick={toggler}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <h3>Admin Panel</h3>
      <Link className={style.adminNavbarLink} to='/admin/addbook'>Add new Book</Link>
      <Link className={style.adminNavbarLink} to='/admin/books'>Books</Link>
      <button className={style.adminNavbarLink} onClick={logout}>Logout</button>
    </div>
  );
}

export default Navbar;
