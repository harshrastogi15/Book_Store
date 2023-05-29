import React from 'react';
import '../Private/css/Loader.css';

function LoaderCorousel() {
  return (
    <div className='LoaderCorouserlDesign'>
      <div className='loadercorousel'>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default LoaderCorousel;
