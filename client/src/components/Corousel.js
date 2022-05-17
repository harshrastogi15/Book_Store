import React, { useEffect } from 'react'
import '../Private/css/Corousel.css'
function Corousel( props) {
    const {type} = props;
    const runningCorouselnext =()=>{
        const data = document.getElementById(`Coroselhandel${type}`);
        // console.log(data.children);
        const firstelement = data.children[0];
        data.removeChild(firstelement);
        data.appendChild(firstelement);
    }
    const runningCorouselprev =()=>{
        const data = document.getElementById(`Coroselhandel${type}`);
        // console.log(data.children);
        // console.log(data.children.length);
        const firstelement = data.children[0];
        const lastelement = data.children[data.children.length-1];
        data.removeChild(lastelement);
        data.insertBefore(lastelement,firstelement)
        
    }


    useEffect(()=>{
        const interval = setInterval(() => {
            runningCorouselnext();
            // console.log('created');
        }, 1500);

        return ()=>clearInterval(interval);
    },[])

  return (
    <div className='multiCorousel'>
        <h1>Heading</h1>
        <button onClick={runningCorouselnext}>Click</button>
        <button onClick={runningCorouselprev}>Click</button>
        <div className='coroselwork' id={`Coroselhandel${type}`}>
            <div className='coroselCard'>First</div>
            <div className='coroselCard'>Second</div>
            <div className='coroselCard'>Third</div>
            <div className='coroselCard'>Fourth</div>
            <div className='coroselCard'>Five</div>
        </div>

    </div>
  )
}

export default Corousel