import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password1:'',
            password2:'',
            cur_password:'',
            cur_username:'',
            cur_email:''
        }
        this.keyPressed = this.keyPressed.bind(this)
    }

//    isFieldEmpty() {
//        if (this.state.username === "" || this.state.cur_password === "") {
//            this.setState({
//                error: true,
//                errorMsg: "Field cannot be empty"
//            }, () => {
//            })
//            return true;
//        }
//        return false;
//    }

    updatePassword =  async (e) => {
        e.preventDefault()
        //Check empty field

        this.setState({
            errorUsername: false,
            error: false,
            errorMsg: ""
        })


        if (this.state.password1 === "" || this.state.password2 === "" || this.state.cur_password === "") {
            this.setState({
                error: true,
                errorMsg: "Field cannot be empty"
            })
            return;
        }

        if (this.state.password1 !== this.state.password2){
            this.setState({
                error: true,
                errorMsg: "Passwords do not match"
            })
            return;
        }

        var token = localStorage.getItem('token');
        var response = await RequestServer.updatePassword(token, this.state.password1, this.state.cur_password)
        if (response === null) {
            this.setState({
                error: true,
                errorMsg: 'Error updating password, password may be too simple'
            })

        } else {
            console.log(response);
            if (response !== null){
                this.setState({errorMsg: response.data.detail});
            }
            else {
                this.setState({errorMsg: 'Error updating password'})
            }
            this.setState({
                error: true,
            })
        }


    }

    updateUsername = async (e) => {
        e.preventDefault()

        this.setState({
            errorUsername: false,
            error: false,
            errorMsg: ""
        })


        if (this.state.username === "") {
            this.setState({
                errorUsername: true,
                errorMsg: "Field cannot be empty"
            })
            return;
        }

        var token = localStorage.getItem('token');
        var response = await RequestServer.updateUsername(token, this.state.username)
        if (response === null) {
            this.setState({
                errorUsername: true,
                errorMsg: 'Error updating username'
            })

        } else {
            console.log(response);
            if (response !== null){
                this.setState({errorMsg: 'Username updated to: '+response.data.username});
                this.getUserDetails()
            }
            else {
                this.setState({errorMsg: 'Error updating password'})
            }
            this.setState({
                errorUsername: true,
            })
        }

    }

//    updateEmail = async (e) => {
//    }

    showErrorMsg() {
        return <p>{this.state.errorMsg}</p>
    }

    keyPressed(event) {
        if (event.key === "Enter") {
            this.loginHandler(event)
        }
    }

    componentDidMount() {
        this.getUserDetails();
    }

    async getUserDetails() {
        var token = localStorage.getItem('token');
        console.log("Token: " , token);
        if (token !== null){
            var response = await RequestServer.getUsername(token)
            console.log(response);
            if (response !== null){
                this.setState({cur_username: response.data.username});
                this.setState({cur_email: response.data.email});
            }
            else {
                this.setState({title: 'Unauthorized Access'})
            }
        }
        else {
            this.setState({title: 'Unauthorized Access'})
        }
    }

    render() {
        return (
            <div className = "page-container">
            <h2 className = "title">{this.state.cur_username}&apos;s Profile Page</h2>
            <MuiThemeProvider>
                <div className = 'Update-form' align = "center">
                    <div style={{backgroundColor: "#e6f5f5"}}>
                        <TextField
                        floatingLabelText="New Username"
                        onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Update Username" primary={true} style={style} onClick={(event) => this.updateUsername(event)}/>
                    </div>
                    <br/>
                    <div className='errorMsg'>
                        {(this.state.errorUsername ? this.showErrorMsg() : '')}
                    </div>

                    <br/>
                    <br/>
                    <div style={{backgroundColor: "#e6f5f5"}}>
                        <TextField
                        floatingLabelText="email"
                        value={this.state.cur_email}
                        InputProps={{
                        readOnly: true,
                        }}
                        />
                    </div>

                    <br/>
                    <br/>
                    <div style={{backgroundColor: "#e6f5f5"}}>
                        <TextField
                        type="password"
                        floatingLabelText="Current Password"
                        onChange = {(event,newValue) => this.setState({cur_password: newValue})}
                        />
                        <br/>
                        <TextField
                        type="password"
                        floatingLabelText="New Password"
                        onChange = {(event,newValue) => this.setState({password1: newValue})}
                        />
                        <br/>
                        <TextField
                        type="password"
                        floatingLabelText="Confirm New Password"
                        onChange = {(event,newValue) => this.setState({password2: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Update Password" primary={true} style={style} onClick={(event) => this.updatePassword(event)}/>
                    </div>
                    <br/>
                    <div className='errorMsg'>
                        {(this.state.error ? this.showErrorMsg() : '')}
                    </div>


                </div>
            </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};

