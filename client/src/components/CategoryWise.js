import React, { useEffect, useState } from 'react'
import { urlbook } from '../Appurl';
import Bookcard from './Bookcard';
import '../Private/css/CategoryWise.css'
import LoaderCorousel from '../loader/LoaderCorousel';
import Footer from './Footer';

function CategoryWise() {
  const url = window.location.pathname;
  const patharr = url.split('/');
  const type = patharr[2];

  const [booksData, updateBookData] = useState({
    load: false,
    data: []
  })

  const fetchBooks = () => {
    fetch(`${urlbook}/bookcategory/${type}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' }
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 0) {
          updateBookData({
            ...booksData,
            load: true,
            data: res.bookdata
          })
        }
      })
      .catch(() => {
        console.log('error');
      })
  }

  useEffect(() => {
    fetchBooks();
  }, [])


  return (
    <div>
      <div className='BooksCategory'>
        <h1 className='CategoryHeading'>{type}</h1>
        {booksData['load'] ?
          booksData['data'].length === 0 ?
            <div>No book Available in this category</div>
            :
            booksData['data'].map((e) => {
              return <Bookcard detail={e} key={e._id} />
            })
          :
          <LoaderCorousel />}
      </div>
      <Footer/>
    </div>
  )
}

export default CategoryWise