import React, { Component } from 'react';

import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

import './App.css';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all'
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      const reducedEvents = events.slice(0, this.state.numberOfEvents);
      if (this.mounted) {
        this.setState({ events: reducedEvents, locations: extractLocations(reducedEvents) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    const currentLocation = (location !== undefined) ? location: this.state.currentLocation;
    const eventNumber = (eventCount !== undefined) ? eventCount : this.state.numberOfEvents;

    getEvents().then((events) => {
      let locationEvents = (currentLocation === 'all') ?
        events :
        events.filter((event) => event.location === currentLocation);
      locationEvents = locationEvents.slice(0, eventNumber);
      
      this.setState({
        events: locationEvents,
        numberOfEvents: eventNumber,
        currentLocation
      });
    });
  }

  // setEventNumber = (number) => {
  //   this.setState({
  //     eventNumber: number
  //   });
  // } 

  render() {
    const { events, locations } = this.state;

    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateEvents={this.updateEvents} />
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
