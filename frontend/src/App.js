import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Register from './components/user/Register';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Hello from "./components/hello";
import Routes from "./Routes";
import DefaultNav from './navigations/DefaultNav';
import UserNav from './navigations/UserNav';
import RequestServer from './requests/RequestServer';

export default class App extends Component {


  navBasedOnLogin() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return (
        <UserNav/>
      )
    }
    else {
      console.log("I'm here")
      return (
        <DefaultNav/>
      )
    }
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              PriceCheck
            </a>
            {this.navBasedOnLogin()}
          </nav>

          <div className="container mt-3">
            <Routes/>
          </div>
        </div>
        </Router>
    );
  }

}

