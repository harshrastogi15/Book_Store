import React, { useEffect, useState } from 'react'
import '../Private/css/DetailBook.css'
import { urlbook } from '../Appurl'
import Loader from '../loader/Loader'
import { arrayBufferToBase64 } from '../specialFunction/BufferToBinary'

import Review from './Review'


function DetailBook() {
    let url = window.location.pathname
    url = url.replace(/%20/g, " ")
    let arrdata = url.split("/")
    const bookid = arrdata[2];
    const booktitle = arrdata[3];
    const bookauthor = arrdata[4];
    const [category, updatecategory] = useState("");
    const [language, updatelanuage] = useState("");
    const [publication, updatepublication] = useState("");
    const [IsLoading, updateLoading] = useState(false);
    const [image, getimage] = useState({
        load: false,
        contentType: "",
        img: {}
    })
    // console.log(url);
    // console.log(bookid);
    // console.log(booktitle);
    // console.log(bookauthor);

    const fetchBookDetail = async () => {
        updateLoading(true);
        await fetch(`${urlbook}/onebook/id`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                id: bookid,
                title: booktitle,
                author: bookauthor
            })
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                if (res.status === 0) {
                    updatelanuage(res.data.language);
                    updatecategory(res.data.category);
                    updatepublication(res.data.publication)
                }
            })
            .catch((err) => {

            })
        updateLoading(false);
        fetchbookImage();
    }

    const fetchbookImage = () => {
        fetch(`${urlbook}/image`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                title: booktitle,
                bookId: bookid
            })
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                if (res['status'] === 0) {
                    getimage({
                        ...image,
                        load: true,
                        contentType: "res.image.contentType",
                        img: arrayBufferToBase64(res.image.data.data)
                    })
                } else {
                    getimage({
                        ...image,
                        load: false,
                    })
                }
            })
            .catch(
                (error) => {
                    getimage({
                        ...image,
                        load: false,
                    })
                }
            )
    }


    useEffect(() => {
        fetchBookDetail();
    }, [])

    return (
        <div className='bookdetail'>
            {IsLoading ? <Loader /> : <div></div>}
            <div className='aboutBook'>
                <div className='bookimage'>
                    {image.load ?
                        <img src={`data:${image.contentType};base64,${image['img'].toString('base64')}`} alt="Server Error" width={'100%'} height={'100%'} />
                        : <div>Loading ...</div>
                    }
                </div>
                <div className='bookdata'>
                    <h1>{booktitle}</h1>
                    <h2>Author: <span>{bookauthor}</span></h2>
                    <h3>Category:<span> {category}</span></h3>
                    <h3>Language:<span> {language}</span></h3>
                    <h4>Publish by <span>{publication}</span></h4>
                </div>
            </div>
            <div className='bookreviews'>
                <Review bookid = {bookid} bookname={booktitle}/>
            </div>
        </div>
    )
}

export default DetailBook