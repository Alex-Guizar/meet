// Packages
import React, { Component } from 'react';

// React-Bootstrap Components
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

// Custom Components
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
  state = {
    eventNumber: 32,
    errorText: ''
  }

  handleInputChange = (event) => {
    const value = event.target.value;

    if (parseInt(value) < 1 || parseInt(value) > 32) {
      this.setState({
        eventNumber: 32,
        errorText: 'Select number from 1 to 32'
      });
    } else {
      this.setState({
        eventNumber: value,
        errorText: ''
      });
    }
    this.props.updateEvents(undefined, value);
  }

  render() {
    return (
      <div className="event-number ml-auto">
        <FloatingLabel
          controlId="ev-num-input"
          label="Displayed Events"
          className="event-number__label"
        >
          <Form.Control
            className="event-number__input"
            type="number"
            name="event-number"
            value={this.state.eventNumber}
            onChange={(event) => this.handleInputChange(event)}
          />
        </FloatingLabel>
        <div className="py-2">
          <ErrorAlert text={this.state.errorText} />
        </div>
      </div>
    );
  }
}

export default NumberOfEvents;
