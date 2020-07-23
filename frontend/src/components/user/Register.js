import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';
import 'react-toastify/dist/ReactToastify.css';
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
            username: '', email: '', password1: '', password2: '', error: false , errorMessage: '', response: '', token: ''
        }
    }

    checkPasswordMatch() {
        if (this.state.password1.trim() === "" || this.state.password1 !== this.state.password2) {
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
            email: '',
            password1: '',
            password2: '',
            error: false,
            errorMsg: '',
        }, () => {
            document.getElementById("register-form").reset()
        })
    }

    isFieldEmpty() {
        if (this.state.username === "" || this.state.password1 === "" || this.state.password2 === "") {
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
        event.preventDefault()
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
            email: this.state.email,
            username: this.state.username,
            password1: this.state.password1,
            password2: this.state.password2
        }

        var response = await RequestServer.addUser(user)

        if (response !== null) {
            console.log('response: ' + response)
            toast("User Added");
            this.clearFields()
        } else {
            console.log('response: ' + response)
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
        toast.configure()
        return (
            <div className = "page-container">
                <MuiThemeProvider>
                    <div className = 'login-form' align = "center">
                        <h2 className = "title">Register Form</h2>
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
                                hintText="Enter your Email"
                                inputStyle={styles.black}
                                floatingLabelText="Email"
                                onChange={(event,newValue) => this.setState({email: newValue})}
                                onKeyPress={this.keyPressed}
                            />
                            <br/> 

                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                inputStyle={styles.black}
                                floatingLabelText="Password"
                                onChange={(event,newValue) => this.setState({password1: newValue})}
                                onKeyPress={this.keyPressed}
                            />
                            <br/>  
                            <TextField
                                type="password"
                                hintText="Enter your Password Again"
                                inputStyle={styles.black}
                                floatingLabelText="Password Confirmation"
                                onChange={(event,newValue) => this.setState({password2: newValue})}
                                onKeyPress={this.keyPressed}
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
                                onClick={(event) => this.registerHandler(event)}
                            />
                        </form>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}