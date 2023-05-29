import React from 'react';
import '../Private/css/Loader.css';

function Loader() {
  return (
    <div className='mainloader'>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Loading</p>
    </div>
  );
}

export default Loader;
