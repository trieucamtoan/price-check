import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RequestServer from '../../requests/RequestServer';
import { withRouter } from 'react-router';
import ListGroup from 'react-bootstrap/ListGroup'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import MessageController from '../../responses/MessageController';
import * as ProductModel from './ProductModel';

const GetUserInfo = async() => {
    var token = localStorage.getItem('token')
    if (token){
        var response = await RequestServer.getUsername(token)
        var message = MessageController.accept(response)
        if (message){
            if (message.status === 200){
                console.log("Retrieve username info ", message.data.username)
                return message.data.username
            }
        }
        else {
            return null
        }
    }
  }

class AddCommentInput extends Component {
    state = {comment: ""}
    
    buttonHandler = async (event) => {
        event.preventDefault();
        //console.log(this.state.comment)
        //Ask RequestServer for comments
        var product_id = this.props.id
        var token = localStorage.getItem('token')
        var username = await GetUserInfo();
        console.log("username info: ", username)
        var commentObject = ProductModel.comment
        commentObject.username = username
        commentObject.text = this.state.comment
        console.log("commentObject: ", commentObject)
        
        var response = await RequestServer.addProductComment(token,product_id,commentObject)
        var message = MessageController.accept(response)
        if (message){
            alert("Comment added successfully!")
            window.location.reload()
        }
        // this.responseHandler(response)
        
        //Add InputField to add comments to Product
        // var addComment= <AddComment/>
        
        
    //     var commentListGroup = this.renderCommentsListGroupItem();
        
    //     var comments = 
    //     <ListGroup variant="flush">
    //         {commentListGroup}
    //     </ListGroup>

    //   this.setState({
    //     show: true,
    //     commentListGroup: comments,
    //     addComment: addComment
    //   })
    }
    render() {
        const {product_id, username} = this.props;
        return (
            <InputGroup className="mb-3">
                <FormControl
                placeholder="Add your comment here..."
                aria-label="Add your comment here..."
                onChange = {(event) => {
                    this.setState({comment: event.currentTarget.value})
                }}
                aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                <Button 
                    variant = "outline-secondary"
                    onClick = {(event) => this.buttonHandler(event)}
                >Add</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}
//This component shows every comments about the product
class CommentProductModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            comments: [],
            commentListGroup: '',
            addComment: ''
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

    responseHandler(response) {
        //Check Message Response
        var message = MessageController.accept(response);
        if (message){
            if (message.status === 200){
                console.log("Successfully retrieved comment list: ", message.data)
            }
            var commentArray = message.data;
            this.setState({
                comments: commentArray
            })
        }
        else {
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


    deleteCommentHandler = async(id) => {
        console.log("Pressed Delete button...");
        var token = localStorage.getItem('token');
        var commentId = id
        console.log(commentId)
        var response = await RequestServer.deleteProductComment(token,this.props.id, commentId)
        var message = MessageController.accept(response)
        if (message){
            alert("Comment deleted successfully!")
            this.setState({show: false})
            // window.location.reload()
        }
        // var result = this.deleteResponseHandler(response);
        // if (result){
        //   this.setState({
        //     show: false
        //   })
        //   alert("Product Deleted Successfully")
        //   this.props.history.push('/product/all');
        //   window.location.reload()
        // }
        // else {
        //   alert("Failed to delete. Probably the product has already been deleted")
        // }
    }

    renderDeleteButton(currentUsername, id , username) {
        if (username === currentUsername) {
            return (<Button 
                variant = "link" 
                className = "float-right"
                onClick = {() => this.deleteCommentHandler(id)}>
                    Delete
                </Button>)
        }
    }

    async renderCommentsListGroupItem() {
        if (this.state.comments.length !== 0){
            var currentUsername = await GetUserInfo();
            var ListGroupItem = this.state.comments.map((comment, key) => {
                console.log("Comment" ,comment)
                var button = this.renderDeleteButton(currentUsername, comment.id, comment.username);
                return (<ListGroup.Item key = {key}>
                        {comment.username}: {comment.text}
                        {button}
                        </ListGroup.Item>)
            })
            return ListGroupItem
        }
        else {
            return <ListGroup.Item>No Comment Found</ListGroup.Item>
        }
    }

    handleShow = async(event) => {
        event.preventDefault()
        //Ask RequestServer for comments
        var product_id = this.props.id
        var token = localStorage.getItem('token')
        var response = await RequestServer.getProductComments(token,product_id)
        this.responseHandler(response)
        
        //Add InputField to add comments to Product
        var addComment= <AddCommentInput id = {product_id}/>
        
        var commentListGroup = await this.renderCommentsListGroupItem();
        
        var comments = 
        <ListGroup variant="flush">
            {commentListGroup}
        </ListGroup>

      this.setState({
        show: true,
        commentListGroup: comments,
        addComment: addComment
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
              variant = "link"
              onClick={(event) => this.handleShow(event)}
              >
                Comments
              </Button>
        
              <Modal
                show={this.state.show}
                onHide={() => this.handleClose()}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Product Comments</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <div>
                        {this.state.commentListGroup}
                    </div>

                    <div align = "right">
                        {this.state.addComment}
                    </div>
                    
                    
                </Modal.Body>
                <Modal.Footer>
                  <Button 
                  variant="secondary" 
                  onClick={() => this.handleClose()}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
        )
    } 
  }

export default withRouter(CommentProductModal);
  