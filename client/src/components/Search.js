import React, { useEffect, useState } from 'react'
import styles from '../Private/css/Search.module.css'

function Search() {
    const [searchdata,updateSearchData] = useState({
        category:"All",
        title:"",
        author:"",
    })

    const changeData = (event)=>{
        updateSearchData({
            ...searchdata,
             [event.target.name] : event.target.value
        })
    }


    
    useEffect(()=>{
        console.log(searchdata);
    },[searchdata])


    return (
        <div className={styles.searchfile}>
            <div className={styles.searchfield}>
                <div className={styles.select}>
                    <select name="category" id="" onChange={(e)=>changeData(e)}>
                        <option value="All">All</option>
                        <option value="Novel">Novel</option>
                        <option value="Story">Story</option>
                    </select>
                </div>
                <input placeholder='Book Name' name='title' onChange={(e)=>changeData(e)} value={searchdata['title']}/>
                <input placeholder='Author Name' name='author' onChange={(e)=>changeData(e)} value={searchdata['author']}/>
            </div>
        </div>
    )
}

export default Search