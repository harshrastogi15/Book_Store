import React, { useEffect, useState } from 'react'
import '../../Private/css/Userprofile.css'
import { createreviewStar } from '../../specialFunction/CreateReviewStar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePen, faTrashCan, faStar } from '@fortawesome/free-solid-svg-icons'
import { auth_token, urlreviewbook } from '../../Appurl'
import LoaderCorousel from '../../loader/LoaderCorousel'

function UserReview() {

    const [UserReviewsData, UpdateUserReviewsData] = useState({
        load: false,
        data: []
    })
    const [Isloding, updateLoading] = useState(false)
    const [reviewDataUpdate, updatereviewDataUpdate] = useState({
        bookname: '',
        reviewmessage: '',
        id: '',
        star: ''
    });
    const [cntStar, updateStar] = useState(0);
    const [message, updatemessage] = useState('No message');

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
                        // window.alert('Deleted Successfull');
                        updatemessage('Deleted Successfully');
                        document.getElementById('ModelCSSMessage').style.left = '0';
                    } else {
                        // window.alert('Unable to delete');
                        updatemessage('Unable to Delete');
                        document.getElementById('ModelCSSMessage').style.left = '0';
                    }
                }).catch(() => {
                    // window.alert('Unable to delete');
                    updatemessage('Unable to connect');
                    document.getElementById('ModelCSSMessage').style.left = '0';
                })


        }
    }

    const updateUserReview = (e) => {
        document.getElementById('ModelCSSReview').style.left = '0';
        starreview(e['star']);
        updatereviewDataUpdate({
            bookname: e['bookname'],
            reviewmessage: e['reviewmessage'],
            star: e['star'],
            id: e['id']
        })
    }

    const UpdateReviewFunction = (event) => {
        updatereviewDataUpdate({ ...reviewDataUpdate, reviewmessage: event.target.value })
    }

    const starreview = (e) => {
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

    const UpdateReviewBackend = () => {
        reviewDataUpdate['star'] = cntStar;

        fetch(`${urlreviewbook}/updateUserReview`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth_token': auth_token
            },
            body: JSON.stringify({
                bookname: reviewDataUpdate['bookname'],
                reviewmessage: reviewDataUpdate['reviewmessage'],
                id: reviewDataUpdate['id'],
                star: reviewDataUpdate['star']
            })
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.status === 0) {
                    fetchUserReviews();
                    updatemessage('Update Successfully');
                    document.getElementById('ModelCSSMessage').style.left = '0';
                    document.getElementById('ModelCSSReview').style.left = '-100%';
                } else {
                    updatemessage('Unable to update');
                    document.getElementById('ModelCSSMessage').style.left = '0';
                }
            }).catch(() => {
                updatemessage('Unable to connect');
                document.getElementById('ModelCSSMessage').style.left = '0';
            })
    }

    useEffect(() => {
        fetchUserReviews();
    }, [])


    return (
        <div className='userReviewSide'>
            <div id='ModelCSSReview'>
                <div id='UpdateReviewModel'>
                    <p id='updateReviewBookname'>{reviewDataUpdate['bookname']}</p>
                    <div id='star'>
                        <span className='nostar' onClick={() => starreview(1)}><FontAwesomeIcon icon={faStar} /></span>
                        <span className='nostar' onClick={() => starreview(2)} ><FontAwesomeIcon icon={faStar} /></span>
                        <span className='nostar' onClick={() => starreview(3)} ><FontAwesomeIcon icon={faStar} /></span>
                        <span className='nostar' onClick={() => starreview(4)} ><FontAwesomeIcon icon={faStar} /></span>
                        <span className='nostar' onClick={() => starreview(5)}  ><FontAwesomeIcon icon={faStar} /></span>
                    </div>
                    <textarea type='text' id='UpdateReviewMessage' value={reviewDataUpdate.reviewmessage} onChange={(event) => UpdateReviewFunction(event)} />
                    <div className='but'>
                        <button type='button' onClick={() => UpdateReviewBackend()}>Update</button>
                        <button type='button' onClick={() => { document.getElementById('ModelCSSReview').style.left = '-100%'; }}>Close</button>
                    </div>
                </div>
            </div>
            <div id='ModelCSSMessage'>
                <div id='ShowmessageModel'>
                    <p>{message}</p>
                    <button type='button' onClick={() => { document.getElementById('ModelCSSMessage').style.left = '-100%'; }}>Close</button>
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