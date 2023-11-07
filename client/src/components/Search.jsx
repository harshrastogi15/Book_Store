import React, {useEffect, useState} from 'react';
import {urlSearch} from '../Appurl';
import LoaderCorousel from '../loader/LoaderCorousel';
import styles from '../Private/css/Search.module.css';
import Bookcard from './Bookcard';
import Footer from './Footer/Footer';
import {DebounceInput} from 'react-debounce-input';

function Search() {
  const [searchdata, updateSearchData] = useState({
    category: 'All',
    title: '',
    author: '',
  });
  const [booksData, updateBookData] = useState({
    load: false,
    data: [],
  });
  const [isLoading, updateLoading] = useState(false);

  const changeData = (event) => {
    updateSearchData({
      ...searchdata,
      [event.target.name]: event.target.value,
    });
  };

  const fetchSearch = async () => {
    const element = document.getElementsByClassName(styles.searchfield);
    element[0].style.height = 'fit-content';
    updateLoading(true);
    await fetch(`${urlSearch}/find`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        title: searchdata['title'],
        author: searchdata['author'],
        category: searchdata['category'],
      }),
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updateBookData({
              ...booksData,
              load: true,
              data: res.data,
            });
          }
        })
        .catch();
    updateLoading(false);
  };


  useEffect(() => {
    if (searchdata['title'].length !== 0 || searchdata['author'].length !== 0) {
      fetchSearch();
    }
  }, [searchdata]);


  return (
    <div>
      <div className={styles.searchfile}>
        <div className={styles.searchfield}>
          <div className={styles.select}>
            <select name="category" id="" onChange={(e) => changeData(e)}>
              <option value="All">All</option>
              <option value="Novel">Novel</option>
              <option value="Story">Story</option>
            </select>
          </div>
          <DebounceInput placeholder='Book Name' name='title' debounceTimeout={500} onChange={(e) => changeData(e)} value={searchdata['title']} />
          <DebounceInput placeholder='Author Name' name='author' debounceTimeout={500} onChange={(e) => changeData(e)} value={searchdata['author']} />
          <button type='button' onClick={fetchSearch}>Search</button>
        </div>
      </div>
      <div className='BooksCategory'>
        {booksData['load'] ?
          booksData['data'].length === 0 ?
            <div style={{height: '200px'}}>
                            No book Available
            </div> :
            booksData['data'].map((e) => {
              return <Bookcard detail={e} key={e._id} />;
            }) :
          isLoading ? <LoaderCorousel /> : <div></div>}
      </div>
      <Footer />
    </div >
  );
}

export default Search;
