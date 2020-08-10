import React from 'react';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';

export default function UserNav() {
    return (
        <div className="navbar-nav mr-auto">
            {/* <Link to={"/product"} className="nav-link">Product</Link> */}
            <Link to ='/profile' className="nav-link">My Profile</Link>
            <Link to ='/wishlist' className="nav-link">My Wishlist</Link>
            <Link to = '/logout' className="nav-link">Logout</Link>
        </div>
    )
}