import React, {Component} from 'react';
import ProductCard from '../ProductCard';
import SearchBar from '../SearchBar';
export default class GpuPage extends Component {
    render(){
        //Nvidia RTX 2080Ti
        const rtx2080ti = {
            name : 'Nvidia RTX 2080Ti Founder Edition',
            image : "https://images.anandtech.com/doci/13346/GeForce-RTX-2080Ti-front-car_678x452.jpg",
            description : "NVIDIA’s newest flagship graphics card is a revolution in gaming realism and performance. Its powerful NVIDIA Turing™ GPU architecture, breakthrough technologies, and 11 GB of next-gen, ultra-fast GDDR6 memory make it the world’s ultimate gaming GPU. ",
            price : "1,199 CAD"
        }
        
        
        //GIGABYTE Radeon RX 5700 XT
        const rx5700 = {
            name : 'GIGABYTE Radeon RX 5700 XT',
            image : "https://c1.neweggimages.com/ProductImage/14-932-208-V10.jpg",
            description  : "Powered by AMD Radeon™ RX 5700 XT, Integrated with 8GB GDDR6 256-bit memory interface,\n WINDFORCE 3X Cooling System with alternate spinning fans, RGB Fusion 2.0 – synchronize with other AORUS devices, Metal Back Plate, PCI-Express 4.0 Support",
            price : "599 CAD"
        }
        

        //Nvidia RTX 2080
        const rtx2080 = {
            name : 'Nvidia RTX 2080 Super Founder Edition',
            image : "https://www.thegioimaychu.vn/image/catalog/NVIDIA/Gefore%20GFX/geforce-rtx-2080-super.png",
            description : "The GeForce RTX™ 2080 is powered by the all-new NVIDIA Turing™ architecture to give you incredible new levels of gaming realism, speed, power efficiency, and immersion. This is graphics reinvented. ",
            price : "899 CAD"
        }
        

        return (
            <div>
                <SearchBar title = "Graphic Cards"/>
                <ProductCard product = {rtx2080ti} />
                <br/>
                <ProductCard product = {rx5700}/>
                <br/>
                <ProductCard product = {rtx2080}/>
                
            </div>
        )
    }
}