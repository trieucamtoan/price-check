import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


import WishlistCard from './WishlistCard';
export default class WishlistPage extends Component {
    render(){
        //Nvidia RTX 2080Ti
        const rtx2080ti_title = 'Nvidia RTX 2080Ti Founder Edition';
        const rtx2080ti_image = "https://images.anandtech.com/doci/13346/GeForce-RTX-2080Ti-front-car_678x452.jpg";
        const rtx2080ti_text = "NVIDIA’s newest flagship graphics card is a revolution in gaming realism and performance. Its powerful NVIDIA Turing™ GPU architecture, breakthrough technologies, and 11 GB of next-gen, ultra-fast GDDR6 memory make it the world’s ultimate gaming GPU. ";
        const rtx2080ti_price = "1,199 CAD"

        //GIGABYTE Radeon RX 5700 XT
        const rx5700_title = 'GIGABYTE Radeon RX 5700 XT';
        const rx5700_image = "https://c1.neweggimages.com/ProductImage/14-932-208-V10.jpg";
        const rx5700_text = "Powered by AMD Radeon™ RX 5700 XT, Integrated with 8GB GDDR6 256-bit memory interface,\n WINDFORCE 3X Cooling System with alternate spinning fans, RGB Fusion 2.0 – synchronize with other AORUS devices, Metal Back Plate, PCI-Express 4.0 Support";
        const rx5700_price = "599 CAD"

        //Nvidia RTX 2080
        const rtx2080_title = 'Nvidia RTX 2080 Super Founder Edition';
        const rtx2080_image = "https://www.thegioimaychu.vn/image/catalog/NVIDIA/Gefore%20GFX/geforce-rtx-2080-super.png";
        const rtx2080_text = "The GeForce RTX™ 2080 is powered by the all-new NVIDIA Turing™ architecture to give you incredible new levels of gaming realism, speed, power efficiency, and immersion. This is graphics reinvented. ";
        const rtx2080_price = "899 CAD"

        return (
            <div>
                <br/>
                <h2 className='title'>My Wishlist</h2>
                <br/>
                <WishlistCard product_name = {rtx2080ti_title} product_image = {rtx2080ti_image} product_description = {rtx2080ti_text} product_price = {rtx2080ti_price}/>
                <br/>
                <WishlistCard product_name = {rx5700_title} product_image = {rx5700_image} product_description = {rx5700_text} product_price = {rx5700_price}/>
                <br/>
                <WishlistCard product_name = {rtx2080_title} product_image = {rtx2080_image} product_description = {rtx2080_text} product_price = {rtx2080_price}/>

            </div>
        )
    }
}

