import React, {Component} from 'react';
import '../../App.css';
import ProductCategoryCard from './ProductCategoryCard';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import * as ProductModel from './ProductModel';

export default class ProductCategory extends Component {
    render() {
        
        
        return (
            <div>
                <Container>
                <Row style = {{
                    display: 'flex'
                }}>
                    <Col md="auto"><ProductCategoryCard product = {ProductModel.cpu}/></Col>
                    <Col md="auto"><ProductCategoryCard product = {ProductModel.gpu}/></Col>
                    <Col md="auto"><ProductCategoryCard product = {ProductModel.ram}/></Col>
                </Row>
                </Container>
            </div>
        )
    }
}