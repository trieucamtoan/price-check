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
            id: '',
            product_name: '',
            product_type: '',
            product_description: '',
            product_link_price: [
                {
                product_url: '',
                product_price: "0"
            }],
            currentType : 'CPU',
            error: false , 
            errorMessage: '', 
            
        }
        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.addHandler = this.addHandler.bind(this)
    }

    handleTypeChange = (event) => {
        this.setState({
            currentType: event.target.value,
            product_type: event.target.value
        })
    }

    clearFields() {
        this.setState({
            username: '',
            email: '',
            password1: '',
            password2: '',
            error: false,
            errorMsg: '',
        }, () => {
            document.getElementById("add-form").reset()
        })
    }

    addResponseHandler(response) {
        if (response !== null) {
            var addSuccess = false;
            var errorMessage = [];
            for (const [key, value] of Object.entries(response)) {
                console.log(`${key}: ${value}`);
                if (value === this.state.product_name){
                    toast("Product Added");
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
            }

        } else {
            console.log('response: ' + response)
            this.setState({
                error: true,
                errorMsg: 'Unable to add new Product'
            })
        }
    }

    isFieldEmpty() {
        if (
            this.state.id === '' || 
            this.state.product_name === '' || 
            this.state.product_description === '' || 
            this.state.product_type === '') {
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

        var product = {
            id: this.state.id,
            product_name: this.state.product_name,
            product_type: this.state.product_type,
            product_description: this.state.product_description,
            product_link_price: [
                {
                    product_price: "0",
                    product_url: this.state.product_link_price_url
                }
            ]
        }
        console.log('product', product)
        var response = await RequestServer.addProduct(token,product)
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
                                hintText="Product ID"
                                inputStyle={styles.black}
                                floatingLabelText="Product ID"
                                onChange={(event,newValue) => this.setState({id: newValue})}
                            />
                            <br/>    

                            <TextField
                                hintText="Product Name"
                                inputStyle={styles.black}
                                floatingLabelText="Product Name"
                                onChange={(event,newValue) => this.setState({product_name: newValue})}
                            />
                            <br/>    

                            <TextField
                                hintText="Product Description"
                                inputStyle={styles.black}
                                floatingLabelText="Product Description"
                                onChange={(event,newValue) => this.setState({product_description: newValue})}
                            />
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
                

                            <TextField
                                hintText="Product Link (Optional)"
                                inputStyle={styles.black}
                                floatingLabelText="Product Link"
    
                                onChange={(event,newValue) => this.setState({product_link_price_url : newValue})}
                            />
                            <br/> 

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