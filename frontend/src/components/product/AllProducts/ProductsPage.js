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
    _isMounted = false; //Prevent setState on unmounted components
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
        this._isMounted = true;
        this.getAllProducts();
        
    }

    componentWillUnmount() {
        this._isMounted = false;
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
            const product_type = this.props.product_type
            
            //Filter the array
            var productCards = this.state.products.filter(function(product) {
                return (product_type === "ALL" || product_type === product.product_type)
            })

            //Map and return ProductCard components
            productCards = productCards.map(function(product, i){
                //Check if the product has price URL available yet
                if (product.product_link_price.length !== 0) {
                    //Return JSX element
                    //var lowestPrice = ProductModel.updateLowestPrice(product.product_link_price)
                    var lowestPrice = product.product_lowest_price_curr
                    if ( lowestPrice === null){
                        lowestPrice = "N/A"
                    }
                    return (<ProductCard key={i} product={product} lowest_price={lowestPrice} />)
                }
                else {
                    return (<ProductCard key={i} product={product} lowest_price= "N/A" />)
                }
            })
            console.log("Product card" ,productCards)
            if (productCards.length === 0){
                return <h2 className="title">No Product Found</h2>
            }
            return productCards
        }
    }

    getAllProducts = async (e) => {
        var token = localStorage.getItem('token');
        var response = await RequestServer.getAllProducts(token)
        //Call message controller 
        var message = MessageController.accept(response)
        if (this._isMounted) {
            if (message === null || message === false) {
                this.setState({
                    error: true
                })
            }
            else {
                this.populateData(response);
            }
        }
    }

    addButtonHandler = (event) => {
        this.props.history.push('/product/new');
        window.location.reload()
    }

    render() {
        console.log(this.props.product_type)
        return (
            <div>
                <SearchBar title={this.props.title} />
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