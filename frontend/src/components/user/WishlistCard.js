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

    componentDidMount() {
        this.getUserName();
    }

    async getUserName() {
        var token = localStorage.getItem('token');
        console.log("Token: " , token);
        if (token !== null){
            var response = await RequestServer.getUsername(token)
            console.log(response);
            if (response !== null){
                this.setState({username: response.data.username});
                this.setState({content: 'Wishlist page WIP'});
            }
            else {
                this.setState({title: 'Unauthorized Access'})
            }
        }
        else {
            this.setState({title: 'Unauthorized Access'})
        }
    }


    render() {
        return (
            <div>
            <Card style = {styles.card}>
            <Card.Header as="h5">
                {this.props.product_name}
                <Button
                    variant="primary"
                    style={styles.buttonRed}
                    className="float-right"
                    >Remove Item
                </Button>
                <Button
                    variant="primary"
                    style={styles.buttonBlue}
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

            </Card.Body>
            </Card>
            <br/>
            </div>
        );
    }


}

//<RemoveFromWishListModal id = {this.props.product.id}/>

const styles = {
    'card': {
        marginTop: '5x',
        marginBottom: '5px'
    },
    'buttonBlue': {
        marginLeft : '20px'
    },
    'buttonRed': {
        marginLeft : '20px',
        backgroundColor: 'red'
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

