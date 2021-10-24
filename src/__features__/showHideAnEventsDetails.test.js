// Packages
import React from 'react';
import { mount, shallow } from 'enzyme';
import { loadFeature, defineFeature } from 'jest-cucumber';

// Custom Components
import App from '../App';
import Event from '../components/Event';

import { mockData } from '../mock-data';

const feature = loadFeature('./src/__features__/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('user hasn\'t interacted with details', () => {

    });

    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user should see all event details collapsed', () => {
      expect(AppWrapper.find('.event .details.is-active')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let EventWrapper;
    given('user wanted to expand an event\'s details', () => {
      const event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
    });

    when('the user clicks on an event\'s details', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event\'s details should expand', () => {
      expect(EventWrapper.find('.details.is-active')).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let EventWrapper;
    given('user wanted to collapse an event\'s details', () => {
      const event = mockData[0];
      EventWrapper = shallow(<Event event={event} />);
      EventWrapper.setState({ isExpanded: true });
      expect(EventWrapper.find('.details.is-active')).toHaveLength(1);
    });

    when('the user clicks on an event\'s details', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event\'s details should collapse', () => {
      expect(EventWrapper.find('.details.is-active')).toHaveLength(0);
    });
  });
});