import React from 'react';
import {urlbook} from '../../Appurl';
import style from './BookAddForm.module.css';
import {callMessage} from '../../components/Alert/CallMessage';

function BookAddForm() {
  const submitbook = (event) => {
    event.preventDefault();
    fetch(event.target.action, {
      method: 'POST',
      headers: {'auth_token': `${localStorage.getItem('adminToken')}`},
      body: new FormData(event.target),
    })
        .then((resp) => {
          return resp.json();
        })
        .then((body) => {
          if (body.status===0) {
            callMessage('Success', 'Book Add successfully');
          } else if (res.status === -10) {
            localStorage.removeItem('adminToken');
            window.location.reload();
          } else {
            callMessage('Oops', 'upable to add book');
          }
        })
        .catch((error) => {
          callMessage('Oops', 'upable to add book');
        });
  };

  return (
    <div>
      <div className={style.addbook}>
        <h4>Add New Book</h4>
        <form
          action={`${urlbook}/addbook`}
          method="post"
          onSubmit={(e) => submitbook(e)}
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" placeholder='Title'/>
          </div>
          <div>
            <label htmlFor="author">Author Name</label>
            <input type="text" id="author" name="author" placeholder='Author Name' />
          </div>
          <div>
            <label htmlFor="language">Language</label>
            <input type="text" id="language" name="language" placeholder='Language'/>
          </div>
          <div>
            <label htmlFor="publication">Publication</label>
            <input type="text" id="publication" name="publication" placeholder='Publication'/>
          </div>
          <div>
            <label htmlFor="category">Category</label>
            {/* <input type='text' id='category' name='category' /> */}
            <select id="category" name="category">
              <option value="Select">Select</option>
              <option value="Novel">Novel</option>
              <option value="Story">Story</option>
            </select>
          </div>
          <div>
            <label htmlFor="img">Image</label>
            <input type="file" id="img" name="img" required/>
          </div>
          <div>
            <input type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookAddForm;
