import React, { useEffect } from 'react'
import { auth_token, urlFavourite } from '../Appurl'
import style from '../Private/css/Favourite.module.css'
import iurl from '../Private/data/booksimage/amnesty.jpg'

function Favourite() {

    const fetchFavouriteData = () => {
        fetch(`${urlFavourite}/send`, {
            headers: {
                auth_token: auth_token
            }
        }).then(res => res.json())
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
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
                <div className={style.Favbookdata}>
                    <div className={style.FavBookImage}>
                        <img src={iurl} width='100%' height={'100%'} />
                    </div>
                    <div className={style.Favbookdetail}>
                        <h1>booktitle</h1>
                        <h2>bookauthor</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favourite