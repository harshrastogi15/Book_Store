import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Default from './components/Default';
import { Provider } from 'react-redux';
import store from './store';
import BookAddForm from './components/BookAddForm';
import DetailBook from './components/DetailBook';

function App() {
  return (
      <Provider store={store}>
    <Router>
      <div className="App">
        <Navbar/>
        <div style={{height:'55px', width:'100%' }}></div>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/cart' element={<Default message="Updated soon"/>} />
          <Route exact path='/search' element={<Default message="Updated soon"/>} />
          <Route exact path='/about' element={<Default message="Updated soon"/>} />
          <Route exact path='/' element={<Home />} />
          <Route exact path='/addbookdata' element={<BookAddForm/>} />
          <Route path='/book/:id/:name/:author' element={<DetailBook/>} />
          <Route path='/:s' element={<Default message="This Page is not exist"/>} />
          <Route path='type/:s' element={<Default message="Updated Soon"/>} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
