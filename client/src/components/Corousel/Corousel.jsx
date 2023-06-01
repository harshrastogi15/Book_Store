import React, {useEffect, useRef, useState} from 'react';
import '../../Private/css/Corousel.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faCircleRight} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import Bookcard from '../Bookcard';
// import Loader from '../loader/Loader'
import {urlbook} from '../../Appurl';
import LoaderCorousel from '../../loader/LoaderCorousel';

function Corousel(props) {
  const [Isloding, updateLoding] = useState(false);
  const {type, delay} = props;
  const [booksData, updateData] = useState({
    load: false,
    data: [],
  });
  const [initial, updateInitial] = useState(1);

  const scrollleftref = useRef();
  const runningCorouselnext = () => {
    const data = document.getElementById(`corouselhandel${type}`);
    let currentValue = scrollleftref.current.scrollLeft;
    const scrollValue = Math.ceil(data.offsetWidth / scrollleftref.current.offsetWidth);
    const scrollwidth = scrollleftref.current.offsetWidth;
    if (initial >= scrollValue) {
      updateInitial(1);
      currentValue = 0;
    } else {
      updateInitial(initial + 1);
      currentValue += scrollwidth;
    }
    scrollleftref.current.scrollLeft = currentValue;
  };
  const runningCorouselprev = () => {
    const data = document.getElementById(`corouselhandel${type}`);
    let currentValue = scrollleftref.current.scrollLeft;
    const scrollValue = Math.ceil(data.offsetWidth / scrollleftref.current.offsetWidth);
    const scrollwidth = scrollleftref.current.offsetWidth;
    if (initial === 1) {
      updateInitial(scrollValue);
      currentValue = data.offsetWidth;
    } else {
      updateInitial(initial - 1);
      currentValue -= scrollwidth;
    }
    scrollleftref.current.scrollLeft = currentValue;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (booksData.load) {
        runningCorouselnext();
      }
      // console.log('created');
    }, Number(delay));
    return () => clearInterval(interval);
  }, [runningCorouselnext]);

  const datafetch = async () => {
    updateLoding(true);
    await fetch(`${urlbook}/sendbooks/${type}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            updateData({
              ...booksData,
              load: true,
              data: res.bookdata,
            });
          } else {
            updateData({
              ...booksData,
              load: false,
            });
          }
        })
        .catch((error) => {
          updateData({
            ...booksData,
            load: false,
          });
        });
    updateLoding(false);
  };


  useEffect(() => {
    datafetch();
  }, []);

  return (
    <div className='multiCorousel'>
      {Isloding ?
        <div className='coroselLoaderUpper'><LoaderCorousel /></div> : <div></div>
      }
      {booksData['load'].length === 0 ? <div></div> :
        booksData['load'] ?
          <div>
            <div className='corouselTittle'>
              <h1>{type}</h1>
              <Link to={`/category/${type}`}>
                <FontAwesomeIcon className='corouselIcon' icon={faCircleRight} />
              </Link>
            </div>
            <div className='corouseldesign'>
              <FontAwesomeIcon className='corouselIcon' icon={faAngleLeft} onClick={runningCorouselprev} />
              <div className='corouselBody' ref={scrollleftref}>
                <div className='corouselwork' id={`corouselhandel${type}`} >
                  {
                    booksData['data'].map((e) => {
                      return <Bookcard detail={e} key={e._id} />;
                    })
                  }

                </div>
              </div>
              <FontAwesomeIcon className='corouselIcon' icon={faAngleRight} onClick={runningCorouselnext} />
            </div>
          </div> :
          <div></div>}
    </div>
  );
}

export default Corousel;
