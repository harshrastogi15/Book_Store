import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
function CartIcon() {
  const cartstyle ={
    margin: '3px 10px',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
  };

  const [check, setCount] = useState(true);
  const toggler =()=>{
    if (check === true) {
      setCount(false);
    } else {
      setCount(true);
    }
  };
  useEffect(()=>{
    const data = document.getElementsByClassName('cart');
    if (check) {
      data[0].style.color = '#8e78d6';
    } else {
      data[0].style.color = 'white';
    }
  });
  return (
    <div style={cartstyle}>
      <Link to='/favourite' >
        <FontAwesomeIcon className='cart' onMouseEnter={toggler} onMouseLeave={toggler} icon={faStar}/>
      </Link>
    </div>
  );
}


export default CartIcon;
