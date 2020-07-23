import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            email: '',
            password:''
        }
        this.keyPressed = this.keyPressed.bind(this)
    }

    isFieldEmpty() {
        if (this.state.username === "" || this.state.email === "" || this.state.password === "") {
            this.setState({
                error: true,
                errorMsg: "Field cannot be empty"
            }, () => {
            })
            return true;
        }
        return false;
    }

    navigate(token) {
        this.props.history.push(
            '/dashboard',
            { token: token }
        )
        window.location.reload()
    }

    loginHandler = async (e) => {
        e.preventDefault()
        //Check empty field
        var fieldEmpty = this.isFieldEmpty()

        if (fieldEmpty) {
            return;
        }

        var passback = await RequestServer.login(this.state.username, this.state.email, this.state.password)
        if (passback === null) {
            this.setState({
                error: true,
                errorMsg: 'Invalid Login'
            })

        } else {
            console.log(passback.data)
            localStorage.setItem("token", passback.data.key)
            localStorage.setItem("isLoggedIn", true)
            var getUsername = await RequestServer.getUsername(passback.data.key)
            console.log(getUsername.data.username)
            //this.setTheState(passback)
            // this.testConsoleLog(passback)
            //this.setRole(passback)
            this.navigate(passback.data.key)
        }

    }

    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
    }

    keyPressed(event) {
        if (event.key === "Enter") {
            this.loginHandler(event)
        }
    }

render() {
    return (
      <div className = "page-container">
        <h2 className = "title">Login Form</h2>
        <MuiThemeProvider>
            <div className = 'login-form' align = "center">
            <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange = {(event,newValue) => this.setState({username:newValue})}
                />
            <br/>

            <TextField
                hintText="Enter your email"
                floatingLabelText="Email"
                onChange = {(event,newValue) => this.setState({email:newValue})}
                />
            <br/>

            <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange = {(event,newValue) => this.setState({password:newValue})}
            />
            <br/>

                <div className='errorMsg'>
                    {(this.state.error ? this.showErrorMsg() : '')}
                </div>
                
                <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.loginHandler(event)}/>
            </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};