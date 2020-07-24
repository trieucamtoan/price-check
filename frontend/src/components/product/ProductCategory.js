import React, {Component} from 'react';
import '../../App.css';
import ProductCategoryCard from './ProductCategoryCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


export default class ProductCategory extends Component {
    render() {
        //CPU
        const cpu_title = 'CPU';
        const cpu_image = "https://ae01.alicdn.com/kf/H9215c90014714a799cff9cc7e3062583I/New-Original-Intel-Core-Processor-Boxed-i7-9700K-I7-9700K-3-60GHz-LGA1151-8-Cores-HD.jpg";
        const cpu_text = 'This is a section for CPU';

        //GPU
        const gpu_title = 'GPU';
        const gpu_image = "https://images-na.ssl-images-amazon.com/images/I/91Qg5K-cmfL._AC_SL1500_.jpg";
        const gpu_text = 'This is a section for GPU';
        
        const ram_title = 'RAM';
        const ram_image = "https://c1.neweggimages.com/ProductImage/20-232-476-S01.jpg";
        const ram_text = 'This is a section for RAM';
        return (
            <div>
                <Container>
                <Row style = {{
                    display: 'flex'
                }}>
                    <Col md="auto"><ProductCategoryCard title = {cpu_title} image = {cpu_image} text = {cpu_text}/></Col>
                    <Col md="auto"><ProductCategoryCard title = {gpu_title} image = {gpu_image} text = {gpu_text}/></Col>
                    <Col md="auto"><ProductCategoryCard title = {ram_title} image = {ram_image} text = {ram_text}/></Col>
                </Row>
                </Container>
            </div>
        )
    }
}