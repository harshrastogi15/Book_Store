import React from 'react';
import Navbar from './Navbar/Navbar';
import {Route, Routes} from 'react-router-dom';
import BookAddForm from './AddBook/BookAddForm';
import Books from './Books/Books';
import UpdateBook from './Books/UpdateBooks/UpdateBook';

function admin() {
  const mystyle = {
    display: 'flex',
  };

  return (
    <div style={mystyle}>
      <Navbar />
      <div style={{width: 'calc(100% - 200px)', marginLeft: '200px'}}>
        <Routes>
          <Route exact path='/' element={<div>ADD</div>}/>
          <Route exact path='/addbook' element={<BookAddForm/>}/>
          <Route exact path='/books' element={<Books/>}/>
          <Route exact path='/update/:id/:title/:author' element={<UpdateBook/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default admin;
