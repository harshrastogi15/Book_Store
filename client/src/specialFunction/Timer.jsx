import React, {useEffect, useState} from 'react';

function Timer(props) {
  const {totalSecond, timer} = props;
  const [second, setSeconds] = useState(totalSecond);

  useEffect(() => {
    // console.log('timer');
    if ( timer ) {
      const interval = setInterval(() => {
        setSeconds((prevsecond) => prevsecond - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (time) => {
    if (time < 0) {
      return `0:00`;
    }
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return <div>OTP is valid for {formatTime(second)}</div>;
}

export default Timer;
