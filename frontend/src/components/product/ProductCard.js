import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
//horizontal card used for displaying individual product

var styles = {
    'card': {
        
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

        if (this.props.product.product_type === 'GPU'){
            alert("This page will be available soon")
        }
    
        else if (this.props.product.product_type === 'CPU'){
            history.push({
                pathname: '/product/' + this.props.product.id,
                state: {
                    product: this.props.product
                }
            });
            window.location.reload()
        }
        else if (this.props.product.product_type === 'RAM'){
            alert("This page will be available soon")
        }
        else {
            console.log(this.props)
            console.log("error navigating");
        }
    }

    updateHandler = (e) => {
        const { history } = this.props;
        //console.log("history", history)

        if (this.props.product.product_type === 'GPU'){
            alert("This page will be available soon")
        }
    
        else if (this.props.product.product_type === 'CPU'){
            history.push({
                pathname: '/product/' + this.props.product.id + '/update',
                state: {
                    product: this.props.product
                }
            });
            window.location.reload()
        }
        else if (this.props.product.product_type === 'RAM'){
            alert("This page will be available soon")
        }
        else {
            console.log(this.props)
            console.log("error navigating");
        }
    }
    
    render() {
        return (
            <Card styles = {styles.card}>
            <Card.Header as="h5">
                {this.props.product.product_name}
                <Button 
                    id = "check-stock-button"
                    variant="link"
                    onClick={(event) => this.buttonHandler(event)}
                    styles={styles.button}
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
                    variant="link"
                    onClick={(event) => this.updateHandler(event)}
                    className = "float-right"
                >
                    Update Product
                </Button>
            </Card.Body>
            </Card>
        );
    }
    
}
export default withRouter(ProductCard);