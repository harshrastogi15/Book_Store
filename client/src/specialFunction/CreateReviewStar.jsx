import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export const createreviewStar = (star) => {
  const row = [];
  for (let index = 0; index < star; index++) {
    row.push(<span style={{'color': 'rgb(255, 174, 0)'}} key={index}><FontAwesomeIcon icon={faStar} /></span>);
  }
  for (let index = star; index < 5; index++) {
    row.push(<span style={{'color': 'rgb(94, 92, 92)'}} key={index}><FontAwesomeIcon icon={faStar} /></span>);
  }
  return <div id=''>
    {row}
  </div>;
};
