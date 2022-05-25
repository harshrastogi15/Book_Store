import React, { useEffect, useState } from 'react'
import '../Private/css/Corousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import Bookcard from './Bookcard';
import Loader from '../loader/Loader'
import { urlbook } from '../Appurl';

function Corousel(props) {
    const [Isloding, updateLoding] = useState(false);
    const { type, delay } = props;
    const [booksData, updateData] = useState({
        load: false,
        data: []
    });

    const runningCorouselnext = () => {
        const data = document.getElementById(`corouselhandel${type}`);
        // console.log(data.children);
        const firstelement = data.children[0];
        data.removeChild(firstelement);
        data.appendChild(firstelement);
    }
    const runningCorouselprev = () => {
        const data = document.getElementById(`corouselhandel${type}`);
        // console.log(data.children);
        // console.log(data.children.length);
        const firstelement = data.children[0];
        const lastelement = data.children[data.children.length - 1];
        data.removeChild(lastelement);
        data.insertBefore(lastelement, firstelement)
    }


    useEffect(() => {
        const interval = setInterval(() => {
            if (booksData.load) {
                runningCorouselnext();
            }
            // console.log('created');
        }, Number(delay));
        return () => clearInterval(interval);
    }, [runningCorouselnext])

    const datafetch = async () => {
        updateLoding(true);
        await fetch(`${urlbook}/sendbooks/all`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((res) => res.json())
            .then((res) => {
                // console.log(res);
                if (res.status === 0) {
                    updateData({
                        ...booksData,
                        load: true,
                        data: res.bookdata
                    })
                } else {
                    updateData({
                        ...booksData,
                        load: false,
                    })
                }
            })
            .catch((error) => {
                updateData({
                    ...booksData,
                    load: false,
                })
            })
        updateLoding(false)
    }


    useEffect(() => {
        datafetch();

    }, []);

    return (
        <div className='multiCorousel'>
            {Isloding ?
                <Loader /> : <div></div>
            }
            {booksData['load'] ?
                <div>
                    <div className='corouselTittle'>
                        <h1>{type}</h1>
                        <Link to={`/type/${type}`}>
                            <FontAwesomeIcon className='corouselIcon' icon={faCircleRight} />
                        </Link>
                    </div>
                    <div className='corouseldesign'>
                        <FontAwesomeIcon className='corouselIcon' icon={faAngleLeft} onClick={runningCorouselprev} />
                        <div className='corouselBody'>
                            <div className='corouselwork' id={`corouselhandel${type}`}>
                                {
                                    booksData['data'].map((e) => {
                                        return <Bookcard detail={e} key={e._id} />
                                    })
                                }

                            </div>
                        </div>
                        <FontAwesomeIcon className='corouselIcon' icon={faAngleRight} onClick={runningCorouselnext} />
                    </div>
                </div>
                :
                <div></div>}
        </div>
    )
}

export default Corousel