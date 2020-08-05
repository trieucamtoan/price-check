import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { withRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import RequestServer from '../../requests/RequestServer';
import '../../App.css';

//This Component is used for displaying list of available websites with prices according to a Product

export default class ProductPage extends Component {
    constructor(props){
        super(props);
        //const product = this.props.history.location.state.product;
        this.state={
            empty : true,
            product: {
                id: props.match.params.id,
                name: 'Loading',
                type: 'Loading',
                description: 'Loading',
                prices: [
                {
                    product_url : 'Loading',
                    product_price: 0
                }
                ]
            },
            errorMsg: '',
            lowest_price : 0,
        }
    }

    componentDidMount() {
        //Get product info based on ID params
        const response = this.getProduct(this.state.product.id)
            .then(result => { return result})
            .then(result => {
                this.setState({empty: false})
                this.populateData(result)
            }) 
    }

    updateLowestPrice() {
        //Initialize the first price to be the lowest
        console.log("PRODUCT PRICE ARRAY ", this.state.product.prices)
        var current_lowest_price = this.state.product.prices[0].product_price;
        
        //Loop through the product_link_price array to update the current lowest price
        this.state.product.prices.forEach(function(obj){
            if (parseFloat(obj.product_price) < parseFloat(current_lowest_price)){
                current_lowest_price = obj.product_price
            }
        })
        
        //Update the lowest price
        var lowestPrice = current_lowest_price;
        this.setState({lowest_price: lowestPrice})
    }

    populateData(response) {
        this.setState({
            product: {
                id: response.id,
                name: response.product_name,
                type: response.product_type,
                description: response.product_description,
                comments: response.comments,
                prices: response.product_link_price
            },
        });
        this.updateLowestPrice();
    }

    populateList() {
        //Populate list of websites and prices
        const list = this.state.product.prices.map(function(obj,key) {
            return(
                <tr key = {key} >
                    <td>{key}</td>
                    <td><a href={obj.product_url}>{obj.product_url}</a></td>
                    <td>{obj.product_price}</td>
                </tr>
            )
        })

        return list;
    }

    populateProductCard() {
        return (
            <ProductCard 
            product = {this.state.product} 
            lowest_price = {this.state.lowest_price}/>
        )
    }

    shouldComponentUpdate() {
        if (!this.state.empty){
            return true
        }
        return false;
    }
    

   populateUI() {
       return (
           <div>
               {this.populateProductCard()}
               <br/>
               <h2 className = "title">List of Available Dealers</h2>
               <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>URL</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {this.populateList()}
                </tbody>
                </Table>
           </div>
       )
   }

    async getProduct(id) {
        var token = localStorage.getItem('token');
        var response = await RequestServer.getProduct(token, id)
        if (response === null) {
            this.setState({
                empty: true,
                errorMsg: 'Error getting product'
            })
            console.log("RESPONSE IS NULL");

        } else {
            console.log("THE RESPONSE" , response);
            return response
        }
    }

    render(){
        return (
            <div>
                <h2 className = "title">{this.state.product.name}</h2>
                {this.populateUI()}
            </div>
        )
    }
}