import React from 'react';
import '../Private/css/Corousel.css';
import {Link} from 'react-router-dom';
import FetchImage from '../specialFunction/FetchImage';
function Bookcard(props) {
  const {detail} = props;
  // console.log(detail);
  const {_id, title, author} = detail;
  return (
    <div className='bookcard'>
      <Link to={`/book/${_id}/${title}/${author}`}>
        <div className='image'>
          <FetchImage title={title} id={_id}/>
        </div>
        <p>{detail['title']}</p>
        <p>{detail['author']}</p>
      </Link>
    </div>
  );
}

export default Bookcard;
