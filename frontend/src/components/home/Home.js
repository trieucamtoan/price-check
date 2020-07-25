import React, {Component} from 'react';
import ProductCategory from '../product/ProductCategory';
export default class Home extends Component {
    render(){
        return (
            <div>
                <br/>
                <h2 className = "title">Find Your Best Offers on Computer Hardware</h2>
                <br/>
                <ProductCategory/>
            </div>
        )
    }
}