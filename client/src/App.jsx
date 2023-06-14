import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Navbar from './components/Navbar/Navbar';
import Default from './components/Defaults/Default';
import {Provider} from 'react-redux';
import store from './store';
import DetailBook from './components/DetailBook';
import UserProfile from './components/UserProfile/UserProfile';
import CategoryWise from './components/CategoryWise';
import Search from './components/Search';
import Favourite from './components/Favourite';
import Message from './components/Alert/Message';
import BookInfo from './components/Information/BookInfo';
import UpdateUserData from './components/UserProfile/UpdateUserData';
import About from './components/About/About';
import Verification from './components/Auth/Verification';
import Admin from './admin/Admin';

function App() {
  return <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar />
        <Message />
        <div style={{height: '55px', width: '100%'}}></div>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/favourite' element={<Favourite />} />
          <Route exact path='/search' element={<Search />} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/sendInfo' element={<BookInfo />} />
          <Route exact path='/user' element={<UserProfile />} />
          <Route exact path='/user/update' element={<UpdateUserData />} />
          <Route path='/category/:s' element={<CategoryWise />} />
          <Route exact path='/book/:id/:name/:author' element={<DetailBook />} />
          <Route exact path='/email/verify' element={<Verification />} />
          <Route path='/admin/*' element={<Admin/>} />
          <Route exact path='/' element={<Home />} />
          <Route path='/*' element={<Default message="This Page is not exist" />} />
        </Routes>
      </div>
    </Router>
  </Provider>;
}

export default App;
