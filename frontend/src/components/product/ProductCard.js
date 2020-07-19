import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class ProductCard extends Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img 
                variant="top" 
                src= {this.props.image} 
                style = {{
                    width: 250,
                    height: 250,
                    objectFit: 'cover',
                }}
            />
            <Card.Body>
                <Card.Title>{this.props.title}</Card.Title>
                <Card.Text>
                {this.props.text}
                </Card.Text>
                <Button variant="primary">Check Price</Button>
            </Card.Body>
            </Card>
        );
    }
    
}