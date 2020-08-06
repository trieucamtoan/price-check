import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { withRouter } from 'react-router';
import * as ProductModel from './ProductModel';

const styles = {
    'button': {
        margin: 15,
    },
    'input': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        color: 'white'
    },
    'black': {
        color: 'black'
    }
};

const types = [
    {
        value: 'CPU',
        label: 'CPU'
    },
    {
        value: 'GPU',
        label: 'GPU'
    },
    {
        value: 'RAM',
        label: 'RAM'
    }
];

class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product : ProductModel.product_full_info,
            error: false , 
            errorMessage: '', 
            newURL : '',
            newURLArray: []
        }
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.updateHandler = this.updateHandler.bind(this)
    }

    populateData(response) {
        var ProductList = response;
        // response.forEach(product => {
        //     ProductList.push(product)
        // });
        console.log(this.state.product)
        console.log("ProductList", ProductList);
        this.setState({
            // products: update(this.state.products.product_link_price, {0: {product_url: {$set: ProductList}}})
            product: ProductList
        })

        console.log(this.state.product)
    }

    constructUrlObject(url) {
        return {
            product_url : url,
            product_price_curr : "0",
            produce_price_prev : "0"
        }
    }

    getProduct = async(e) => {
        var token = localStorage.getItem('token');
        var response = await RequestServer.getProduct(token, this.props.match.params.id)
        if (response === null) {
            this.setState({
                empty: true,
                errorMsg: 'Error getting product'
            })
            console.log("RESPONSE IS NULL");
            return null

        } else {
            console.log("THE RESPONSE" , response);
            this.populateData(response);
        }
    }

    componentDidMount() {
        this.getProduct();
    }

    handleTypeChange = (event) => {
        this.setState(prevState => ({
            product:{
                ...prevState.product,
                product_type: event.target.value
            },
            currentType: event.target.value
        }))
    }

    showAvailableProductUrl() {
        console.log("show Avaialble Product : ", this.state.product.product_link_price)
        if (this.state.product.product_link_price.length !== 0){
            return this.state.product.product_link_price.map(function(product, i){
                return (
                    <p key = {i}>URL : {product.product_url}</p>
                )
            })
        }
        else {
            return <span>No URL Available</span>;
        }
        
    }

    clearFields() {
        this.setState({
            product : ProductModel.product_full_info,
            error: false,
            errorMsg: '',
        }, () => {
            document.getElementById("update-form").reset()
        })
    }


    updateResponseHandler(response) {
        if (response !== null) {
            var addSuccess = false;
            var errorMessage = [];
            for (const [key, value] of Object.entries(response)) {
                console.log(`${key}: ${value}`);
                if (value === this.state.product.product_name){
                    toast("Product Update");
                    addSuccess = true;
                    this.clearFields();
                    return true;
                }
                else {
                    errorMessage += value;
                }
            } 

            if (!addSuccess){
                // const message = errorMessage.split(/[',','.']+/).join('\n');
                // this.setState({
                //     error: true,
                //     errorMsg: message
                // })
                console.log(response)
                console.log("LINK PRICE: ", this.state.product.product_link_price)
            }

        } else {
            console.log('response: ' + response)
            this.setState({
                error: true,
                errorMsg: 'Unable to update Product'
            })
        }
    }

    isFieldEmpty() {
        if (this.state.product.product_name === '' || 
            this.state.product.product_description === '' || 
            this.state.product.product_type === '') {
            this.setState({
                error: true,
                errorMsg: "Field cannot be empty"
            }, () => {
            })
            return true;
        }
        return false;
    }

    updateHandler = async(event) => {
        event.preventDefault()
        console.log("Update Product....");

        //Check empty field
        var token = localStorage.getItem('token');
        // var product = this.state.product
        console.log('this.state.product', this.state.product)
        var newProduct = ProductModel.product
        newProduct.product_name = this.state.product.product_name
        newProduct.product_description = this.state.product.product_description
        newProduct.product_type = this.state.product.product_type
        newProduct.product_image = this.state.product.product_image

        
        console.log("new Product: " , newProduct)
        //Set the product_link_price to null otherwise cannot update product in the backend

        
        var response = await RequestServer.updateProduct(token,this.state.product.id, newProduct)
        this.updateResponseHandler(response);
            
        
        
    }

    addURLHandler = async(event) => {
        event.preventDefault()
        console.log("Adding Product URL....");

        //Check empty field
        var fieldEmpty = this.isFieldEmpty()

        if (fieldEmpty) {
            return;
        }
        var token = localStorage.getItem('token');

        // var product = this.state.product
        // console.log('product', product)

        let product_link_price_copy = this.state.product.product_link_price.slice()
        var newUrlObject = this.constructUrlObject(this.state.newURL)
        product_link_price_copy.push(newUrlObject)
        console.log("product_link_price_copy",product_link_price_copy)
        this.setState({...this.state.product.product_link_price, product_link_price_copy})
        //console.log("ADD URL HANDLER: ", this.state.product.product_link_price)
        var response = await RequestServer.updateProductURL(token, this.state.product.id, newUrlObject)
        this.updateResponseHandler(response);
    }

    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
    }

    render(){
        return (
            <div>
                <div className = "page-container">
                <MuiThemeProvider>
                    <div className = 'update-form' align = "center">
                        <h2 className = "title">Update</h2>
                        
                        <form id="update-form">   
                            <p>Product Name</p> 
                            <TextField
                                id="product-name-field"
                                label="Name"
                                defaultValue={this.state.product.product_name}
                                onChange={(event,newValue) => this.setState(prevState => ({
                                    product: {
                                        ...prevState.product,
                                        product_name: newValue
                                    }
                                }))}
                            />
                            <br/>  
                            <p>Product Description</p>
                            <TextField
                                id="product-description-field"
                                inputStyle={styles.black}
                                defaultValue={this.state.product.product_description}
                                onChange={(event,newValue) => this.setState(prevState => ({
                                    product: {
                                        ...prevState.product,
                                        product_description: newValue
                                    }
                                }))}
                            />
                            <br/> 
                            <br/> 
                            <InputLabel id="inputLabel">Product Type         
                                <Select
                                        labelId="typeSelector"
                                        value={this.state.product.product_type}
                                        onChange={this.handleTypeChange}
                                        >
                                        {
                                            types.map((option, key) => {
                                                return <MenuItem key = {key} value = {option.value}>{option.label}</MenuItem>
                                            })
                                        }
                                </Select>
                            </InputLabel>
                            <br/> 
                            <div>
                                <p>Available Product URL</p>
                                {this.showAvailableProductUrl()}
                            </div>
                            
                            <br/>
                            <p>Add A Product URL</p>
                            <div>
                                <TextField
                                    id="product-url-field"
                                    inputStyle={styles.black}
                                    onChange={(event,newValue) => {
                                        this.setState({newURL: newValue})
                                    }}
                                />

                                <RaisedButton 
                                    label="Add URL" 
                                    primary={true} 
                                    style={styles.button}
                                    onClick={(event) => this.addURLHandler(event)}/>
                            </div>
                            
                            
                            
                            <br/> 

                            <div className='errorMsg'>
                                {(this.state.error ? this.showErrorMsg() : '')}
                            </div>

                            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>

                            <RaisedButton 
                                label="submit" 
                                primary={true} 
                                style={styles.button}
                                onClick={(event) => this.updateHandler(event)}
                            />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
            </div>
        )
    }
}

export default withRouter(UpdateProduct);