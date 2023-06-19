import React, {useEffect, useRef, useState} from 'react';
import style from './AdminLogin.module.css';
import {urlAdmin} from '../../Appurl';

function AdminLogin() {
  const [adminLoginData, updateAdminLoginData] = useState({
    adminId: '',
    adminKey: '',
  });
  const adminref = useRef();

  const updateData = (e) => {
    updateAdminLoginData({
      ...adminLoginData,
      [e.target.name]: e.target.value,
    });
  };

  const sendLoginDetail = async () => {
    try {
      const data = await fetch(`${urlAdmin}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(adminLoginData),
      });
      const res = await data.json();
      if (res.status===0) {
        localStorage.clear();
        localStorage.setItem('adminToken', res.authtoken);
        adminref.current.style.display = 'none';
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    if (localStorage.getItem('adminToken')) {
      adminref.current.style.display = 'none';
    }
  }, []);

  return (
    <div ref={adminref} className={style.adminlogin}>
      <div className={style.adminform}>
        <h1>Login (Admin Panel)</h1>
        <div className={style.adminLoginform}>
          <label htmlFor="adminId">Admin ID</label>
          <input
            type="text"
            id="adminId"
            name="adminId"
            value={adminLoginData.adminId}
            placeholder="Admin Id"
            onChange={(e) => updateData(e)}
          />
        </div>
        <div className={style.adminLoginform}>
          <label htmlFor="adminKey">Admin Key</label>
          <input
            type="password"
            id="adminKey"
            name="adminKey"
            value={adminLoginData.adminKey}
            placeholder="Admin Key"
            onChange={(e) => updateData(e)}
          />
        </div>
        <button onClick={sendLoginDetail}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
