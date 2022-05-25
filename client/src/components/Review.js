import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import '../Private/css/Review.css'
function Review() {
    const [cntStar, updateStar] = useState(0)
    const starreview = (e) => {
        // console.log(e);
        var star = document.getElementById('star');
        star = star.children;
        if (cntStar < e) {
            for (var i = 0; i < e; i++) {
                star[i].className = 'yesstar'
            }
            updateStar(e);
        }else{
            for (var i = 4; i >= e-1; i--) {
                star[i].className = 'nostar'
            }
            updateStar(e-1);
        }
    }

    return (
        <div>
            <h1 className='reviewheading'>Reviews</h1>
            <div className='reviews'>

            </div>
            <div className='viewerreview'>
                <p>Give your review</p>
                <div id='star'>
                    <span className='nostar' onClick={() => starreview(1)}><FontAwesomeIcon icon={faStar} /></span>
                    <span className='nostar' onClick={() => starreview(2)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className='nostar' onClick={() => starreview(3)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className='nostar' onClick={() => starreview(4)} ><FontAwesomeIcon icon={faStar} /></span>
                    <span className='nostar' onClick={() => starreview(5)}  ><FontAwesomeIcon icon={faStar} /></span>
                </div>
                <textarea className='writereview' />
                <button type='button'> Add </button>
            </div>
        </div>
    )
}

export default Review