import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RequestServer from '../../requests/RequestServer';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import RemoveFromWishListModal from './RemoveFromWishlistModal';

export default class WishlistCard extends Component {
    constructor(props){
        super(props);
        this.state={
            title:'',
            username:'',
            content:''
        }
    }

    buttonHandler = (e) => {
        //DO stuff???
    }


    render() {
        return (
            <div>
            <Card style = {styles.card}>
            <Card.Header as="h5">
                {this.props.product_name}
                <Button
                    id = "check-stock-button"
                    variant="link"
                    onClick={(event) => this.buttonHandler(event)}
                    style={styles.button}
                    className="float-right"
                    >Check Stock
                </Button>

                <p className="float-right">Lowest Price: <span>{this.props.product_price}</span></p>
            </Card.Header>
            <Card.Body>
                <Card.Img
                    variant="top"
                    src= {'http://localhost:8000' + this.props.product_image}
                    style = {styles.image} />
                <Card.Text>
                    {this.props.product_description}
                </Card.Text>
            <RemoveFromWishListModal id = {this.props.id}/>
            </Card.Body>
            </Card>
            <br/>
            </div>
        );
    }


}

const styles = {
    'card': {
        marginTop: '5x',
        marginBottom: '5px'
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
    'black': {
        color: 'black'
    }
};

