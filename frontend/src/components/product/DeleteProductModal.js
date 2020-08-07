import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RequestServer from '../../requests/RequestServer';
import { withRouter } from 'react-router';

class DeleteProductModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            deleteSuccess: false
        }
    }
    deleteResponseHandler(response) {
      console.log((response.status === 204))
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

      else if (response.status === 204){
        return true;
      }
    }
    
    deleteHandler = async(event) => {

        event.preventDefault()
        console.log("Pressed deleted button...");
        
        //Show the Modal Dialog
        this.setState({
          show: true
        })
        var token = localStorage.getItem('token');
        var response = await RequestServer.deleteProduct(token, this.props.id)

        var result = this.deleteResponseHandler(response);
        if (result){
          this.setState({
            show: false
          })
          alert("Product Deleted Successfully")
          this.props.history.push('/product/all');
          window.location.reload()
        }
        else {
          alert("Failed to delete. Probably the product has already been deleted")
        }
    }

    handleShow() {
      this.setState({
        show: true
      })
        
    }

    handleClose() {
      if (this.state.error === true){
        //Stop the modal from closing
      }
      else {
        //Let the modal close shall we?
        this.setState({
          show: false
        })
      }
        
    }

    render() {
        return (
            <div>
              <Button 
              variant="outline-danger"
              className = "float-right"
              onClick={() => this.handleShow()}
              >
                Delete ID : {this.props.id}
              </Button>
        
              <Modal
                show={this.state.show}
                onHide={() => this.handleClose()}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Confirm Your Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure to delete the product?
                </Modal.Body>
                <Modal.Footer>
                  <Button 
                  variant="secondary" 
                  onClick={() => this.handleClose()}>
                    Close
                  </Button>
                  <Button 
                  variant="outline-danger"
                  onClick={(event) => this.deleteHandler(event)}
                  >
                  Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
        )
    } 
  }

export default withRouter(DeleteProductModal);
  