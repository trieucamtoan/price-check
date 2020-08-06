import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { withRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import RequestServer from '../../requests/RequestServer';
import '../../App.css';
import * as ProductModel from './ProductModel';

//This Component is used for displaying list of available websites with prices according to a Product

export default class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state={
            empty : true,
            product: ProductModel.product,
            errorMsg: '',
            lowest_price : 0,
        }
    }

    async getProduct(id) {
        var token = localStorage.getItem('token');
        var response = await RequestServer.getProduct(token, id)
        return response
    }

    componentDidMount() {
        //Get product info based on ID params
        const response = this.getProduct(this.props.match.params.id)
            .then(result => { 
                if (result === null){
                    throw "Error getting Product"
                }
                return result
            })
            .then(result => {
                this.setState({
                    empty: false,
                    product: result
                })
                this.updateLowestPrice();
            })
            .catch((error) => {
                this.setState({
                    errorMsg: error,
                    empty: true
                })
            })
    }

    updateLowestPrice() {
        var lowestPrice = ProductModel.updateLowestPrice(this.state.product.product_link_price);
        this.setState({lowest_price: lowestPrice})
    }

    shouldComponentUpdate() {
        if (!this.state.empty){
            return true
        }
        return false;
    }

   populateAProductCard() {
        return (
            <ProductCard 
            product = {this.state.product} 
            lowest_price = {this.state.lowest_price}/>
        ) 
    }
    populateManyLists() {
        if (this.state.product.product_link_price === undefined){
            return;
        }
        else {
            //Populate list of websites and prices
            const list = this.state.product.product_link_price.map(function(obj,key) {
                return(
                    <tr key = {key} >
                        <td>{key}</td>
                        <td><a href={obj.product_url}>{obj.product_url}</a></td>
                        <td>{obj.product_price_curr}</td>
                    </tr>
                )
            })
            return list;
        }
}

    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
    }

    render(){
        console.log("RENDER")
        return (
            <div>
               <h2 className = "title">{this.state.product.product_name}</h2>
               {this.populateAProductCard()}
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
                    {this.populateManyLists()}
                </tbody>
                </Table>
            </div>
        )
    }
}