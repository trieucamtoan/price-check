import React, {Component} from 'react';
import ProductCard from '../ProductCard';
import SearchBar from '../SearchBar';
import RequestServer from '../../../requests/RequestServer';
export default class ProductsPage extends Component {
    constructor(props){
        super(props);
        this.state={
            empty : false,
            products: [],
            errorMsg: '',
        }
    }

    componentDidMount() {
        this.setState({
            products: [
                {
                    id: 'Loading',
                    product_name: 'Loading',
                    product_description: 'Loading',
                    product_link_price: 'Loading'
                }
            ]
        })
        this.getAllProducts();
    }

    populateData(response) {
        var ProductList = []

        response.forEach(product => {
            var id = product.id
            var product_name = product.product_name
            var product_description = product.product_description
            var product_link_price = product.product_link_price
            
            var product = {
                id: id,
                product_name: product_name,
                product_description: product_description,
                product_link_price: product_link_price
            }

            ProductList.push(product)
        });
        this.setState({products: ProductList});
    }

    populateProductCard() {
        const products = this.state.products.map(function(product, i) {
            console.log(product.product_name)
            return (
                <ProductCard key = {i} product_name = {product.product_name} product_description = {product.product_description} product_price = {product.product_link_price[0].product_price}/>
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

    render(){
        const products = this.state.products.map(function(product) {
            console.log(product.product_name)
            return (
                <ProductCard product_name = {product.product_name} product_description = {product.product_description} product_price = {product.product_link_price[0].product_price}/>
            )}
        )

        return (
            <div>
                <SearchBar title = "All Products"/>
                {this.populateProductCard()}
                
            </div>
        )
    }
}