import React from 'react';
import style from './Card.module.css';
import FetchImage from '../../specialFunction/FetchImage';
import {Link} from 'react-router-dom';
function card(props) {
  const {detail} = props;
  const {_id, title, author, language, publication, category} = detail;
  return (
    <div className={style.admincard}>
      <div className={style.admincardImage}>
        <FetchImage title={title} id={_id}/>
      </div>
      <div style={{'height': '150px', 'overflow': 'auto', 'margin': '10px 1px'}}>
        <p>Title: <span>{title}</span></p>
        <p>Author: <span>{author}</span></p>
        <p>Category: <span>{category}</span></p>
        <p>Lanugage: <span>{language}</span></p>
        <p>Publication: <span>{publication}</span></p>
      </div>
      <Link to={`/admin/update/${_id}/${title}/${author}`}>Update</Link>
    </div>
  );
}

export default card;
