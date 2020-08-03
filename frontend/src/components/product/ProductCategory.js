import React, {Component} from 'react';
import '../../App.css';
import ProductCategoryCard from './ProductCategoryCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';


export default class ProductCategory extends Component {
    render() {
        //CPU
        const cpu = 
            {
                title : "CPU",
                image : "https://ae01.alicdn.com/kf/H9215c90014714a799cff9cc7e3062583I/New-Original-Intel-Core-Processor-Boxed-i7-9700K-I7-9700K-3-60GHz-LGA1151-8-Cores-HD.jpg",
                text : 'This is a section for CPU'
            }
        
        

        //GPU
        const gpu = {
            title : 'GPU',
            image : "https://images-na.ssl-images-amazon.com/images/I/91Qg5K-cmfL._AC_SL1500_.jpg",
            text : 'This is a section for GPU'
        }
        //RAM
        const ram = {
            title : 'RAM',
            image : "https://c1.neweggimages.com/ProductImage/20-232-476-S01.jpg",
            text : 'This is a section for RAM'
        }
        
        return (
            <div>
                <Container>
                <Row style = {{
                    display: 'flex'
                }}>
                    <Col md="auto"><ProductCategoryCard product = {cpu}/></Col>
                    <Col md="auto"><ProductCategoryCard product = {gpu}/></Col>
                    <Col md="auto"><ProductCategoryCard product = {ram}/></Col>
                </Row>
                </Container>
            </div>
        )
    }
}