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
    const [reviewDataUpdate, updatereviewDataUpdate] = useState({
        bookname:'',
        reviewmessage:'',
        id:'',
        star:''
    });

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
                body: JSON.stringify({
                    id: id
                })
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status === 0) {
                        fetchUserReviews();
                        window.alert('Deleted Successfull');
                    } else {
                        window.alert('Unable to delete');
                    }
                }).catch(() => {
                    window.alert('Unable to delete');
                })


        }
    }

    const updateUserReview =(e) => {
        console.log(e);
        document.getElementById('ModelCSSReview').style.left='0';

        updatereviewDataUpdate({
            bookname:e['bookname'],
            reviewmessage:e['reviewmessage'],
            star:e['star'],
            id:e['id']
        })
    }

    const UpdateReviewFunction = (event)=>{
        updatereviewDataUpdate({...reviewDataUpdate,reviewmessage:event.target.value})
    }

    useEffect(() => {
        fetchUserReviews();
    }, [])


    return (
        <div className='userReview'>
            <div id='ModelCSSReview'>
                <div id='UpdateReviewModel'>
                    <p id='updateReviewBookname'>{reviewDataUpdate['bookname']}</p>
                    <textarea type='text' id='UpdateReviewMessage' value={reviewDataUpdate.reviewmessage} onChange={(event)=>UpdateReviewFunction(event)} />
                    <div className='but'>
                        <button type='button'>Update</button>
                        <button type='button' onClick={()=>{document.getElementById('ModelCSSReview').style.left='-100%';}}>Close</button>
                    </div>
                </div>
            </div>
            <h1>Your reviews</h1>
            {!Isloding ? <LoaderCorousel /> :
                UserReviewsData['load'] ?
                    UserReviewsData['data'].length === 0 ?
                        <div className='Usernoreviews'>No Reviews available</div>
                        :
                        UserReviewsData['data'].map((e) => {
                            return <div className='UserReviewAboutBook' key={e.id}>
                                <div className='UserReviewBookname'>
                                    <p>{e.bookname}</p>
                                    {createreviewStar(e.star)}
                                </div>
                                <p>{e.reviewmessage}</p>
                                <div className='IconDesignUserReview'>
                                    <div>
                                        <FontAwesomeIcon icon={faSquarePen} onClick={() => { updateUserReview(e) }} />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon icon={faTrashCan} onClick={() => { deleteUserReview(e.id) }} />
                                    </div>
                                </div>
                            </div>
                        })
                    :
                    <div className='Usernoreviews'>No Reviews available</div>
            }
        </div>
    )
}

export default UserReview