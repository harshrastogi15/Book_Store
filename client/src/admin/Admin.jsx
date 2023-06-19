import React from 'react';
import Navbar from './Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import BookAddForm from './AddBook/BookAddForm';
import Books from './Books/Books';
import UpdateBook from './Books/UpdateBooks/UpdateBook';
import AdminLogin from './AdminLogin/AdminLogin';
import style from './Admin.module.css';

function admin() {
  return (
    <div className={style.mainAdmin}>
      <AdminLogin/>
      <Navbar />
      <div className={style.adminside} >
        <Routes>
          <Route exact path='/' element={<div></div>}/>
          <Route exact path='/addbook' element={<BookAddForm/>}/>
          <Route exact path='/books' element={<Books/>}/>
          <Route exact path='/update/:id/:title/:author' element={<UpdateBook/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default admin;
