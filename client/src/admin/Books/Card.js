import React from 'react';
import style from './Card.module.css';
import FetchImage from '../../specialFunction/FetchImage';
function card(props) {
//   const {detail} = props;
  // console.log(detail);

  //   const {_id, title, author} = detail;
  const _id = '628b7a878955e45c2f6f0530';
  const title = 'Shantaram';
  const author = 'i am';
  return (
    <div className={style.admincard}>
      <div className='image'>
        <FetchImage title={title} id={_id}/>
      </div>
      <p>{title}</p>
      <p>{author}</p>
      <p>Novel</p>
      <p>English</p>
      <p>HR company</p>
    </div>
  );
}

export default card;
