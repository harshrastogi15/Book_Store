import React, { useEffect, useState } from 'react'
import '../Private/css/Corousel.css'
import {arrayBufferToBase64} from '../specialFunction/BufferToBinary'
import {urlbook} from '../Appurl'
import { Link } from 'react-router-dom'
function Bookcard(props) {
    const { detail } = props;
    // console.log(detail);
    const {_id,title,author,} = detail;
    const [image,getimage] = useState({
        load:false,
        contentType:"",
        img:{}
    })
    // console.log(_id);

    
    useEffect(()=>{
        fetch(`${urlbook}/image`,{
            method:'POST',
            headers:{ 'content-type':'application/json'},
            body : JSON.stringify({
                title:title,
                bookId:_id,
            })
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res['status']===0){
                getimage({
                    ...image,
                    load:true,
                    contentType:"res.image.contentType",
                    img: arrayBufferToBase64(res.image.data.data)
                })
            }else{
                getimage({
                    ...image,
                    load:false,
                })
            }
        })
        .catch(
            (error)=>{
                getimage({
                    ...image,
                    load:false,
                })
            }
        )
    },[_id,title])

    return (
        <div className='bookcard'>
            <Link to={`book/${_id}/${title}/${author}`}>
                {/* {image.load?console.log(image):console.log('error')} */}
                <div className='image'>
                    {image.load?
                    <img alt='Server Error' src={`data:${image.contentType};base64,${image['img'].toString('base64')}`} width='100%' height={'100%'} />
                    :<div>Loading ...</div>
                    }
                </div>
                <p>{detail['title']}</p>
                <p>{detail['author']}</p>
            </Link>
        </div>
    )
}

export default Bookcard