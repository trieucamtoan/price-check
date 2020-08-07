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

class AddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product : ProductModel.product,
            currentType : '',
            error: false , 
            errorMessage: '', 
        }
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.addHandler = this.addHandler.bind(this)
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

    clearFields() {
        this.setState({
            product : ProductModel.product,
            error: false,
            errorMsg: '',
            currentType: ''
        }, () => {
            document.getElementById("add-form").reset()
        })
    }

    addResponseHandler(response) {
        if (response.status === 201) {
            // var errorMessage = [];
            // for (const [key, value] of Object.entries(response)) {
                // console.log(`${key}: ${value}`);
            toast("Product Added: ");
            this.clearFields();
        } 
        else {
            alert("Bad Request")
            var errorArray = [];
            for (const [key, value] of Object.entries(response)) {
                console.log(value)
                errorMessage = value;
            }
            var errorMessage = ""
            errorArray.forEach((error) => {
                errorMessage += error
            })

            this.setState({
                error: true,
                errorMsg: errorMessage
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

    addHandler = async(event) => {
        event.preventDefault()
        console.log("Adding Product....");

        //Check empty field
        var fieldEmpty = this.isFieldEmpty()

        if (fieldEmpty) {
            return;
        }
        var token = localStorage.getItem('token');

        var product = this.state.product
        console.log('product', product)
        var response = await RequestServer.addProduct(token,this.state.product)
        this.addResponseHandler(response);
    }

    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
    }

    render(){
        return (
            <div>
                <div className = "page-container">
                <MuiThemeProvider>
                    <div className = 'add-form' align = "center">
                        <h2 className = "title">Add New Product</h2>
                        <form id="add-form">     
                            <TextField
                                hintText="Product Name"
                                inputStyle={styles.black}
                                floatingLabelText="Product Name"
                                onChange={(event,newValue) => this.setState(prevState => ({
                                    product: {
                                        ...prevState.product,
                                        product_name: newValue
                                    }
                                }))}
                            />
                            <br/>    

                            <TextField
                                hintText="Product Description"
                                inputStyle={styles.black}
                                floatingLabelText="Product Description"
                                onChange={(event,newValue) => this.setState(prevState => ({
                                    product: {
                                        ...prevState.product,
                                        product_description: newValue
                                    }
                                }))}
                            />
                            <br/> 

                            {/* <TextField
                                hintText="Product Image URL"
                                inputStyle={styles.black}
                                floatingLabelText="Product Image URL"
                                onChange={(event,newValue) => this.setState(prevState => ({
                                    product: {
                                        ...prevState.product,
                                        product_image: newValue
                                    }
                                }))}
                            /> */}
                            <br/> 

                            <br/>

                            <InputLabel id="inputLabel">Product Type         
                                <Select
                                        labelId="typeSelector"
                                        value={this.state.currentType}
                                        onChange={this.handleTypeChange}
                                        >
                                        {
                                            types.map((option, key) => {
                                                return <MenuItem key = {key} value = {option.value}>{option.label}</MenuItem>
                                            })
                                        }
                                </Select>
                            </InputLabel>

                            <div className='errorMsg'>
                                {(this.state.error ? this.showErrorMsg() : '')}
                            </div>

                            <ToastContainer position={toast.POSITION.BOTTOM_RIGHT}/>

                            <RaisedButton 
                                label="submit" 
                                primary={true} 
                                style={styles.button}
                                onClick={(event) => this.addHandler(event)}
                            />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
            </div>
        )
    }
}

export default AddProduct;