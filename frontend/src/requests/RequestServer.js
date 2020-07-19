import { Component } from 'react';
import axios from 'axios';

export default class RequestServer extends Component {
    getServerLocation() {
        return 'http://localhost:8080'
    }

    async getLocations() {
        try {
            var response = await axios.get(this.getServerLocation() + '/location/all')
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async addUser(user) {
        try {
            var response = await axios.post(this.getServerLocation() + '/register', user)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }

    async login(username, password) {
        var userObj = {
            username: username,
            password: password
        }
        try {
            var response = await axios.post(this.getServerLocation() + '/login', userObj)
            return response
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
