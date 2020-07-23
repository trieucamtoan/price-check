import React, {Component} from 'react';
import '../../App.css';
import RequestServer from '../../requests/RequestServer';

function Logout(props) {


    const logout = () => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            localStorage.setItem("isLoggedIn", "false")
            props.history.push('/')
            window.location.reload()
        } else {
            props.history.push('/')
            window.location.reload()
        }
    }
    
    return (
        logout()
    );
}


export default Logout;