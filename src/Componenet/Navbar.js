import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <div className='navbar_wrap'>
                <div className='container'>
                    <div className='navbar_inner'>
                        <div className='navbar_logo'>
                            <Link to='/'>
                                Progressive Web App
                            </Link>
                        </div>
                        <div className='navber_page'>
                            <ul className='navbar_page_links'>
                                <li>
                                    <NavLink activeclassname="active" className="text-capitalize nav_link" to='/' >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink activeclassname="active" className="text-capitalize nav_link" to='/record' >
                                        Record
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar