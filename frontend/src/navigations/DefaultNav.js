import React from 'react';
import {Link} from 'react-router-dom';
import {BrowserRouter as Router} from "react-router-dom";

export default function DefaultNav() {
    return (
        <div className="navbar-nav mr-auto">
            {/* <Link to={"/product"} className="nav-link">Product</Link> */}
            <Link to={"/login"} className="nav-link">Login</Link>
            <Link to={"/register"} className="nav-link">Register</Link>
        </div>
    );
}