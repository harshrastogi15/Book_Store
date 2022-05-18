import React, { useEffect } from 'react'
import '../Private/css/Corousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function Corousel(props) {
    const { type } = props;
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
            runningCorouselnext();
            // console.log('created');
        }, 1800);
        return () => clearInterval(interval);
    }, [runningCorouselnext])

    return (
        <div className='multiCorousel'>
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
                        <div className='corouselCard'>First</div>
                        <div className='corouselCard'>Second</div>
                        <div className='corouselCard'>Third</div>
                        <div className='corouselCard'>Fourth</div>
                        <div className='corouselCard'>Five</div>
                        <div className='corouselCard'>Six</div>
                        <div className='corouselCard'>Seven</div>
                    </div>
                </div>
                <FontAwesomeIcon className='corouselIcon' icon={faAngleRight} onClick={runningCorouselnext} />
            </div>
        </div>
    )
}

export default Corousel