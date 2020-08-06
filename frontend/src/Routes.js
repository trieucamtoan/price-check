import React from 'react';
import Profile from './components/user/Profile'
import Wishlist from './components/user/Wishlist'
import {Switch, Route, Redirect} from 'react-router-dom';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Hello from "./components/hello";
import Product from "./components/product/ProductCategory";
import Dashboard from "./components/user/Dashboard";
import Logout from "./components/user/Logout";
import Home from "./components/home/Home";
import GpuPage from "./components/product/GPU/GpuPage";
import ProductsPage from "./components/product/AllProducts/ProductsPage";
import ProductPage from "./components/product/ProductPage";
import AddProduct from "./components/product/AddProduct";
import UpdateProduct from "./components/product/UpdateProduct";

const Routes = () => (
  <Switch>
    <Route exact path= '/' component={Home}/>
    <Route exact path= '/product' component={Product}/>
    <Route exact path= '/login' component={Login}/>
    <Route exact path= '/register' component={Register}/>
    <Route exact path="/gpu" component={GpuPage}/>
    
    {/* Product Pages */}
    <Route path="/product/all" component={ProductsPage}/>
    <Route path="/product/new" component={AddProduct}/>
    <Route path="/product/:id/update" component = {UpdateProduct}/>
    <Route path="/product/:id" component={ProductPage}/>
    
    
    {/* Private Route */}
    <PrivateRoute path="/dashboard" component={Dashboard}/>
    <PrivateRoute path= '/profile' component={Profile}/>
    <PrivateRoute path= '/wishlist' component={Wishlist}/>
    <PrivateRoute path= '/logout' component={Logout}/>
  </Switch>
)

function PrivateRoute({component: Component, authed, ...rest}) {

  return (
      <Route {...rest} render={(props) => (
          localStorage.getItem('isLoggedIn') === 'true'
              ? <Component {...props} />
              : <Redirect to={{
                  pathname: '/login',
                  state: {from: props.location}
              }}/>
      )}/>

  )
}

export default Routes;
