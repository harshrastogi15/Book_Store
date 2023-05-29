import React from 'react';
import style from '../../Private/css/Message.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

function message() {
  const closeMessage = ()=>{
    document.getElementById('MessageDisappear').style.display='none';
  };

  return (
    <div className={style.messageShow} id="MessageDisappear">
      <div className={style.messageInner}>
        <p id='MessageShowCase'> <span>Successfull!</span> upated to your database</p>
        <div className={style.messageIcon} onClick={closeMessage}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </div>
  );
}

export default message;
