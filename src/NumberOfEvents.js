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
  }

  render() {
    const { eventNumber } = this.state;
    
    return (
      <div className="NumberOfEvents">
        <input 
          className="event-number" 
          type="number" 
          name="event-number" 
          value={eventNumber} 
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default NumberOfEvents;
