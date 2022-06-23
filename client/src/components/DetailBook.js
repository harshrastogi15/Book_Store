import React, { useEffect, useState } from 'react'
import '../Private/css/DetailBook.css'
import { auth_token, urlbook, urlFavourite } from '../Appurl'
import Loader from '../loader/Loader'
import Review from './Review'
import Footer from './Footer'
import Corousel from './Corousel'
import { useLocation } from 'react-router-dom'
import FetchImage from '../specialFunction/FetchImage'


function DetailBook() {
    let location = useLocation();
    let url = location.pathname
    url = url.replace(/%20/g, " ")
    let arrdata = url.split("/")
    let bookid = arrdata[2];
    let booktitle = arrdata[3];
    let bookauthor = arrdata[4];
    const [category, updatecategory] = useState("");
    const [language, updatelanuage] = useState("");
    const [publication, updatepublication] = useState("");
    const [IsLoading, updateLoading] = useState(false);
    // console.log(url);
    // console.log(bookid);
    // console.log(booktitle);
    // console.log(bookauthor);

    const fetchBookDetail = async () => {
        url = location.pathname
        url = url.replace(/%20/g, " ")
        arrdata = url.split("/")
        bookid = arrdata[2];
        booktitle = arrdata[3];
        bookauthor = arrdata[4];
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
    }


    const addFavourite = ()=>{
        fetch(`${urlFavourite}/add`,{
            method:'POST',
            headers:{
                'content-type': 'application/json',
                auth_token:`${auth_token}`
            },
            body :JSON.stringify({
                bookid:bookid,
                bookname:booktitle,
                author:bookauthor
            })
        })
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(() => {
        fetchBookDetail();
    }, [location])

    return (
        <div>
            <div className='bookdetail'>
                {IsLoading ? <Loader /> : <div></div>}
                <div className='aboutBook'>
                    <div className='bookimage'>
                        <FetchImage title={booktitle} id={bookid}/>
                    </div>
                    <div className='bookdata'>
                        <h1>{booktitle}</h1>
                        <h2>Author: <span>{bookauthor}</span></h2>
                        <h3>Category:<span> {category}</span></h3>
                        <h3>Language:<span> {language}</span></h3>
                        <h4>Publish by <span>{publication}</span></h4>
                        <p onClick={addFavourite}>Add to favourite</p>
                    </div>
                </div>
                <div className='bookreviews'>
                    <Review bookid={bookid} bookname={booktitle} />
                </div>
            </div>
            {IsLoading ? <div></div> : <Corousel type={category.length===0 ? 'All': category} delay='3200' />}
            <Footer />
        </div>
    )
}

export default DetailBook