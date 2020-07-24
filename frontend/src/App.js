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

    constructor(props){
        super(props);
        this.state={
            username:''
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }

    async getUserDetails() {
        var token = localStorage.getItem('token');
        console.log("Token: " , token);
        if (token !== null){
            var response = await RequestServer.getUsername(token)
            console.log(response);
            if (response !== null){
                this.setState({username: response.data.username});
            }
            else {
                this.setState({username: ""});
            }
        }
        else {
            this.setState({username: ""});
        }
    }

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
            <div className="navbar-nav d-flex w-100">
              {this.navBasedOnLogin()}
              <div className="ml-auto nav-link">{this.state.username}</div>
            </div>
          </nav>

          <div className="container mt-3">
            <Routes/>
          </div>
        </div>
        </Router>
    );
  }

}

