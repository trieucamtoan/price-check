import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import DeleteProductModal from './DeleteProductModal';
import AddToWishListModal from './AddToWishListModal';
//horizontal card used for displaying individual product

var styles = {
    'card': {
        marginBottom: '10px'
    },
    'button': {
        paddingLeft : '20px',
        visibility: true
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

class ProductCard extends Component {
    buttonHandler = (e) => {
        const { history } = this.props;
        //console.log("history", history)
        history.push({
            pathname: '/product/' + this.props.product.id,
            state: {
                product: this.props.product
            }
        });
        window.location.reload()
    }

    updateHandler = (e) => {
        const { history } = this.props;
        //console.log("history", history)
        history.push({
            pathname: '/product/' + this.props.product.id + '/update',
            state: {
                product: this.props.product
            }
        });
        window.location.reload()
    }
    
    render() {
        return (
            <Card style = {styles.card}>
            <Card.Header as="h5">
                {this.props.product.product_name}
                <Button 
                    id = "check-stock-button"
                    variant="link"
                    onClick={(event) => this.buttonHandler(event)}
                    style={styles.button}
                    className="float-right"
                    >Check Stock
                </Button>
                <p className="float-right">Lowest Price: <span>{this.props.lowest_price} CAD</span></p>
            </Card.Header>
            <Card.Body>
                <Card.Img 
                    variant="top" 
                    src= {this.props.product.product_image}
                    style = {styles.image} />
                <Card.Text>
                    {this.props.product.product_description}
                </Card.Text>
                <Button
                    variant="outline-primary"
                    onClick={(event) => this.updateHandler(event)}
                    className = "float-right"
                >
                    Update Product
                </Button>
                <DeleteProductModal id = {this.props.product.id}/>
                <AddToWishListModal id = {this.props.product.id}/>
            </Card.Body>
            </Card>
        );
    }
    
}
export default withRouter(ProductCard);