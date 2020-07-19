import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../requests/RequestServer';
import {ToastContainer, toast} from 'react-toastify';

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

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', password: '', passwordConfirmation: '', error: false , errorMessage: ''
        }
    }

    checkPasswordMatch() {
        if (this.state.password.trim() === "" || this.state.password !== this.state.passwordConfirmation) {
            this.setState({
                error: true,
                errorMsg: "Passwords do not match"
            }, () => {
            })
            return false;
        }
        return true;
    }

    clearFields() {
        this.setState({
            
            username: '',
            password: '',
            passwordConfirmation: '',
            error: false,
            errorMsg: '',
        }, () => {
            document.getElementById("register-form").reset()
        })
    }

    isFieldEmpty() {
        if (this.state.username === "" || this.state.password === "" || this.state.passwordConfirmation === "") {
            this.setState({
                error: true,
                errorMsg: "Field cannot be empty"
            }, () => {
            })
            return true;
        }
        return false;
    }

    registerHandler = async(event) => {
        console.log("Registering...");

        //Check password match
        var passwordMatch = this.checkPasswordMatch()

        //Check empty field
        var fieldEmpty = this.isFieldEmpty()

        if (!passwordMatch) {
            return;
        }

        if (fieldEmpty) {
            return;
        }

        var user = {
            username: this.state.username,
            password: this.state.password,
        }

        var response = await RequestServer.addUser(user)

        if (response !== null) {
            toast("User Added");
            this.clearFields()
        } else {
            this.setState({
                error: true,
                errorMsg: 'Unable to register'
            })
        }
    }

    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
    }

    keyPressed(event) {
        if(event.key === "Enter"){
            this.registerHandler(event)
        }
    }

    render() {
        return (
            <div className = "page-container">
                <MuiThemeProvider>
                    <h2 className = "title">Register Form</h2>
                    <div className = 'login-form' align = "center">
                        <form id="register-form">   
                        
                            <TextField
                                hintText="Enter your Username"
                                inputStyle={styles.black}
                                floatingLabelText="Username"
                                onChange={(event,newValue) => this.setState({username: newValue})}
                                onKeyPress={this.keyPressed}
                            />
                            <br/>    

                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                inputStyle={styles.black}
                                floatingLabelText="Password"
                                onChange={(event,newValue) => this.setState({password: newValue})}
                                onKeyPress={this.keyPressed}
                            />
                            <br/>  
                            <TextField
                                type="password"
                                hintText="Enter your Password Again"
                                inputStyle={styles.black}
                                floatingLabelText="Password Confirmation"
                                onChange={(event,newValue) => this.setState({passwordConfirmation: newValue})}
                                onKeyPress={this.keyPressed}
                            />

                            <br/>

                            <div className='errorMsg'>
                                {(this.state.error ? this.showErrorMsg() : '')}
                            </div>

                            <RaisedButton 
                                label="submit" 
                                primary={true} 
                                style={styles.button}
                                onClick={(event) => this.registerHandler(event)}
                            />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}