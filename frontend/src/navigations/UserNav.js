import React from 'react';
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { withRouter } from 'react-router';

export default function UserNav() {
    
    // logoutHandler = () => {
    //     if (localStorage.getItem('isLoggedIn') === 'true') {
    //         localStorage.setItem("isLoggedIn", "false")
    //         this.props.history.push('/');
    //     } else {
    //         this.props.history.push('/');
    //     }
        
    // }

    return (
        <div className="navbar-nav mr-auto">
            <Link to={"/product"} className="nav-link">Product</Link>
            <Link to ='/profile' className="nav-link">My Profile</Link>
            <Link to = '/logout' className="nav-link">Logout</Link>
        </div>
    )
}