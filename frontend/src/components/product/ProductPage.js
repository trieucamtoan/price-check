import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { withRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import RequestServer from '../../requests/RequestServer';
import ListGroup from 'react-bootstrap/ListGroup';
import '../../App.css';

//This Component is used for displaying list of available websites with prices according to a Product

export default class ProductPage extends Component {
    constructor(props){
        super(props);
        const product = this.props.history.location.state.product;
        this.state={
            empty : false,
            product: {
                id: product.id,
                name: product.name,
                type: product.type,
                description: product.description,
                prices: product.prices
            },
            errorMsg: '',
            lowest_price : 0,
        }
    }

    componentDidMount() {
        this.getProduct(this.state.product.id);
        
    }

    updateLowestPrice(product) {
        //Initialize the first price to be the lowest
        var current_lowest_price = product.prices[0].product_price;
        //Loop through the product_link_price array to update the current lowest price
        product.prices.forEach(function(obj){
            if (parseFloat(obj.product_price) < parseFloat(current_lowest_price)){
                current_lowest_price = obj.product_price
            }
        })
        //Update the lowest price
        var lowest_price = current_lowest_price;
        console.log(lowest_price)
        return lowest_price;
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
            lowest_price: this.updateLowestPrice(this.state.product)
        });
        this.populateUI();
    }

    populateList() {
        //Populate list of websites and prices
        
        const list = this.state.product.prices.map(function(obj,key) {
            return(
                <tr key = {key} >
                    {/* <ListGroup.Item action href = {obj.product_url}>Price : {obj.product_price}, URL: {obj.product_url} </ListGroup.Item> */}
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
            this.populateData(response);
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