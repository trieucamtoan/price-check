import { Component } from 'react';
import axios from 'axios';

class RequestServer extends Component {
    getServerLocation() {
        return 'http://localhost:8000'
    }

    async addUser(user) {
        try {
            console.log(user)
            var response = await axios.post(this.getServerLocation() + '/registration/', user)
            return response.data //Changed to response.data
        } catch (err) {
            console.log("Error: ", err.response.data);
            // const error = err.response.data;
            // for (const [key, value] of Object.entries(error)) {
            //     console.log(`${key}: ${value}`);
            // }   
            return err.response.data
        }
    }

    async login(username, email, password) {
        var userObj = {
            username: username,
            email: email,
            password: password
        }
        try {
            var response = await axios.post(this.getServerLocation() + '/login/', userObj)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async isRegistered(token) {
        try {
            var response = await axios.get(this.getServerLocation() + '/user/', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            if (response.data.detail != null){
                return false
            }
            else {
                return true
            }
            
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async getUsername(token) {
        try {
            var response = await axios.get(this.getServerLocation() + '/user/', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

export default new RequestServer();
