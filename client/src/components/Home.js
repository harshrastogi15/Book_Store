import React from 'react'
import Corousel from './Corousel'
import '../Private/css/Home.css'
import { GifLogo2 } from './GifLogo'
import Footer from './Footer'

function Home() {

  return (
    <div>
      <div className='homeclass'>
        <Corousel type='All' delay='2000' />
        <Corousel type='Novel' delay='2000' />
        <div className='HomecorouselShow'>
          <div className='Homecorouselwidth'>
            <Corousel type='All' delay='3000' />
          </div>
          <div className='HomeLogoGif' >
            <GifLogo2 />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home