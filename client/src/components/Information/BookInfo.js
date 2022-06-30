import React from 'react'
import style from '../../Private/css/Info.module.css'
import Footer from '../Footer'
import { GifLogo1, GifLogo2 } from '../GifLogo'
function BookInfo() {
    return (
        <div>
            <div className={style.Bookinfo}>
                <div className={style.InfoLogoGIF}>
                    <GifLogo1 />
                </div>
                <div className={style.BookinfoForm}>
                    <h1>Fill Book Detail</h1>
                    <div className={style.BookinfoFormDesign}>
                        <input type='text' placeholder='Enter Book Name' />
                    </div>
                    <div className={style.BookinfoFormDesign}>
                        <input type='text' placeholder='Enter Author Name' />
                    </div>
                    <h2>Personal Detail</h2>
                    <div className={style.BookinfoFormDesign}>
                        <input type='text' placeholder='Enter Name' />
                    </div>
                    <div className={style.BookinfoFormDesign}>
                        <input type='text' placeholder='Enter Email' />
                    </div>
                    <button type='button'>Send</button>
                </div>
                <div className={style.InfoLogoGIF}>
                    <GifLogo2 />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default BookInfo