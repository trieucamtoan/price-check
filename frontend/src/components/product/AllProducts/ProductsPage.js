import React, {Component} from 'react';
import ProductCard from '../ProductCard';
import SearchBar from '../SearchBar';
import RequestServer from '../../../requests/RequestServer';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router';
class ProductsPage extends Component {
    constructor(props){
        super(props);
        this.state={
            empty : false,
            products: [
                {
                    id: '',
                    name: '',
                    type: '',
                    description: '',
                    prices: [
                        {
                            product_url: '',
                            product_price: 0,
                        }
                    ],
                    comments: []
                }
            ],
            errorMsg: '',
            lowest_price : 0,
        }
    }

    componentDidMount() {
        this.setState({
            products: [
                {
                    id: 'Loading',
                    name: 'Loading',
                    type: '',
                    description: 'Loading',
                    prices: [
                        {
                            url: '',
                            price: 0,
                        }
                    ]
                }
            ]
        })
        this.getAllProducts();
    }

    populateData(response) {
        var ProductList = []

        response.forEach(product => {
            var id = product.id
            var name = product.product_name
            var type = product.product_type
            var description = product.product_description
            var prices = product.product_link_price
            
            var product = {
                id: id,
                name: name,
                type: type,
                description: description,
                prices: prices
            }

            ProductList.push(product)
        });
        this.setState({products: ProductList});
    }

    populateProductCard() {
        const products = this.state.products.map(function(product, i) {
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
            //Return JSX element
            return (
            <ProductCard key = {i} product = {product} lowest_price = {lowest_price}/>
            )}
        )
        return products
    }

    getAllProducts = async(e) =>{
        var token = localStorage.getItem('token');
        var response = await RequestServer.getAllProducts(token)
        
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

    addButtonHandler = (event) => {
        console.log(this.props.location)
        this.props.history.push('/product/add');
        window.location.reload()
    }

    render(){
        return (
            <div>
                <SearchBar title = "All Products"/>
                <Button 
                variant="dark"
                onClick = {(event) => this.addButtonHandler(event)}
                >Add New Product
                </Button>
                <br/>
                {this.populateProductCard()}
            </div>
        )
    }
}
export default withRouter(ProductsPage)