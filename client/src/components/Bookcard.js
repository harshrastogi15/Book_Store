import React from 'react'
import '../Private/css/Corousel.css'
import iurl from '../Private/data/booksimage/amnesty.jpg'
import { Link } from 'react-router-dom'
function Bookcard() {
    return (
        <div className='bookcard'>
            <Link to='book/amnesty'>
                <div className='image'>
                    <img alt='Server Error' src={iurl} width='100%' height={'100%'} />
                </div>
                <p>Amnesty</p>
                <p>Adiga, Aravind</p>
            </Link>
        </div>
    )
}

export default Bookcard