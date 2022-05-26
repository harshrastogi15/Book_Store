import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import '../Private/css/Review.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Review(props) {
    const {bookid} = props; 
    const naviagte = useNavigate();
    const IsLogin = useSelector((state) => state.user.login);
    const [cntStar, updateStar] = useState(0);
    const [reviewdata, updatereview] = useState("");
    const [message, updatemessage] = useState("")


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
        console.log(bookid);
        console.log(cntStar);
        console.log(reviewdata);
    }

    return (
        <div>
            <h1 className='reviewheading'>Reviews</h1>
            <div className='reviews'>

            </div>
            <div className='viewerreview'>
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