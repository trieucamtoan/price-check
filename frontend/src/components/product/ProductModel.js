//Centralized file to instantiate product model and other related functions
import React, {Component} from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router';

//Product Model Template to instantiate the state
export const product = {
    product_name: '',
    product_type: '',
    product_image: null,
    product_description: '',
    product_image: null
}

export const product_full_info = {
    product_name: '',
    product_type: '',
    product_description: '',
    product_image: null,
    product_lowest_price_curr: null,
    product_lowest_price_prev: null,
    product_link_price : [],
    comments: []
}

export const product_url_info = {
    product_url : '',
    product_price_curr : "0",
    produce_price_prev : "0"
}

export const product_url_info_update = {
    product_url : '',
    product_price_curr : "0"
}

export const comment = {
    username : '',
    text : ''
}

export const wishlist = {
    username : ''
}

export const wishlist_username = {
    product_id : ''
}

export const products = [product]

//CPU
export const cpu = 
{
    product_type : "CPU",
    product_image : "https://ae01.alicdn.com/kf/H9215c90014714a799cff9cc7e3062583I/New-Original-Intel-Core-Processor-Boxed-i7-9700K-I7-9700K-3-60GHz-LGA1151-8-Cores-HD.jpg",
    product_description : 'This is a section for CPU'
}


export function updateLowestPrice(product_link_price) {
    if (product_link_price.length === 0){
        return "0"
    }
    else {
        //Initialize the first price to be the lowest
        console.log("PRODUCT ARRAY", product_link_price)
        var current_lowest_price = product_link_price[0].product_price_curr;
        if (current_lowest_price === null){
            current_lowest_price = "N/A"
        }
        //Loop through the product_link_price array to update the current lowest price
        product_link_price.forEach(function(obj){
            if (parseFloat(obj.product_price_curr) < parseFloat(current_lowest_price)){
                current_lowest_price = obj.product_price_curr
            }
        })
        
        //Update the lowest price
        var lowestPrice = current_lowest_price;
        console.log("lowest price: ", lowestPrice)
        return lowestPrice;
        //this.setState({lowest_price: lowestPrice})
        //console.log(this.state.lowest_price)
    }
    
}

//Static Variables

//GPU
export const gpu = {
    product_type : 'GPU',
    product_image : "https://images-na.ssl-images-amazon.com/images/I/91Qg5K-cmfL._AC_SL1500_.jpg",
    product_description : 'This is a section for GPU'
    }
    //RAM
    export const ram = {
    product_type : 'RAM',
    product_image: "https://c1.neweggimages.com/ProductImage/20-232-476-S01.jpg",
    product_description : 'This is a section for RAM'
    }
    //Nvidia RTX 2080Ti
    export const rtx2080ti = {
        product_name : 'Nvidia RTX 2080Ti Founder Edition',
        product_image : "https://images.anandtech.com/doci/13346/GeForce-RTX-2080Ti-front-car_678x452.jpg",
        product_description : "NVIDIA’s newest flagship graphics card is a revolution in gaming realism and performance. Its powerful NVIDIA Turing™ GPU architecture, breakthrough technologies, and 11 GB of next-gen, ultra-fast GDDR6 memory make it the world’s ultimate gaming GPU. ",
        lowest_price : "1,199"
    }
    //GIGABYTE Radeon RX 5700 XT
    export const rx5700 = {
        product_name : 'GIGABYTE Radeon RX 5700 XT',
        product_image : "https://c1.neweggimages.com/ProductImage/14-932-208-V10.jpg",
        product_description  : "Powered by AMD Radeon™ RX 5700 XT, Integrated with 8GB GDDR6 256-bit memory interface,\n WINDFORCE 3X Cooling System with alternate spinning fans, RGB Fusion 2.0 – synchronize with other AORUS devices, Metal Back Plate, PCI-Express 4.0 Support",
        lowest_price  : "599"
    }
    //Nvidia RTX 2080
    export const rtx2080 = {
        product_name : 'Nvidia RTX 2080 Super Founder Edition',
        product_image : "https://www.thegioimaychu.vn/image/catalog/NVIDIA/Gefore%20GFX/geforce-rtx-2080-super.png",
        product_description : "The GeForce RTX™ 2080 is powered by the all-new NVIDIA Turing™ architecture to give you incredible new levels of gaming realism, speed, power efficiency, and immersion. This is graphics reinvented. ",
        lowest_price  : "899"
    }