import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Hello from "./components/hello";
import Product from "./components/product/ProductCategory";

const Routes = () => (
  <Switch>
    <Route exact path={["/", "/hello"]} component={Hello} />
    <Route path= '/Product' component={Product}/>
    <Route path= '/login' component={Login}/>
    <Route path= '/register' component={Register}/>
  </Switch>
)

// function UserrRoute({component: Component, authed, ...rest}) {

//     var roles = getRoles()

//     return (
//         <Route {...rest} render={(props) => (
//             localStorage.getItem('isLoggedIn') === 'true'
//                 ? <Component {...props} />
//                 : <Redirect to={{
//                     pathname: '/',
//                     state: {from: props.location}
//                 }}/>
//         )}/>

//     )
// }

export default Routes;
