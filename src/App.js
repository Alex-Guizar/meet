// Packages
import React, { Component } from 'react';

// React-Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

// Custom Components
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import WelcomeScreen from '.WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { WarningAlert } from './components/Alert';

// Custom CSS
import './nprogress.css';
import './App.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        const reducedEvents = events.slice(0, this.state.numberOfEvents);
        if (this.mounted) {
          this.setState({ events: reducedEvents, locations: extractLocations(reducedEvents) });
        }
      });
    }
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

    if (this.state.showWelcomeScreen === undefined) {
      return <div className="App" />;
    }

    return (
      <div className="app">

        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Meet</Navbar.Brand>
          </Container>
        </Navbar>
        <Container>
          {!navigator.onLine ?
            <WarningAlert text="Current information is being loaded from the cache." /> :
            ''
          }
          <CitySearch locations={locations} updateEvents={this.updateEvents} />
          <div className="event-header">
            <h1 className="event-header__heading me-3">Events</h1>
            <NumberOfEvents updateEvents={this.updateEvents} />
          </div>
          <EventList events={events} />
        </Container>

        <WelcomeScreen 
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => { getAccessToken() }} 
        />
      </div>
    );
  }
}

export default App;
