import React from 'react';
import Corousel from './Corousel/Corousel';
import style from '../Private/css/Home.module.css';
import {GifLogo2} from './Logo/GifLogo';
import Footer from './Footer/Footer';

function Home() {
  return (
    <div>
      <div className={style.homeclass}>
        <Corousel type='All' delay='3050' />
        <div className={style.HomecorouselShow}>
          <div className={style.Homecorouselwidth}>
            <Corousel type='Novel' delay='3100' />
          </div>
          <div className={style.HomeLogoGif} >
            <GifLogo2 />
          </div>
        </div>
        <Corousel type='Story' delay='3200' />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
