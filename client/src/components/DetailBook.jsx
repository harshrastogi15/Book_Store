import React, {useEffect, useState} from 'react';
import style from '../Private/css/DetailBook.module.css';
import {authToken, urlbook, urlFavourite} from '../Appurl';
import Loader from '../loader/Loader';
import Review from './Review';
import Footer from './Footer/Footer';
import Corousel from './Corousel/Corousel';
import {useLocation} from 'react-router-dom';
import FetchImage from '../specialFunction/FetchImage';
import {callMessage} from './Alert/CallMessage';


function DetailBook() {
  const location = useLocation();
  let url = location.pathname;
  url = url.replace(/%20/g, ' ');
  let arrdata = url.split('/');
  let bookid = arrdata[2];
  let booktitle = arrdata[3];
  let bookauthor = arrdata[4];
  const [category, updatecategory] = useState('');
  const [language, updatelanuage] = useState('');
  const [publication, updatepublication] = useState('');
  const [IsLoading, updateLoading] = useState(false);
  // console.log(url);
  // console.log(bookid);
  // console.log(booktitle);
  // console.log(bookauthor);

  const fetchBookDetail = async () => {
    url = location.pathname;
    url = url.replace(/%20/g, ' ');
    arrdata = url.split('/');
    bookid = arrdata[2];
    booktitle = arrdata[3];
    bookauthor = arrdata[4];
    updateLoading(true);
    await fetch(`${urlbook}/onebook/id`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        id: bookid,
        title: booktitle,
        author: bookauthor,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
        // console.log(res);
          if (res.status === 0) {
            updatelanuage(res.data.language);
            updatecategory(res.data.category);
            updatepublication(res.data.publication);
          } else {
            callMessage('Server Error', 'Unable to fetch detail');
          }
        })
        .catch((err) => {
          callMessage('Server Error', 'Unable to fetch detail');
        });
    updateLoading(false);
  };


  const addFavourite = ()=>{
    fetch(`${urlFavourite}/add`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth_token': `${authToken}`,
      },
      body: JSON.stringify({
        bookid: bookid,
        bookname: booktitle,
        author: bookauthor,
      }),
    })
        .then((res)=>res.json())
        .then((res)=>{
          if (res.status===0) {
            callMessage('Successful', 'Book has been added to your favorite list');
          } else if (res.status===1) {
            callMessage('Oops', 'Book is already on your favorite list');
          } else {
            callMessage('Something is wrong', 'Unable to add this book to your favorite list');
          }
        })
        .catch((err)=>{
          callMessage('Server Error', 'Unable to add this book to your favorite list');
        });
  };

  // const getimage = ()=>{
  //     let html = <FetchImage title={booktitle} id={bookid}/>;
  //     console.log(html);
  // }

  useEffect(() => {
    fetchBookDetail();
    // getimage();
  }, [location]);

  return (
    <div>
      <div className={style.bookdetail}>
        {IsLoading ? <Loader /> : <div></div>}
        <div className={style.aboutBook}>
          <div className={style.bookimage}>
            <FetchImage title={booktitle} id={bookid}/>
          </div>
          <div className={style.bookdata}>
            <h1>{booktitle}</h1>
            <h2>Author: <span>{bookauthor}</span></h2>
            <h3>Category:<span> {category}</span></h3>
            <h3>Language:<span> {language}</span></h3>
            <h4>Publish by <span>{publication}</span></h4>
            <button type='button' onClick={addFavourite}>Add to favourite</button>
          </div>
        </div>
        <div className={style.bookreviews}>
          <Review bookid={bookid} bookname={booktitle} />
        </div>
      </div>
      {IsLoading ? <div></div> : <Corousel type={category.length===0 ? 'All': category} delay='3200' />}
      <Footer />
    </div>
  );
}

export default DetailBook;
