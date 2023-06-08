import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from '../../actions/user';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {authToken, urlauth} from '../../Appurl';
import style from '../../Private/css/Userprofile.module.css';
import {callMessage} from '../Alert/CallMessage';

function UpdateUserData() {
  const navigate = useNavigate();
  const name = useSelector((state) => state.user.name);
  const phone = useSelector((state) => state.user.phone);
  const address = useSelector((state) => state.user.address);
  const login = useSelector((state) => state.user.login);
  const dispatch = useDispatch();

  const [userdata, updateUserdata] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
  });

  const updateFunction = (event) => {
    updateUserdata({
      ...userdata,
      [event.target.name]: event.target.value,
    });
  };

  const sendUpdatedData = () => {
    fetch(`${urlauth}/update`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'auth_token': `${authToken}`,
      },
      body: JSON.stringify({
        name: userdata.name,
        address: userdata.address,
        phone: userdata.phone,
      }),
    })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 0) {
            fetchdata();
            callMessage('Success', 'Updated successfully');
            navigate('/user');
          } else {
            callMessage('Error', 'Unable to update');
          }
        })
        .catch(() => {
          callMessage('Server Error', 'Unable to connect');
        });
  };

  async function fetchdata() {
    let userdata = {};
    await fetch(`${urlauth}/access`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': authToken,
      },
    }).then((response) => response.json())
        .then((data) => {
          userdata = data;
        });
    if (userdata.status === 0) {
      dispatch(updateUser(userdata.data));
    } else {
      localStorage.removeItem('token');
      window.location.reload();
    }
  }

  useEffect(() => {
    if (login === false) {
      navigate('/login');
    }
    updateUserdata({
      name: name,
      phone: phone,
      address: address,
    });
  }, [name, phone, address, login, navigate]);

  useEffect(()=>{
    const button = document.getElementById('Updatebutton');
    if (userdata.name!==name || userdata.phone!==phone || userdata.address!==address) {
      button.disabled=false;
      button.style.cursor='pointer';
    } else {
      button.disabled=true;
      button.style.cursor='not-allowed';
    }
  }, [userdata]);


  return (
    <div className={style.userDataUpdate}>
      <h1>Update your details</h1>
      <div className={style.inputField}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' name='name' value={userdata['name']} onChange={updateFunction} />
      </div>
      <div className={style.inputField}>
        <label htmlFor='phone'>Ph.No.</label>
        <input type='text' id='phone' name='phone' value={userdata['phone']} onChange={updateFunction} />
      </div>
      <div className={style.inputField}>
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' name='address' value={userdata['address']} onChange={updateFunction} />
      </div>
      <div className={style.inputField}>
        <button type='button' id='Updatebutton' onClick={sendUpdatedData}>Update</button>
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
  );
}

export default UpdateUserData;
