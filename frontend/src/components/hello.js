import React, { Component } from "react";
import HelloService from "../services/testService";

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.retrieveHello = this.retrieveHello.bind(this)
        this.state = {
            message: ""
        }
    }

    retrieveHello() {
        HelloService.getHello()
        .then(response => {
            this.setState({
                message: response.data
            })
        })
        .catch(e => {
          console.log(e);
        });
    };

    render(){
        const currentMessage = this.state
        return(
            <div>
                <div>
                    <h4> Hi </h4>
                </div>
                
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={this.retrieveHello}
                    >
                        Click to get Hello
                    </button>
                </div>

                <div>
                    {currentMessage.message}
                </div>
            </div>
        )
    }
}  
