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
            return response
        } catch (err) {
            console.log("Error: ", err.response.data)
            return null
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

    async updatePassword(token, newPassword, oldPassword) {    //**** Backend does not verify current password? ****//

        var userObj = {
            new_password1: newPassword,
            new_password2: newPassword,
            old_password: oldPassword
        }

        try {
            var response = await axios.post(this.getServerLocation() + '/password/change/', userObj, {
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

    async updateUsername(token) {
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
