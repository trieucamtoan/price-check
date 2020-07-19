import React from 'react';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


export default function UserNav() {
    return (
        <div className="navbar-nav mr-auto">
            <Link to ='/contact-list' className="nav-link">My Profile</Link>
            <Link to = '/add-new-contact' className="nav-link">Logout</Link>
        </div>
    )
}