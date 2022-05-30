import React from 'react'
import '../Private/css/Sidenavbar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import Logo from './Logo'
import { useSelector } from 'react-redux'
function Sidenavbar(props) {
    const { tooglefunc,logoutfunc } = props;
    const user = useSelector((state)=>state.user.name)
    return (
        <div className='sidenav' >
            <div className='sidelogo' >
                <Logo />
                <div className='navtoggler' onClick={tooglefunc}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
            </div>
            <ul className='Sidenavlinks'>
                <li>
                    <Link className='navlinkpath' to="/" onClick={tooglefunc}>Home</Link>
                </li>
                <li><Link className='navlinkpath' to="/search" onClick={tooglefunc}>Search</Link></li>
                <li><Link className='navlinkpath' to="/about" onClick={tooglefunc}>About</Link></li>
            </ul>
            <ul className='sidenavauth'>
                {localStorage.getItem('token') ?
                    <div className="dropdown">
                        <button className="dropbtn" type='button'>{user.toUpperCase()}</button>
                        <div className="dropdown-content">
                            <Link to="/user">Profile</Link>
                            <Link to="/login" onClick={logoutfunc}>Logout</Link>
                        </div>
                    </div> :
                    <div className='sidenavauth'>
                        <li>
                            <Link className='navauthpath' to="/login" onClick={tooglefunc}>
                                Login
                            </Link>
                        </li>
                        <li>Or</li>
                        <li><Link className='navauthpath' to="/signup" onClick={tooglefunc}>Signup</Link></li>
                    </div>
                }
            </ul>
        </div>
    )
}

export default Sidenavbar