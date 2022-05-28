import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import '../Private/css/Review.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { urlreviewbook } from '../Appurl';


function Review(props) {
    const { bookid } = props;
    const naviagte = useNavigate();
    const IsLogin = useSelector((state) => state.user.login);
    const [cntStar, updateStar] = useState(0);
    const [reviewdata, updatereview] = useState("");
    const [message, updatemessage] = useState("")
    const [fetchReviewData, updatefetchReviewData] = useState([]);


    const starreview = (e) => {
        // console.log(e);
        var star = document.getElementById('star');
        star = star.children;
        if (cntStar < e) {
            for (var i = 0; i < e; i++) {
                star[i].className = 'yesstar'
            }
            updateStar(e);
        } else {
            for (i = 4; i >= e - 1; i--) {
                star[i].className = 'nostar'
            }
            updateStar(e - 1);
        }
    }

    const sendResponseReview = () => {
        if (!IsLogin) {
            naviagte('/login');
        }

        if (reviewdata.length < 4) {
            updatemessage('Please Write at least four letters')
            return;
        }
        if (cntStar === 0) {
            updatemessage('Please give star rating')
            return;
        }

        updatemessage("");

        fetch(`${urlreviewbook}/addreview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                bookid,
                star: cntStar,
                review: reviewdata
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.status === 0) {
                    updatemessage('Added to reviews')
                    fetchReview();
                    updatereview("");
                } else {
                    updatemessage('Sorry, Unable to add')
                }
            })
            .catch();
    }

    const fetchReview = () => {
        fetch(`${urlreviewbook}/sendreview/${bookid}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res.status === 0) {
                    updatefetchReviewData(res.data);
                }
            })
    }

    const createreviewStar = (star) => {
        var row = [];
        for (let index = 0; index < star; index++) {
            row.push(<span style={{ 'color': 'rgb(255, 174, 0)' }} key={index}><FontAwesomeIcon icon={faStar} /></span>)
        }
        for (let index = star; index < 5; index++) {
            row.push(<span style={{ 'color': 'rgb(94, 92, 92)' }} key={index}><FontAwesomeIcon icon={faStar} /></span>)
        }
        return <div id=''>
            {row}
        </div>
    }

    useEffect(() => {
        fetchReview();
    }, [])


    return (
        <div>
            <h1 className='reviewheading'>Reviews</h1>
            <div className='reviews'>
                {/* {console.log(fetchReviewData)} */}
                {fetchReviewData.length === 0 ? <h1> Be the first one  to give review </h1> :
                    fetchReviewData.map((e) => {
                        return <div className='ViewerReview' key={e.id}>
                            <div className='ViewerStar'>
                                <p>By: {e.username.toUpperCase()}</p>
                                {createreviewStar(e.star)}
                            </div>
                            <div className='ViewerReviewTest'>{e.reviewmessage}</div>
                        </div>
                    })
                }

            </div>
            <div className='UserReview'>
                <p>Give your review</p>
                <p>{message}</p>
                <div id='star'>
                    <span className='nostar' onClick={() => starreview(1)}><FontAwesomeIcon icon={faStar} /></span>
                    <span className='nostar' onClick={() => starreview(2)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className='nostar' onClick={() => starreview(3)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className='nostar' onClick={() => starreview(4)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className='nostar' onClick={() => starreview(5)}  ><FontAwesomeIcon icon={faStar} /></span>
                </div>
                <textarea className='writereview' value={reviewdata} onChange={(e) => updatereview(e.target.value)} />
                <button type='button' onClick={sendResponseReview} > Add </button>
            </div>
        </div>
    )
}

export default Review