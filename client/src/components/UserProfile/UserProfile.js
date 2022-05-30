import React from 'react'
import { useSelector } from 'react-redux'
import '../../Private/css/Userprofile.css'
import Lurl from '../../Private/data/tittleLogo.png'


function UserProfile() {

    const name = useSelector(state => state.user.name)
    const email = useSelector(state => state.user.email)
    const phone = useSelector(state => state.user.phone)
    const pincode = useSelector(state => state.user.pincode)
    const address = useSelector(state => state.user.address)


    return <div className='userprofile'>
            <div className='AboutUser'>
                <div className='UserName'>
                    <div className='ProfileLogo'>
                        <img src={Lurl} alt="ServerError" width='100%' height='100%' />
                    </div>
                    <p>{name}</p>
                </div>
                <div className='Userdetail'>
                    <p> Email : <span>{email}</span></p>
                    <p> Phone : <span>{phone}</span></p>
                    <p> PinCode : <span>{pincode}</span></p>
                    <p> Address : <span>{address}</span></p>
                </div>
                <div>
                    <button type='button'>Edit</button>
                </div>
            </div>
            <div>
                <h1>Comment</h1>
            </div>
        </div>
}

export default UserProfile;