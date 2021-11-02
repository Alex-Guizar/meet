// Packages
import React, { Component } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// React-Bootstrap Components
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Custom Components
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { WarningAlert } from './components/Alert';
import EventGenre from './components/EventGenre';

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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return { city, number };
    });

    return data;
  }

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

          <Row>
            <Col lg={6}>
              <EventGenre events={events} />
            </Col>

            <Col lg={6}>
              <ResponsiveContainer height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="category" dataKey="city" name="city" />
                  <YAxis type="number" dataKey="number" name="number of events" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={this.getData()} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </Col>
          </Row>

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
