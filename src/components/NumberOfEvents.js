import React, { Component } from 'react';

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
      <div className="NumberOfEvents">
        <input 
          className="event-number" 
          type="number" 
          name="event-number" 
          value={this.state.eventNumber} 
          onChange={(event) => this.handleInputChange(event)}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
