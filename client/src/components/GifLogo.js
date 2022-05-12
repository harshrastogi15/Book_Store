import React from 'react'
import gif from '../Private/data/LogoGif.gif'

function GifLogo() {
  const gifstyle={
    backgroundColor:'white',
    height:'100%',
    backgroundImage:`url(${gif})`,
    backgroundSize:'100% 100%'
  }
  return (
    <div style={gifstyle}>
    </div>
  )
}

export default GifLogo