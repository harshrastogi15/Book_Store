import React from 'react';
import {urlbook} from '../Appurl';

function BookAddForm() {
  const submitbook = (event) => {
    event.preventDefault();
    fetch(event.target.action, {
      method: 'POST',
      body: new FormData(event.target),
    }).then((resp) => {
      return resp.json();
    }).then((body) => {
      console.log(body);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <form action={`${urlbook}/addbook`} method='post' onSubmit={(e) => submitbook(e)} encType='multipart/form-data'>
        <div>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' />
        </div>
        <div>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' name='author' />
        </div>
        <div>
          <label htmlFor='language'>Language</label>
          <input type='text' id='language' name='language' />
        </div>
        <div>
          <label htmlFor='publication'>Publication</label>
          <input type='text' id='publication' name='publication' />
        </div>
        <div>
          <label htmlFor='category'>category</label>
          {/* <input type='text' id='category' name='category' /> */}
          <select id="category" name="category">
            <option value="Select">Select</option>
            <option value="Novel">Novel</option>
            <option value="Story">Story</option>
          </select>
        </div>
        <div>
          <label htmlFor='img'>image</label>
          <input type='file' id='img' name='img' />
        </div>
        <div>
          <input type='submit' value='submit' />
        </div>
      </form>
    </div>
  );
}

export default BookAddForm;
