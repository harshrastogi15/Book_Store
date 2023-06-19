import React, {useEffect, useState} from 'react';
import Card from './Card';
import {urlbook} from '../../Appurl';
import {callMessage} from '../../components/Alert/CallMessage';

function Books() {
  const cardstyle = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItem: 'center',
    justifyContent: 'space-evenly',
  };
  const [type, updateType] = useState('All');
  const [booksData, updateBookData] = useState({
    load: false,
    data: [],
  });

  const fetchBooks = () => {
    fetch(`${urlbook}/bookcategory/${type}`, {
      method: 'GET',
      headers: {'content-type': 'application/json'},
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updateBookData({
              ...booksData,
              load: true,
              data: res.bookdata,
            });
          } else {
            callMessage('Server Error', 'Unable to fetch detail');
          }
        })
        .catch(() => {
          callMessage('Server Error', 'Unable to fetch detail');
        });
  };

  useEffect(() => {
    const func = setTimeout(() => {
      fetchBooks();
    }, 500);
    return () => {
      func;
    };
  }, [type]);

  return (
    <div>
      <h3 style={{textAlign: 'center', margin: '0px 20px 20px 20px'}}>Books</h3>
      <div style={{'width': '91%', 'margin': 'auto'}}>
        <select id="category" name="category" style={{'width': '99%', 'margin': 'auto', 'height': '30px', 'fontSize': '15px'}} onChange={(e)=>updateType(e.target.value)}>
          <option value="All">All</option>
          <option value="Novel">Novel</option>
          <option value="Story">Story</option>
        </select>
      </div>
      <div style={cardstyle}>
        {booksData['load'] ? (
          booksData['data'].length === 0 ? (
            <div>No book Available in this category</div>
          ) : (
            booksData['data'].map((e) => {
              return <Card detail={e} key={e._id} />;
            })
          )
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Books;
