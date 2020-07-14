import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import Hello from "./components/hello";


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            PriceCheck
          </a>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/somepath"} className="nav-link">
                Path
              </Link>
            </li> */}
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/hello"]} component={Hello} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
