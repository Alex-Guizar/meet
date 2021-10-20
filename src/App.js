import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { mockData } from './mock-data';
import { extractLocations, getEvents } from './api';

import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    eventNumber: 32,
    data: mockData
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }

  // setEventNumber = (number) => {
  //   this.setState({
  //     eventNumber: number
  //   });
  // } 

  render() {
    const { events, locations, eventNumber, data } = this.state;

    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents data={data.slice(0, eventNumber)} />
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
