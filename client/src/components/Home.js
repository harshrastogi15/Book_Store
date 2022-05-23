import React from 'react'
import Corousel from './Corousel'
import '../Private/css/Home.css'
import {GifLogo2} from './GifLogo'

function Home() {

  return (
    <div className='homeclass'>
      <Corousel type='Play' delay='2000'/>
      <div className='HomecorouselShow'>
        <div className='Homecorouselwidth'>
          <Corousel type='Game' delay='3000'/>
        </div>
        <div className='HomeLogoGif' >
          <GifLogo2 />
        </div>
      </div>
      <Corousel type='Learn' delay='1500' />
    </div>
  )
}

export default Home