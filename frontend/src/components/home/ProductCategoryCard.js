import React, {Component} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

class ProductCategoryCard extends Component {

    buttonHandler = (e) => {
        const { history } = this.props;
        if (this.props.product.product_type === 'GPU'){
            //history.push('/gpu');
            history.push('/product/gpu');
            window.location.reload()
        }
        else if (this.props.product.product_type === 'CPU'){
            history.push('/product/cpu');
            window.location.reload()
        }
        else if (this.props.product.product_type === 'RAM'){
            history.push('/product/ram');
            window.location.reload()
        }
        else {
            console.log("error navigating");
        }
    }

    render() {
        //const { history } = this.props;
        console.log("PCC this.props.product", this.props.product)
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img 
                variant="top" 
                src= {this.props.product.product_image} 
                style = {{
                    width: 250,
                    height: 250,
                    objectFit: 'cover',
                }}
            />
            <Card.Body>
                <Card.Title>{this.props.product.product_type}</Card.Title>
                <Card.Text style = {{
                    whiteSpace: 'pre-wrap'
                }}>
                {this.props.product.product_description}
                </Card.Text>
                <Button variant="primary" onClick={(event) => this.buttonHandler(event)}>Check Price</Button>
            </Card.Body>
            </Card>
        );
    }
    
}

export default withRouter(ProductCategoryCard);