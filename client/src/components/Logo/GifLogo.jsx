import React from 'react';
import gif1 from '../../Private/data/LogoGif.gif';
import gif2 from '../../Private/data/LogoGif2.gif';

export function GifLogo1() {
  const gifstyle={
    backgroundColor: 'white',
    height: '100%',
    backgroundImage: `url(${gif1})`,
    backgroundSize: '100% 100%',
  };
  return (
    <div style={gifstyle}>
    </div>
  );
}

export function GifLogo2() {
  const gifstyle={
    backgroundColor: 'white',
    height: '100%',
    backgroundImage: `url(${gif2})`,
    backgroundSize: '100% 100%',
  };
  return (
    <div style={gifstyle}>
    </div>
  );
}

// export default GifLogo
