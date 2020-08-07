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
import Collapsible from './Collapsible';
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
            errorMsgURL: '',
            newURL : '',
            urlArray: [],
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

    getProductURL = async(e) => {
        var token = localStorage.getItem('token');
        var response = await RequestServer.getProductURL(token, this.props.match.params.id)
        if (response === null) {
            this.setState({
                empty: true,
                errorMsg: 'Error getting product'
            })
            console.log("RESPONSE IS NULL");
            return null

        } else {
            console.log("THE RESPONSE" , response);
            return response
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

    // showAvailableProductUrl() {
    //     this.getProductURL()
    //         .then(result => {return result})
    //         .then((result) => {
    //             console.log("RESPONSE from showAvailableProductURL: ", result)
    //             if (result['message'] === undefined && result.length !== 0) {
    //                 console.log("im here")
    //                 if (this.state.urlArray !== result){
    //                     this.setState({
    //                         urlArray: result
    //                     })
    //                 }
    //             }
    //         })

    //     if (this.state.urlArray.length !== 0){
    //         return this.state.urlArray.map(function(product, i){
    //             return (
    //                 <div>
    //                     {product.product_url}
    //                 </div>
    //             )
    //         })
    //     }
    //     else {
    //         return "No URL Available";
    //     }
    // }
        
        // console.log("show Avaialble Product : ", this.state.product.product_link_price)
        // if (this.state.product.product_link_price.length !== 0){
        //     return this.state.product.product_link_price.map(function(product, i){
        //         return (
        //             <div>{product.product_url}</div>
        //         )
        //     })
        // }
        
        
    

    clearFields() {
        this.setState({
            error: false,
            errorMsg: '',
            errorMsgURL: ''
        }, () => {
            document.getElementById("update-form").reset()
            document.getElementById("add-url-form").reset()
        })
    }


    updateResponseHandler(response) {
        console.log("RES" , response)
        if (response.status === 404 || response.status === 400) {
            var errorMessage = [];
            for (const [key, value] of Object.entries(response)) {
                // console.log(`${key}: ${value}`);
              errorMessage += value;
            }
            console.log('response: ' + response)
            
            this.setState({
                error: true,
                errorMsg: errorMessage
            }) 
          }
    
          else if (response.status === 200 || response.status === 204){
            toast("Product URL Updated");
            this.clearFields();
          }
          else {
            this.setState({
                error: true,
                errorMsgURL: "URL must be unique or URL is already exists in the DB"
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
        if (this.isFieldEmpty()) {
            return;
        }
        var token = localStorage.getItem('token');
        // var product = this.state.product
        console.log('this.state.product', this.state.product)

        //Set newProduct to make the call to Server
        var newProduct = ProductModel.product
        newProduct.product_name = this.state.product.product_name
        newProduct.product_description = this.state.product.product_description
        newProduct.product_type = this.state.product.product_type
        newProduct.product_image = this.state.product.product_image
        
        console.log("new Product: " , newProduct)
        var response = await RequestServer.updateProduct(token,this.state.product.id, newProduct)
        this.updateResponseHandler(response);
    }

    addURLHandler = async(event) => {
        event.preventDefault()
        console.log("Adding Product URL....");

        //Check empty field 
        if (this.state.newURL === '') {
            this.setState({
                error: true,
                errorMsgURL: "Field cannot be empty"
            })
            return;
        }
        var token = localStorage.getItem('token');

        // var product = this.state.product
        // console.log('product', product)

        let product_link_price_copy = this.state.product.product_link_price.slice()
        var newUrlObject = this.constructUrlObject(this.state.newURL)
        product_link_price_copy.push(newUrlObject)
        // console.log("product_link_price_copy",product_link_price_copy)
        this.setState(state => ({
            ...this.state.product, 
            product_link_price: product_link_price_copy
            }))
        var response = await RequestServer.updateProductURL(token, this.state.product.id, newUrlObject)
        this.updateResponseHandler(response);
        //console.log("ADD URL HANDLER: ", this.state.product.product_link_price)
        
    }

    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
    }

    showErrorMsgURL() {
        return <p>{this.state.errorMsgURL}</p>
    }

    render(){
        console.log("Rendering....")
        return (
            <div>
                <div className = "page-container">
                <MuiThemeProvider>
                    <div className = 'update-form' align = "center">
                        <h2 className = "title">Update Basic Info</h2>
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
                            {/* <div>
                                <p>Available Product URL</p>
                                <Collapsible url = {this.state.urlArray}/>
                            </div> */}
                            
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
                        <hr/>

                        <form id="add-url-form">   
                            <h2 className = "title">Add Product URL</h2>
                            
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
                            <br/> 

                            <div className='errorMsgUrl'>
                                {(this.state.error ? this.showErrorMsgURL() : '')}
                            </div>

                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
            </div>
        )
    }
}

export default withRouter(UpdateProduct);