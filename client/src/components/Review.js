import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import style from '../Private/css/Review.module.css'
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { auth_token, urlreviewbook } from '../Appurl';
import { createreviewStar } from '../specialFunction/CreateReviewStar';
import { callMessage } from './Alert/CallMessage';


function Review(props) {
    const { bookid, bookname } = props;
    const naviagte = useNavigate();
    const IsLogin = useSelector((state) => state.user.login);
    const [cntStar, updateStar] = useState(0);
    const [reviewdata, updatereview] = useState("");
    const [message, updatemessage] = useState("")
    const [fetchReviewData, updatefetchReviewData] = useState([]);


    const starreview = (e) => {
        var star = document.getElementById('star');
        star = star.children;
        if (cntStar < e) {
            for (var i = 0; i < e; i++) {
                star[i].className = style.yesstar
            }
            updateStar(e);
        } else {
            for (i = 4; i >= e - 1; i--) {
                star[i].className = style.nostar
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
                'auth_token': auth_token
            },
            body: JSON.stringify({
                bookid,
                star: cntStar,
                bookname: bookname,
                review: reviewdata
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 0) {
                    updatemessage('Added to reviews')
                    callMessage('Successful','Added to reviews');
                    fetchReview();
                    updatereview("");
                } else {
                    updatemessage('Sorry, Unable to add')
                    callMessage('Server Error','Unable to Add your reviews');
                }
            })
            .catch(()=>{
                callMessage('Server Error','Unable to Add your reviews');
            });
    }

    const fetchReview = () => {
        fetch(`${urlreviewbook}/sendreview/${bookid}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 0) {
                    updatefetchReviewData(res.data);
                }
            }).catch(()=>{
                callMessage('Server Error','Unable to fetch detail');
            })
    }

    useEffect(() => {
        fetchReview();
    }, [])


    return (
        <div>
            <h1 className={style.reviewheading}>Reviews</h1>
            <div className={style.reviews}>
                {fetchReviewData.length === 0 ? <h1> Be the first one  to give review </h1> :
                    fetchReviewData.map((e) => {
                        return <div className={style.ViewerReview} key={e.id}>
                            <div className={style.ViewerReviewText}>{e.reviewmessage}</div>
                            <div className={style.ViewerStar}>
                                <p><span>By</span> {e.username}</p>
                                {/* {createreviewStar(e.star)} */}
                                {createreviewStar(e.star)}
                            </div>
                        </div>
                    })
                }
            </div>
            <div className={style.UserReview}>
                <p>Give your review</p>
                <p>{message}</p>
                <div id='star'>
                    <span className={style.nostar} onClick={() => starreview(1)}><FontAwesomeIcon icon={faStar} /></span>
                    <span className={style.nostar} onClick={() => starreview(2)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className={style.nostar} onClick={() => starreview(3)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className={style.nostar} onClick={() => starreview(4)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className={style.nostar} onClick={() => starreview(5)}  ><FontAwesomeIcon icon={faStar} /></span>
                </div>
                <textarea className={style.writereview} value={reviewdata} onChange={(e) => updatereview(e.target.value)} />
                <button type='button' onClick={sendResponseReview} > Add </button>
                <p>
                    <Link to='/user'>See all of your review here</Link>
                </p>
            </div>
        </div>
    )
}

export default Review