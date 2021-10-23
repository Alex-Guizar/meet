// Packages
import React, { Component } from 'react';

// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import ListGroup from 'react-bootstrap/ListGroup';

class CitySearch extends Component {
  state = {
    query: '',
    suggestions: [],
    showSuggestions: undefined
  }

  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: value,
      suggestions
    });
  }

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });

    this.props.updateEvents(suggestion);
  }

  render() {
    return (
      <div className="city-search">
        <>
          <FloatingLabel 
            controlId="city-input"
            label="City"
            className="mt-3"
          >
            <Form.Control 
              type="text" 
              placholder="City" 
              className="city"
              name="city"
              value={this.state.query}
              onChange={this.handleInputChanged}
              onFocus={() => { this.setState({ showSuggestions: true })}}
             
            />
          </FloatingLabel>
        </>
        <ListGroup
          className="suggestions"
          style={this.state.showSuggestions ? {} : { display: 'none'}}
        >
          {this.state.suggestions.map((suggestion) => (
            <ListGroup.Item
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
              className="suggestions-item"
            >{suggestion}</ListGroup.Item>
          ))}
          <ListGroup.Item
            key="all"
            onClick={() => this.handleItemClicked('all')}
            className="suggestions-item"
          ><b>See All Cities</b></ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default CitySearch;