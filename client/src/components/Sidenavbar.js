import React from 'react'
import '../Private/css/Sidenavbar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'
import { useSelector } from 'react-redux'
function Sidenavbar(props) {
    const { logoutfunc } = props;
    const user = useSelector((state) => state.user.name)
    const login = useSelector((state) => state.user.login)


    const togglerfunction = () => {
        document.getElementById('sidenav').style.width = "0px";
    }

    return (
        <div id='sidenav' >
            <div className='sidelogo' >
                <Logo />
                <div className='navtoggler' >
                    <FontAwesomeIcon icon={faXmark} onClick={togglerfunction} />
                </div>
            </div>
            <div className='SideNavDetail'>
                <div className='UserNameSideNav'>
                    <p><span>hi,</span> {user.toUpperCase()}</p>
                </div>
                <ul className='Sidenavlinks'>
                    <li><Link to="/" onClick={togglerfunction}>Home</Link></li>
                    <li><Link to="/search" onClick={togglerfunction}>Search</Link></li>
                    <li><Link to="/about" onClick={togglerfunction}>About</Link></li>
                    <li><Link to="/user" onClick={togglerfunction}>Profile</Link></li>
                </ul>
            </div>
            <ul className='sidenavauth'>
                {login ?
                    <div>
                        <li><Link to="/login" onClick={logoutfunc}>Logout</Link></li>
                    </div>
                    :
                    <div>
                        <li><Link  to="/login" onClick={togglerfunction}>Login</Link></li>
                        <li>Or</li>
                        <li><Link  to="/signup" onClick={togglerfunction}>Signup</Link></li>
                    </div>
                }
                <p>1.0.0</p>
                <p>Copyright reserved</p>
            </ul>
        </div>
    )
}

export default Sidenavbar