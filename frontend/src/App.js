import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Register from './components/Register';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Hello from "./components/hello";
import Routes from "./Routes";
import DefaultNav from './navigations/DefaultNav';

function App() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand">
              PriceCheck
            </a>
            <DefaultNav/>
          </nav>

          <div className="container mt-3">
            <Routes/>
          </div>
        </div>
        </Router>
    );
}
export default App;

