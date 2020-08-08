import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import { withRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import RequestServer from '../../requests/RequestServer';
import '../../App.css';
import * as ProductModel from './ProductModel';
import AddURLModal from './AddURLModal';
import { IoIosMore } from "react-icons/io";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination'
import '../../App.css';

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
            var idV = this.state.product.id
            //Populate list of websites and prices
            const list = this.state.product.product_link_price.map(function(obj,key) {
                return(
                    <tr key = {key} >
                        <td>{key}</td>
                        <td><a href={obj.product_url}>{obj.product_url}</a></td>
                        <td>{obj.product_price_curr}</td>
                        <td>
                        {/* <Button variant="light"><IoIosMore/>
                        </Button>  */}
                        <DropdownButton 
                            variant="light"
                            title="Action"
                            id="dropdown-basic-button">
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                        </DropdownButton>

                        
                        </td>


                
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
               <AddURLModal id = {this.state.product.id}/>
               <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>URL</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.populateManyLists()}
                </tbody>
                </Table>

                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Last />
                </Pagination>

                <h2 className = "title">Comments</h2>
                
            </div>
        )
    }
}