import React from 'react';
import style from './Navbar.module.css';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div className={style.adminNavbar}>
      <Link className={style.adminNavbarLink} to='/admin/addbook'>Add new Book</Link>
      <Link className={style.adminNavbarLink} to='/admin/books'>Books</Link>
    </div>
  );
}

export default Navbar;
