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
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination'
import MessageController from '../../responses/MessageController';
import NoMatchPage from '../NoMatchPage';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';

import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import '../../App.css';

//This Component is used for displaying list of available websites with prices according to a Product


export default class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state={
            product: ProductModel.product,
            errorMsg: '',
            error: false,
            errorNotFound: false,
            lowest_price : 0,
            show: false,
            actionSuccess : false,
            modalTitle: '',
            modalBody: '',
            editUrlId : '',
            editURL : '',
            editPrice : '',
            waitingMessage: '',
            buttonMessage: ''
        }
        this.editURLHandler = this.editURLHandler.bind(this)
    }

    async getProduct(id) {
        var token = localStorage.getItem('token');
        var response = await RequestServer.getProduct(token, id)
        //Call message controller 
        var message = MessageController.accept(response)
        if (message === null || message === false) {
            this.setState({
                error: true,
                errorNotFound: true,
            })
        }
        return response
    }

    componentDidMount() {
        //Get product info based on ID params
        const response = this.getProduct(this.props.match.params.id)
            .then()
            .then(result => {
                this.setState({
                    error: false,
                    product: result
                })
                this.updateLowestPrice();
            })
            .catch((error) => {
                console.log("No product found")
                this.setState({
                    errorMsg: error,
                    error: true,
                    errorNotFound: true,
                })
            })
    }

    updateLowestPrice() {
        var lowestPrice = ProductModel.updateLowestPrice(this.state.product.product_link_price);
        this.setState({lowest_price: lowestPrice})
    }

    shouldComponentUpdate() {
        if (!this.state.error || !this.state.errorNotFound){
            return true
        }
        return false;
    }

    displayFeedBack() {
        console.log("display feedback: error : ", this.state.error, " with msg : ", this.state.errorMsg)
        return (
            <div>
                {MessageController.displayErrorMessage(this.state.error, this.state.errorMsg)}
                <div>
                    <p>{this.state.waitingMessage}</p>
                </div>
            </div>
        ) 
    }

    displayModalBody(){
        if (this.state.modalTitle === "Delete URL") {
            return (<Modal.Body>
                {this.state.modalBody}
            </Modal.Body>)
        }
        else {
            var body = 
            <Form>
                <Form.Group controlId="formGroupURL">
                    <Form.Label>URL</Form.Label>
                    <FormControl
                    placeholder={this.state.editURL}
                    aria-label={this.state.editURL}
                    aria-describedby="basic-addon2"
                    as="textarea" rows="3"
                    onChange={(event) => {
                        this.setState({editURL: event.target.value})
                    }}
                    />
                </Form.Group>
                <Form.Group controlId="formGroupPrice">
                    <Form.Label>Price</Form.Label>
                    <FormControl
                    placeholder={this.state.editPrice}
                    aria-label={this.state.editPrice}
                    aria-describedby="basic-addon2"
                    onChange={(event) => {
                        this.setState({editPrice: event.target.value})
                    }}
                    />
                </Form.Group>
                {this.displayFeedBack()}
            </Form>
            return (
                <Modal.Body>
                    {body}   
                </Modal.Body>
            )
        }
        
    }

    updateURLHandler = async (event) => {
        if (this.state.buttonMessage === "Update"){
            console.log("Updating...")
            var token = localStorage.getItem('token')
            //Change the waiting message
            this.setState({
                waitingMessage: "Update the URL. Please wait...",
                errorMsg: ""
            })

            var urlObject = ProductModel.product_url_info_update
            urlObject.product_url = this.state.editURL
            urlObject.product_price_curr = this.state.editPrice
            console.log("Update handler: ", urlObject.product_url, urlObject.product_price_curr)
            var response = await RequestServer.updateProductURLObject(token, this.state.product.id, this.state.editUrlId, urlObject)
            
            //Check Message Response
            var isMessageValid = MessageController.accept(response);
            if (isMessageValid === true){
                // var errorMessage = [];
                // for (const [key, value] of Object.entries(response)) {
                    // console.log(`${key}: ${value}`);
                
                alert("URL Updated")
                window.location.reload()
            }

            else {
                var errorMessage = "";
                for (const [key, value] of Object.entries(response)) {
                    errorMessage = value;
                }
                this.setState({
                    error: true,
                    errorMsg: errorMessage,
                    waitingMessage: ""
                })
            }
        }
        else if (this.state.buttonMessage === "Delete"){
            console.log("Deleting...")
            var token = localStorage.getItem('token')
            //Change the waiting message
            this.setState({
                waitingMessage: "Deleting the URL. Please wait...",
                errorMsg: ""
            })

            var response = await RequestServer.deleteProductURLObject(token, this.state.product.id, this.state.editUrlId)
            
            //Check Message Response
            var isMessageValid = MessageController.accept(response);
            if (isMessageValid === true){
                // var errorMessage = [];
                // for (const [key, value] of Object.entries(response)) {
                    // console.log(`${key}: ${value}`);
                
                alert("URL Deleted")
                window.location.reload()
            }

            else {
                var errorMessage = "";
                for (const [key, value] of Object.entries(response)) {
                    errorMessage = value;
                }
                this.setState({
                    error: true,
                    errorMsg: errorMessage,
                    waitingMessage: ""
                })
            }
        }
        else {
            console.log("error navigating")
        }
    }

    editURLHandler = (event) => {
        var token = localStorage.getItem('token')
        var product_id = this.state.product.id
        var url_id = event.currentTarget.id
        console.log(event.currentTarget.id)
        var url = event.currentTarget.getAttribute('value1');
        console.log(url)
        var getPrice = event.currentTarget.getAttribute('value2')
        console.log(getPrice)
        this.setState({
            show: true,
            actionSuccess : false,
            modalTitle: 'Edit URL',
            editUrlId: url_id,
            editURL: url,
            editPrice: getPrice,
            buttonMessage: "Update"
        })
    }

    deleteURLHandler = (event) => {
        var token = localStorage.getItem('token')
        var product_id = this.state.product.id
        var url_id = event.currentTarget.id
        console.log(event.currentTarget.id)
        this.setState({
            show: true,
            actionSuccess : false,
            modalTitle: 'Delete URL',
            modalBody: 'Are you sure to delete this URL?',
            buttonMessage: "Delete",
            editUrlId : url_id
        })
        console.log("Deleting....")
    }

    handleShow() {
        this.setState({
          show: true
        })
          
      }
  
  
    handleClose() {
        this.setState({
        show: false
        })        
    }

   populateAProductCard() {
        if (this.state.errorNotFound === false){
            return (<div>
                        <h2 className = "title">{this.state.product.product_name}</h2>
                        <ProductCard 
                            product = {this.state.product} 
                            lowest_price = {this.state.lowest_price}/>
                    </div>
            ) 
        }
        else {
            return (<NoMatchPage/>)
        }
    }
    populateTable() {
        if (this.state.product === undefined || this.state.product.product_link_price === undefined || this.state.errorNotFound === true){
            return;
        }
        else {
            var idV = this.state.product.id
            //Populate list of websites and prices
            const list = this.state.product.product_link_price.map((obj,key) => {
                return(
                    <tr key = {key} >
                        <td>{key}</td>
                        <td><a href={obj.product_url}>{obj.product_url}</a></td>
                        <td>{obj.product_price_curr}</td>
                        <td>
                        <DropdownButton 
                            variant="light"
                            title="Action"
                            id="dropdown-basic-button">
                            <Dropdown.Item
                                id = {obj.id}
                                value1 = {obj.product_url}
                                value2 = {obj.product_price_curr}
                                onClick={(event) => this.editURLHandler(event)}
                            >Edit</Dropdown.Item>
                            <Dropdown.Item
                                id = {obj.id}
                                onClick={(event) => this.deleteURLHandler(event)}
                            >Delete</Dropdown.Item>
                        </DropdownButton>
                        </td>
                    </tr>
                )
            })
            return (
                <div>
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
                            {list}
                        </tbody>
                    </Table>
                </div>
            )
        }
}
    render(){
        return (
            <div>
               {this.populateAProductCard()}
               <br/>
               {this.populateTable()}
               {/* <EditURLModal show = {this.state.show} actionSuccess = {this.state.actionSuccess} /> */}

               <Modal
                show={this.state.show}
                onHide={() => this.handleClose()}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.modalTitle}</Modal.Title>
                </Modal.Header>
                {this.displayModalBody()}
                <Modal.Footer>
                  <Button 
                  variant="secondary" 
                  onClick={() => this.handleClose()}>
                    Close
                  </Button>
                  <Button 
                  variant="primary"
                  onClick={(event) => this.updateURLHandler(event)}
                  >
                  {this.state.buttonMessage}
                  </Button>
                </Modal.Footer>
              </Modal>

            </div>
        )
    }
}