import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../components/EventList';
import CitySearch from '../components/CitySearch';
import NumberOfEvents from '../components/NumberOfEvents';

import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> Component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberofEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions .list-group-item');

    suggestionItems.at(suggestionItems.length -1).simulate('click');
    let allEvents = await getEvents();
    // reduce `allEvents` by default shown events: 32
    allEvents = allEvents.slice(0, 32);
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('get a list of the default amount of events', async () => {
    const AppWrapper = mount(<App />);
    const defaultNumber = 32;
    const allEvents = await getEvents();
    AppWrapper.setState({
      events: allEvents.slice(0, defaultNumber),
      numberOfEvents: defaultNumber
    });
    const totalEvents = AppWrapper.find(EventList).find('.event-list .card').length;
    expect(totalEvents).toBeLessThanOrEqual(AppWrapper.state('numberOfEvents'));
    AppWrapper.unmount();
  });

  test('get a list of specified amount of events when user changes the number of events input', async () => {
    const AppWrapper = mount(<App />);
    const eventObject = { target: { value: 16 }};

    AppWrapper.find(NumberOfEvents).find('.event-number__input').simulate('change', eventObject);
    let allEvents = await getEvents();
    allEvents = allEvents.slice(0, AppWrapper.state('numberOfEvents'))

    const totalEvents = allEvents.length;
    expect(totalEvents).toBeLessThanOrEqual(AppWrapper.state('numberOfEvents'));
    AppWrapper.unmount();
  });
});