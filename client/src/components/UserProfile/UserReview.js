import React from 'react'
import '../../Private/css/Userprofile.css'
import { createreviewStar } from '../../specialFunction/CreateReviewStar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePen, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function UserReview() {
    return (
        <div className='userReview'>
            <h1>Your reviews</h1>
            <div className='UserReviewAboutBook'>
                <div className='UserReviewBookname'>
                    <p>Bookname</p>
                    {createreviewStar(5)}
                </div>
                <p>Wonderfull book</p>
                <div className='IconDesignUserReview'>
                    <div>
                        <FontAwesomeIcon icon={faSquarePen} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            </div>
            <div className='UserReviewAboutBook'>
                <div className='UserReviewBookname'>
                    <p>Bookname</p>
                    {createreviewStar(5)}
                </div>
                <div>
                    <p>Wonderfull book</p>
                </div>
                <div className='IconDesignUserReview'>
                    <div>
                        <FontAwesomeIcon icon={faSquarePen} />
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserReview