import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../requests/RequestServer';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
        this.keyPressed = this.keyPressed.bind(this)
    }

    isFieldEmpty() {
        if (this.state.username === "" || this.state.password === "") {
            this.setState({
                error: true,
                errorMsg: "Field cannot be empty"
            }, () => {
            })
            return true;
        }
        return false;
    }

    loginHandler = async (e) => {
        e.preventDefault()
        //Check empty field
        var fieldEmpty = this.isFieldEmpty()

        if (fieldEmpty) {
            return;
        }

        var passback = await RequestServer.login(this.state.username, this.state.password)
        if (passback === null) {
            this.setState({
                error: true,
                errorMsg: 'Invalid Login'
            })

        } else {
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("userData", JSON.stringify(passback.data))
            this.setTheState(passback)
            // this.testConsoleLog(passback)
            this.setRole(passback)
            this.navigate(passback)
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
        <h2 style={{textAlign: 'center'}}>Login Form</h2>
        <MuiThemeProvider>
            <div className = 'login-form' align = "center">
            <TextField
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange = {(event,newValue) => this.setState({username:newValue})}
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
export default Login;