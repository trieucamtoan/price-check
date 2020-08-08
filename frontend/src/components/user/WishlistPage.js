import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import WishlistCard from './WishlistCard';


export default class WishlistPage extends Component {

    constructor(props){
        super(props);
        this.state={
            msg:'',
            product: [],
        }
    }


    async getProductDetails() {
        var token = localStorage.getItem('token');
        console.log("Token: " , token);
        if (token !== null){
            var response = await RequestServer.getWishlist(token)
            console.log(response);
            if (response !== null){

                for (var i in response.product_id_list) {

                    var product_response = await RequestServer.getProduct(token, response.product_id_list[i])
                    this.setState(state => {
                        const product = state.product.concat(product_response);

                            return {
                            msg:'',
                            product,
                        };
                    });
                }

            }
            else {
                this.setState({msg: 'Failed to retrieve wishlist'})
            }
        }
        else {
            this.setState({msg: 'Failed to retrieve wishlist'})
        }
    }

    componentDidMount() {
        this.getProductDetails();
    }


    render(){

        return (
            <div>
                <br/>
                <h2 class='title'>My Wishlist</h2>
                <br/>
                <p>{this.state.msg}</p>
                {this.state.product.map((p) => <WishlistCard
                    key={p.id} product_name = {p.product_name} product_image = {p.product_image} product_description = {p.product_description}
                    product_price = {p.product_lowest_price_curr}/>)}
                <br/>
            </div>
        )
    }


}
