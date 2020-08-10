import React, {Component} from 'react';

class MessageController extends Component {

    displayErrorMessage(error, errorMsg) {
        return (
            <div className='errorMsg'>
                {(error ? <p>{errorMsg}</p> : '')}
            </div>
        )
    }

    accept(message) {
        //Determine message type
        console.log("Message Controller Return Message : ", message)
        if (message === null || message === undefined){
            console.log("Returning in here")
            return false
        }
        //Handle PUT request with empty response
        else if (message.status === 201 || message.status === 204){
            return true
        }
        else if (message.status === 400 || message.status === 404){
            return false
        }
        //Handling GET request and error request
        else {
            return message
        }
    }
}

export default new MessageController();