import React, { Component } from 'react';
import ProductCard from '../ProductCard';
import SearchBar from '../SearchBar';
import RequestServer from '../../../requests/RequestServer';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router';
import * as ProductModel from '../ProductModel';
import MessageController from '../../../responses/MessageController';

//This component loads component at /products/all
class ProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            products: [], //all products in the DB
            errorMsg: '',
            deleteModal: null
        }
    }

    componentDidMount() {
        this.getAllProducts();
    }

    populateData(response) {

        var ProductList = response;
        // response.forEach(product => {
        //     ProductList.push(product)
        // });
        console.log(this.state.products)
        console.log("ProductList", ProductList);
        this.setState({
            // products: update(this.state.products.product_link_price, {0: {product_url: {$set: ProductList}}})
            products: ProductList
        })

        console.log(this.state.products)
    }

    populateManyProductCards() {
        if (this.state.products.length === 0) {
            return (
                <h2 className="title">No Product Found</h2>
            )
        }
        else {
            const productCards = this.state.products.map(function (product, i) {
                //Check if the product has price URL available yet
                if (product.product_link_price.length === 0) {
                    return (<ProductCard key={i} product={product} lowest_price="0" />)
                }
                //Return JSX element
                var lowestPrice = ProductModel.updateLowestPrice(product.product_link_price)
                return (<ProductCard key={i} product={product} lowest_price={lowestPrice} />)
            }
            )
            return productCards
        }
    }

    getAllProducts = async (e) => {
        var token = localStorage.getItem('token');
        var response = await RequestServer.getAllProducts(token)
        //Call message controller 
        var message = MessageController.accept(response)

        if (message === null || message === false) {
            this.setState({
                error: true
            })
        }
        else {
            this.populateData(response);
        }
    }

    addButtonHandler = (event) => {
        this.props.history.push('/product/new');
        window.location.reload()
    }

    render() {
        return (
            <div>
                <SearchBar title="All Products" />
                <Button
                    variant="dark"
                    onClick={(event) => this.addButtonHandler(event)}
                >Add New Product
                </Button>
                <br />
                {this.populateManyProductCards()}
                <h2 className = "title">
                    {MessageController.displayErrorMessage(this.state.error, this.state.errorMsg)}
                </h2>
            </div>
        )
    }
}
export default withRouter(ProductsPage)