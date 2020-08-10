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
                errorMsg: "Field(s) cannot be empty"
            }, () => {
            })
            return true;
        }
        return false;
    }

    registerResponseHandler(response) {
        if (response !== null) {
            var registeredSuccess = false;
            var errorMessage = [];
            for (const [key, value] of Object.entries(response)) {
                // console.log(`${key}: ${value}`);
                if (key === 'key'){
                    toast("User Added");
                    registeredSuccess = true;
                    alert("Registered successfully")
                    this.clearFields();
                    this.props.history.push(
                        '/login'
                    )
                    return true;
                }
                else {
                    errorMessage += value;
                }
            } 

            if (!registeredSuccess){
                const message = errorMessage.split(/[',','.']+/).join('\n');
                this.setState({
                    error: true,
                    errorMsg: errorMessage
                })
            }

        } else {
            console.log('response: ' + response)
            this.setState({
                error: true,
                errorMsg: 'Unable to register'
            })
        }
    }

    registerHandler = async(event) => {
        event.preventDefault()

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

        this.registerResponseHandler(response);
    }

    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
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
                            />
                            <br/>    

                            <TextField
                                hintText="Enter your Email"
                                inputStyle={styles.black}
                                floatingLabelText="Email"
                                onChange={(event,newValue) => this.setState({email: newValue})}
                            />
                            <br/> 

                            <TextField
                                type="password"
                                hintText="Enter your Password"
                                inputStyle={styles.black}
                                floatingLabelText="Password"
                                onChange={(event,newValue) => this.setState({password1: newValue})}
                            />
                            <br/>  
                            <TextField
                                type="password"
                                hintText="Enter your Password Again"
                                inputStyle={styles.black}
                                floatingLabelText="Password Confirmation"
                                onChange={(event,newValue) => this.setState({password2: newValue})}
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