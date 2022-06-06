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

    const deleteUserReview = async (id) => {
        // confirm("Do you want to delete");
        var text = "Do you want to delete your review?";
        var check = window.confirm(text);
        if (check) {
            // console.log(id);

            await fetch(`${urlreviewbook}/deleteuserreview`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': auth_token
                },
                body:JSON.stringify({
                    id:id
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === 0) {
                        fetchUserReviews();
                        window.alert('Deleted Successfull');
                    }else{
                        window.alert('Unable to delete');
                    }
                }).catch(() => {
                    window.alert('Unable to delete');
                })


        }
    }

    const updateUserReview =async ()=>{

    }

    useEffect(() => {
        fetchUserReviews();
    }, [])


    return (
        <div className='userReview'>
            <h1>Your reviews</h1>
            {!Isloding ? <LoaderCorousel /> :
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
                                    <FontAwesomeIcon icon={faSquarePen} onClick={()=>{updateUserReview()}}/>
                                </div>
                                <div>
                                    <FontAwesomeIcon icon={faTrashCan} onClick={() => { deleteUserReview(e.id) }} />
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