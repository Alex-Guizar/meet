import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberofEvents';
import { mockData } from './mock-data';

class App extends Component {
  state = {
    eventNumber: 32,
    data: mockData
  }

  setEventNumber = (number) => {
    this.setState({
      eventNumber: number
    });
  } 

  render() {
    const { eventNumber, data } = this.state;

    return (
      <div className="App">
        <CitySearch eventNumber={eventNumber} setEventNumber={this.setEventNumber} />
        <NumberOfEvents data={data.slice(0, eventNumber)} />
        <EventList />
      </div>
    );
  }
}

export default App;
