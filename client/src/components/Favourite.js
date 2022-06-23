import React, { useEffect, useState } from 'react'
import { auth_token, urlFavourite } from '../Appurl'
import style from '../Private/css/Favourite.module.css'
import iurl from '../Private/data/booksimage/amnesty.jpg'
import { Link } from 'react-router-dom'
import FetchImage from '../specialFunction/FetchImage'
import Footer from './Footer'

function Favourite() {
    const [favbookdata, updateFavBookData] = useState({
        load: false,
        data: []
    });

    const fetchFavouriteData = () => {
        fetch(`${urlFavourite}/send`, {
            headers: {
                auth_token: auth_token
            }
        }).then(res => res.json())
            .then(res => {
                if (res.status === 0) {
                    updateFavBookData({
                        ...favbookdata,
                        load: true,
                        data: res.data
                    })
                }
            })
            .catch(err => {
            })
    }


    useEffect(() => {
        return () => {
            fetchFavouriteData();
        }
    }, [])


    return (
        <div>
            <div className={style.favourite}>
                <h1>Your Favourite Books</h1>
                <div className={style.favbook}>
                    {favbookdata['load']
                        ? favbookdata['data'].map((e) => {
                            return <div className={style.Favbookdata} key={e.id}>
                                <div className={style.FavBookImage}>
                                    <FetchImage title={e.title} id={e.bookid} />
                                </div>
                                <div className={style.Favbookdetail}>
                                    <h1>{e.title}</h1>
                                    <h2>{e.author}</h2>
                                    <Link to={`/book/${e.bookid}/${e.title}/${e.author}`}>Read More</Link>
                                </div>
                            </div>
                        })
                        : <div style={{'height':'50vh'}}></div>}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Favourite