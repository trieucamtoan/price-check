import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

//horizontal card used for displaying individual product

const styles = {
    'card': {
        marginBottom: '10px'
    },
    'button': {
        marginLeft: '20px'
    },
    'image': {
        width: '300px',
        height: 'auto',
        objectFit: 'contain',
    },
    'input': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        width: '100%',
        color: 'white'
    },
    'black': {
        color: 'black'
    }
};

export default class ProductCard extends Component {
    render() {
        return (
            <Card style = {styles.card}>
            <Card.Header as="h5">
                {this.props.product_name}
                
                <Button 
                    variant="primary"
                    style={styles.button}
                    className="float-right"
                    >Check Stock
                </Button>
                <p className="float-right">Lowest Price: <span>{this.props.product_price}</span></p>
            </Card.Header>
            <Card.Body>
                <Card.Img 
                    variant="top" 
                    src= {this.props.product_image}
                    style = {styles.image} />
                <Card.Text>
                    {this.props.product_description}
                </Card.Text>
                
            </Card.Body>
            </Card>
        );
    }
    
}