import React, {useState} from 'react';
import style from './AdminLogin.module.css';

function AdminLogin() {
  const [adminLoginData, updateAdminLoginData] = useState({
    adminId: '',
    adminKey: '',
  });

  const updateData = (e)=>{
    updateAdminLoginData({
      ...adminLoginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={style.adminlogin}>
      <div className={style.adminform}>
        <h1>Login (Admin Panel)</h1>
        <div className={style.adminLoginform}>
          <label htmlFor="adminId">Admin ID</label>
          <input type="text" id="adminId" name="adminId"value={adminLoginData.adminId} placeholder="Admin Id" onChange={(e)=>updateData(e)}/>
        </div>
        <div className={style.adminLoginform}>
          <label htmlFor="adminKey">Admin Key</label>
          <input type="password" id="adminKey" name="adminKey" value={adminLoginData.adminKey} placeholder="Admin Key" onChange={(e)=>updateData(e)}/>
        </div>
        <button>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
