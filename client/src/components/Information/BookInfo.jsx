import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {urlBookInfo} from '../../Appurl';
import style from '../../Private/css/Info.module.css';
import {callMessage} from '../Alert/CallMessage';
import Footer from '../Footer/Footer';
import {GifLogo1, GifLogo2} from '../Logo/GifLogo';
function BookInfo() {
  const email = useSelector((state) => state.user.email);
  const user = useSelector((state) => state.user.name);
  const login = useSelector((state) => state.user.login);
  const [data, updateData] = useState({
    email: email,
    name: '',
    bookname: '',
    bookauthor: '',
  });
  const [emailMessage, updateEmailMessage] = useState('');
  const [bookMessage, updateBookMessage] = useState('');
  const [NameMessage, updateNameMessage] = useState('');
  const navigate = useNavigate();
  const updateDataFunction = (event) => {
    updateData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const validateemail = (email) => {
    const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const check = pattern.test(email);
    if (check) {
      return true;
    }
    return false;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendData();
    }
  };

  const sendData = () => {
    if (data.bookauthor.length === 0 || data.bookname.length === 0) {
      updateBookMessage('Please write Book Name and Author Name');
      if (data.name.length === 0) {
        updateNameMessage('Write name');
        return;
      } else {
        updateNameMessage('');
      }
      return;
    } else {
      updateBookMessage('');
    }
    if (data.name.length === 0) {
      updateNameMessage('Write name');
      return;
    } else {
      updateNameMessage('');
    }

    fetch(`${urlBookInfo}/addBookinfo`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        bookname: data.bookname,
        bookauthor: data.bookauthor,
        name: data.name,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
        // console.log(res);
          if (res.status == 0) {
            callMessage('Success', 'We successfully get your suggestion.');
            navigate('/');
          } else {
            console.log(res.error);
            callMessage('Error', 'Unable to send');
          }
        })
        .catch((error) => {
        // console.log(error)
          callMessage('Error', 'Unable to send');
        });
  };

  useEffect(() => {
    if (login) {
      updateData({
        ...data,
        name: user,
        email: email,
      });
    }
  }, [email, login, user]);

  useEffect(() => {
    if (data.email.length > 0 && !validateemail(data.email)) {
      updateEmailMessage('Invalid Email');
    } else {
      updateEmailMessage('');
    }
  }, [data]);

  return (
    <div>
      <div className={style.Bookinfo}>
        <div className={style.InfoLogoGIF}>
          <GifLogo1 />
        </div>
        <div className={style.BookinfoForm}>
          <p>
                        If there is any book that is not
                        available on our platform. you can inform us by filling out this form.
          </p>
          <h1>Fill Book Detail</h1>
          <h3>{bookMessage}</h3>
          <form onKeyDown={(e) => handleKeyPress(e)}>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Enter Book Name' name='bookname' value={data['bookname']} onChange={(e) => updateDataFunction(e)} />
            </div>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Enter Author Name' name='bookauthor' value={data['bookauthor']} onChange={(e) => updateDataFunction(e)} />
            </div>
            <h2>Personal Detail</h2>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Enter Name' name='name' value={data['name']} onChange={(e) => updateDataFunction(e)} />
              <p>{NameMessage}</p>
            </div>
            <div className={style.BookinfoFormDesign}>
              <input type='text' placeholder='Enter Email' name='email' value={data['email']} onChange={(e) => updateDataFunction(e)} />
              <p>{emailMessage}</p>
            </div>
          </form>
          <button type='button' onClick={sendData}>Send</button>
        </div>
        <div className={style.InfoLogoGIF}>
          <GifLogo2 />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default BookInfo;
