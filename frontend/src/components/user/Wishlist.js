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
            title:'',
            username:'',
            content:''
        }
    }

    componentDidMount() {
        this.getUserName();
    }

    async getUserName() {
        var token = localStorage.getItem('token');
        console.log("Token: " , token);
        if (token !== null){
            var response = await RequestServer.getUsername(token)
            console.log(response);
            if (response !== null){
                this.setState({username: response.data.username});
                this.setState({content: 'Wishlist page WIP'});
            }
            else {
                this.setState({title: 'Unauthorized Access'})
            }
        }
        else {
            this.setState({title: 'Unauthorized Access'})
        }
    }

    render(){
        return(
            <div>
                <div>
                    <h4> Hi {this.state.username}</h4>
                </div>

                <div className="input-group-append">
                    <p>{this.state.content}</p>
                </div>
            </div>
        )
    }
}

