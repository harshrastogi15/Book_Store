import React from 'react'
import '../Private/css/Corousel.css'
import iurl from '../Private/data/booksimage/amnesty.jpg'
import { Link } from 'react-router-dom'
function Bookcard(props) {
    const { detail } = props;

    
    return (
        <div className='bookcard'>
            <Link to='book/amnesty'>
                <div className='image'>
                    <img alt='Server Error' src={iurl} width='100%' height={'100%'} />
                </div>
                <p>{detail['title']}</p>
                <p>{detail['author']}</p>
            </Link>
        </div>
    )
}

export default Bookcard