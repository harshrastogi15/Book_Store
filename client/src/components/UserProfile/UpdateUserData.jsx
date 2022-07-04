import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import style from '../../Private/css/Userprofile.module.css'

function UpdateUserData() {
    const navigate = useNavigate();
    const name = useSelector(state => state.user.name)
    const email = useSelector(state => state.user.email)
    const phone = useSelector(state => state.user.phone)
    const pincode = useSelector(state => state.user.pincode)
    const address = useSelector(state => state.user.address)
    const login = useSelector(state => state.user.login)

    const [userdata, updateUserdata] = useState({
        name: "",
        phone: "",
        address: "",
        pincode: "",
        email: ""
    })

    const updateFunction = (event) => {
        updateUserdata({
            ...userdata,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        if (login == false) {
            navigate('/login')
        }
        updateUserdata({
            ...userdata,
            name: name,
            phone: phone,
            address: address,
            pincode: pincode,
            email: email
        })
    }, [name, email, phone, address, pincode, login])

    useEffect(() => {
        // console.log(userdata);
    }, [userdata])
    return (
        <div className={style.userDataUpdate}>
            <h1>Update your details</h1>
            <div className={style.inputField}>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' value={userdata['name']} onChange={updateFunction} />
            </div>
            <div className={style.inputField}>
                <label htmlFor='email'>Email</label>
                <input type='text' id='email' name='email' value={userdata['email']} onChange={updateFunction} />
            </div>
            <div className={style.inputField}>
                <label htmlFor='phone'>Ph.No.</label>
                <input type='text' id='phone' name='phone' value={userdata['phone']} onChange={updateFunction} />
            </div>
            <div className={style.inputField}>
                <label htmlFor='pincode'>Pincode</label>
                <input type='text' id='pincode' name='pincode' value={userdata['pincode']} onChange={updateFunction} />
            </div>
            <div className={style.inputField}>
                <label htmlFor='address'>Address</label>
                <input type='text' id='address' name='address' value={userdata['address']} onChange={updateFunction} />
            </div>
            <div className={style.inputField}>
                <button type='button'>Update</button>
            </div>
            <div className={style.bottom}>
                <Link to='/'>
                    <button type='button'>Home</button>
                </Link>
                <span>/</span>
                <Link to='/user'>
                    <button type='button'>profile</button>
                </Link>
            </div>
        </div>
    )
}

export default UpdateUserData