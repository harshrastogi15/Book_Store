import React from 'react'
import Corousel from './Corousel'
import '../Private/css/Home.css'
import { GifLogo2 } from './GifLogo'
import Footer from './Footer'

function Home() {

  return (
    <div>
      <div className='homeclass'>
        <Corousel type='All' delay='3050' />
        <div className='HomecorouselShow'>
          <div className='Homecorouselwidth'>
            <Corousel type='Novel' delay='3100' />
          </div>
          <div className='HomeLogoGif' >
            <GifLogo2 />
          </div>
        </div>
        <Corousel type='Story' delay='3200' />
      </div>
      <Footer />
    </div>
  )
}

export default Home