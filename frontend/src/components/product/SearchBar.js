import React, {Component} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
export default class SearchBar extends Component {
    render() {
        return(
            <div>
                <br/>
                <h2 className = "title">{this.props.title}</h2>
                <br/>
                {/* <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Enter product name here"
                    aria-label="product-label"
                    aria-describedby="product-name"
                    />
                <InputGroup.Prepend>
                    <Button variant="outline-secondary">Search</Button>
                </InputGroup.Prepend>
                </InputGroup> */}
            </div>
        )
    }
}