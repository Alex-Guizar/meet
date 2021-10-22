// Packages
import React, { Component } from 'react';

// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({
      eventNumber: value
    });
    this.props.updateEvents(undefined, value);
  }

  render() {
    return (
      <div className="event-number ml-auto">
        <FloatingLabel
          controlId="ev-num-input"
          label="Displayed Events"
          className=""
        >
          <Form.Control
            className="event-number__input"
            type="number"
            name="event-number"
            value={this.state.eventNumber}
            onChange={(event) => this.handleInputChange(event)}
          />
        </FloatingLabel>
      </div>
    );
  }
}

export default NumberOfEvents;
