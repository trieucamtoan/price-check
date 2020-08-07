import React, {Component} from 'react';
import ProductCard from '../ProductCard';
import SearchBar from '../SearchBar';
import * as ProductModel from '../ProductModel';
export default class GpuPage extends Component {
    render(){
        return (
            <div>
                <SearchBar title = "Graphic Cards"/>
                <ProductCard product = {ProductModel.rtx2080ti} lowest_price = {ProductModel.rtx2080ti.lowest_price} />
                <br/>
                <ProductCard product = {ProductModel.rx5700} lowest_price = {ProductModel.rx5700.lowest_price}/>
                <br/>
                <ProductCard product = {ProductModel.rtx2080} lowest_price = {ProductModel.rtx2080.lowest_price}/>
                
            </div>
        )
    }
}