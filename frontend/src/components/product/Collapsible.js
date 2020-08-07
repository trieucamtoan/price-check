import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import React, {Component} from 'react';
import RequestServer from '../../requests/RequestServer';

export default class Collapsible extends Component{
    constructor(props){
        super(props);
        this.state = {
            openBox: false,
            buttonMessage: 'Expand'
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

    showAvailableProductUrl(url) {
        this.getProductURL()
            .then(result => {return result})
            .then((result) => {
                console.log("RESPONSE from showAvailableProductURL: ", result)
                if (result['message'] === undefined && result.length !== 0) {
                    console.log("im here")
                    if (this.state.urlArray !== result){
                        this.setState({
                            urlArray: result
                        })
                    }
                }
            })

        if (this.state.urlArray.length !== 0){
            return this.state.urlArray.map(function(product, i){
                return (
                    <div>
                        {product.product_url}
                    </div>
                )
            })
        }
        else {
            return "No URL Available";
        }
    }

    render() {
        return (
            <div>
              <Button
                onClick={() => this.setState({
                    openBox: !this.state.openBox, 
                },
                function() {
                    if (this.state.openBox)
                        {this.setState({buttonMessage: 'Close'})}
                    else {
                        {this.setState({buttonMessage: 'Expand'})}
                    }
                })}
                aria-controls="example-collapse-text"
                aria-expanded={this.state.openBox}
              >
                {this.state.buttonMessage}
              </Button>
              <Collapse in={this.state.openBox}>
                <div id="example-collapse-text"> 
                    {this.showAvailableProductUrl(this.props.url)}
                </div>
              </Collapse>
            </div>
        )
    }
}
    