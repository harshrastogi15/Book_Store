import React, { useEffect, useState } from 'react'
import '../../Private/css/Userprofile.css'
import { createreviewStar } from '../../specialFunction/CreateReviewStar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { auth_token, urlreviewbook } from '../../Appurl'
import LoaderCorousel from '../../loader/LoaderCorousel'

function UserReview() {

    const [UserReviewsData, UpdateUserReviewsData] = useState({
        load: false,
        data: []
    })
    const [Isloding, updateLoading] = useState(false)

    const fetchUserReviews = () => {
        fetch(`${urlreviewbook}/userreview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': auth_token
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 0) {
                    UpdateUserReviewsData({
                        ...UserReviewsData,
                        load: true,
                        data: res.data
                    })
                }
                updateLoading(true);
            }).catch(() => {
                updateLoading(false);
            })
    }

    useEffect(() => {
        fetchUserReviews();
    }, [])


    return (
        <div className='userReview'>
            <h1>Your reviews</h1>
            {!Isloding?<LoaderCorousel/>:
            UserReviewsData['load'] ? 
                UserReviewsData['data'].map((e) => {
                    return <div className='UserReviewAboutBook' key={e.id}>
                        <div className='UserReviewBookname'>
                            <p>{e.bookname}</p>
                            {createreviewStar(e.star)}
                        </div>
                        <p>{e.reviewmessage}</p>
                        <div className='IconDesignUserReview'>
                            <div>
                                <FontAwesomeIcon icon={faSquarePen} />
                            </div>
                            <div>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </div>
                        </div>
                    </div>
                })
                :
                <div>
                    No Reviews
                </div>
            }
        </div>
    )
}

export default UserReview