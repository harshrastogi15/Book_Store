import React from 'react'
import Corousel from './Corousel'
import '../Private/css/Home.css'
import GifLogo from './GifLogo'

function Home() {

  return (
    <div className='homeclass'>
      <Corousel type='Play' />
      <div className='HomecorouselShow'>
        <div className='Homecorouselwidth'>
          <Corousel type='Game' />
        </div>
        <div className='HomeLogoGif'>
          <GifLogo />
        </div>
      </div>
      <Corousel type='Learn' />
    </div>
  )
}

export default Home