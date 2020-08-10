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
            console.log("Error: ", error.response.data);
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
            console.log("Error: ", error.response.data);
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
            //console.log("Error: ", error.response.data);
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
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async updateUsername(token, username) {

        var userObj = {
            username: username
        }

        try {
           var response = await axios.patch(this.getServerLocation() + '/user/', userObj, {
               headers: {
                   'Authorization' : `Token ${token}`
               }
           })
           return response
        } catch (error) {
            console.log("Error: ", error.response.data);
           return null
        }
    }

    async getWishlist(token) {
        try {
            var response = await axios.get(this.getServerLocation() + '/wishlist/', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("GET WISHLIST REQUEST SERVER")
            return response.data
        } catch (error) {
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async addWishlistProduct(token, id) {
        try {
            var response = await axios.post(this.getServerLocation() + '/wishlist/'+ id, {}, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("Add Wishlist item REQUEST SERVER")
            return response.data
        } catch (error) {
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async removeWishlistProduct(token, id) {
        try {
            var response = await axios.delete(this.getServerLocation() + '/wishlist/'+ id, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("Remove Wishlist item REQUEST SERVER")
            return response.data
        } catch (error) {
            console.log("Error: ", error.response.data);
            return null
        }
    }

    async getAllProducts(token) {
        try {
            var response = await axios.get(this.getServerLocation() + '/products/', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response.data
        } catch (error) {
            //console.log("Error: ", error.response.data);
            return null
        }
    }

    async getProduct(token, id) {
        try {
            var response = await axios.get(this.getServerLocation() + '/products/'+ id, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("GET PRODUCT REQUEST SERVER")
            return response.data
        } catch (error) {
            return response
        }
    }

    async addProduct(token, obj) {
        try {
            var response = await axios.post(this.getServerLocation() + '/products/', obj, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return error.response.data
        }
    }

    async updateProduct(token, id, obj) {
        try {
            console.log("OBJ : ",obj)
            var response = await axios.put(this.getServerLocation() + '/products/' + id , obj, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }

    async deleteProduct(token, id) {
        try {
            var response = await axios.delete(this.getServerLocation() + '/products/' + id, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            console.log("RESPONSE:", response , ".")
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }
    //POST REQUEST
    async addProductURL(token, id, url){
        console.log("URL: ", url)
        try {
            var response = await axios.post(this.getServerLocation() + '/products/' + id + '/url', url, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response.data
        } catch (error) {
            console.log("Error: ", error.response.data);
            return error.response.data
        }
    }
    //PUT REQUEST
    async updateProductURLObject(token, id, urlId, urlObject){
        console.log("URL Object: ", urlObject)
        try {
            var response = await axios.put(this.getServerLocation() + '/products/' + id + '/url/' + urlId, urlObject, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            console.log("Response... ", response)
            return error.response.data
        }
    }

    //DELETE REQUEST
    async deleteProductURLObject(token, id, urlId){
        try {
            var response = await axios.delete(this.getServerLocation() + '/products/' + id + '/url/' + urlId, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            console.log("Response... ", response)
            return error.response.data
        }
    }

    async getProductURL(token, id){
        try {
            var response = await axios.get(this.getServerLocation() + '/products/' + id + '/url', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }

    async getProductComments(token,id){
        try {
            var response = await axios.get(this.getServerLocation() + '/products/' + id + '/comments', {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }

    async addProductComment(token,id, commentObject){
        try {
            var response = await axios.post(this.getServerLocation() + '/products/' + id + '/comments', commentObject, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }

    async deleteProductComment(token,id, commentId){
        try {
            var response = await axios.delete(this.getServerLocation() + '/products/' + id + '/comments/' + commentId, {
                headers: {
                    'Authorization' : `Token ${token}`
                }
            })
            return response
        } catch (error) {
            console.log("Error: ", error.response.data);
            return response
        }
    }
}

export default new RequestServer();
