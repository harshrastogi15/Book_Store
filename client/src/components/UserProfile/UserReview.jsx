import React, {useEffect, useState} from 'react';
import style from '../../Private/css/Userprofile.module.css';
import {createreviewStar} from '../../specialFunction/CreateReviewStar';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquarePen, faTrashCan, faStar} from '@fortawesome/free-solid-svg-icons';
import {authToken, urlreviewbook} from '../../Appurl';
import LoaderCorousel from '../../loader/LoaderCorousel';
import {callMessage} from '../Alert/CallMessage';

function UserReview() {
  const [UserReviewsData, updateUserReviewsData] = useState({
    load: false,
    data: [],
  });
  const [Isloding, updateLoading] = useState(false);
  const [reviewDataUpdate, updatereviewDataUpdate] = useState({
    bookname: '',
    reviewmessage: '',
    id: '',
    star: '',
  });
  const [cntStar, updateStar] = useState(0);

  const fetchUserReviews = () => {
    fetch(`${urlreviewbook}/userreview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': authToken,
      },
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updateUserReviewsData({
              ...UserReviewsData,
              load: true,
              data: res.data,
            });
          }
          updateLoading(true);
        }).catch(() => {
          updateLoading(false);
        });
  };

  const deleteUserReview = async (id) => {
    // confirm("Do you want to delete");

    const text = 'Do you want to delete your review?';
    const check = window.confirm(text);
    if (check) {
      // console.log(id);

      await fetch(`${urlreviewbook}/deleteuserreview`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth_token': authToken,
        },
        body: JSON.stringify({
          id: id,
        }),
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 0) {
              callMessage('Successful', 'Deleted');
              fetchUserReviews();
            } else {
              callMessage('Error', 'Unable to delete');
            }
          }).catch(() => {
            callMessage('Server Error', 'Unable to connect');
          });
    }
  };

  const updateUserReview = (e) => {
    document.getElementById(style.ModelCSSReview).style.left = '0';
    starreview(e['star']);
    updatereviewDataUpdate({
      bookname: e['bookname'],
      reviewmessage: e['reviewmessage'],
      star: e['star'],
      id: e['id'],
    });
  };

  const updateReviewFunction = (event) => {
    updatereviewDataUpdate({...reviewDataUpdate, reviewmessage: event.target.value});
  };

  const starreview = (e) => {
    let star = document.getElementById('star');
    star = star.children;
    if (cntStar < e) {
      for (let i = 0; i < e; i++) {
        star[i].className = style.yesstar;
      }
      updateStar(e);
    } else {
      for (let i = 4; i >= e - 1; i--) {
        star[i].className = style.nostar;
      }
      updateStar(e - 1);
    }
  };

  const updateReviewBackend = () => {
    reviewDataUpdate['star'] = cntStar;

    fetch(`${urlreviewbook}/updateUserReview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': authToken,
      },
      body: JSON.stringify({
        bookname: reviewDataUpdate['bookname'],
        reviewmessage: reviewDataUpdate['reviewmessage'],
        id: reviewDataUpdate['id'],
        star: reviewDataUpdate['star'],
      }),
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            fetchUserReviews();
            callMessage('Successful', 'Updated');
          } else {
            callMessage('Error', 'Unable to update');
          }
        }).catch(() => {
          callMessage('Server Error', 'Unable to connect');
        });
  };

  useEffect(() => {
    fetchUserReviews();
  }, []);


  return (
    <div className={style.userReviewSide}>
      <div id={style.ModelCSSReview}>
        <div id={style.UpdateReviewModel}>
          <p id={style.updateReviewBookname}>{reviewDataUpdate['bookname']}</p>
          <div id='star'>
            <span className={style.nostar} onClick={() => starreview(1)}><FontAwesomeIcon icon={faStar} /></span>
            <span className={style.nostar} onClick={() => starreview(2)} ><FontAwesomeIcon icon={faStar} /></span>
            <span className={style.nostar} onClick={() => starreview(3)} ><FontAwesomeIcon icon={faStar} /></span>
            <span className={style.nostar} onClick={() => starreview(4)} ><FontAwesomeIcon icon={faStar} /></span>
            <span className={style.nostar} onClick={() => starreview(5)} ><FontAwesomeIcon icon={faStar} /></span>
          </div>
          <textarea type='text' id='UpdateReviewMessage' value={reviewDataUpdate.reviewmessage} onChange={(event) => updateReviewFunction(event)} />
          <div className={style.but}>
            <button type='button' onClick={() => updateReviewBackend()}>Update</button>
            <button type='button' onClick={() => {
              document.getElementById(style.ModelCSSReview).style.left = '-100%';
            }}>Close</button>
          </div>
        </div>
      </div>
      <h1>Your reviews</h1>
      {!Isloding ? <LoaderCorousel /> :
        UserReviewsData['load'] ?
          UserReviewsData['data'].length === 0 ?
            <div className={style.Usernoreviews}>No Reviews available</div> :
            UserReviewsData['data'].map((e) => {
              return <div className={style.UserReviewAboutBook} key={e.id}>
                <div className={style.UserReviewBookname}>
                  <p>{e.bookname}</p>
                  {createreviewStar(e.star)}
                </div>
                <p>{e.reviewmessage}</p>
                <div className={style.IconDesignUserReview}>
                  <div>
                    <FontAwesomeIcon icon={faSquarePen} onClick={() => {
                      updateUserReview(e);
                    }} />
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faTrashCan} onClick={() => {
                      deleteUserReview(e.id);
                    }} />
                  </div>
                </div>
              </div>;
            }) :
          <div className={style.Usernoreviews}>No Reviews available</div>
      }
    </div>
  );
}

export default UserReview;
