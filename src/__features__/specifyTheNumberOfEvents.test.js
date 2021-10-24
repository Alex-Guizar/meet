// Packages
import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';

import App from '../App';

import { mockData } from '../mock-data';

const feature = loadFeature('./src/__features__/specifyTheNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn\'t specified a number, 32 is the default number', ({ given, when, then }) => {
    given('user hasn\'t specified a number', () => {

    });

    let AppWrapper;
    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then(/^the number of events shown should default to (\d+)$/, (arg0) => {
      const newData = mockData.slice(0, 32);
      AppWrapper.update();

      expect(AppWrapper.state('numberOfEvents')).toBe(32);
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(newData.length);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('user wanted to change the number of events shown', () => {
      AppWrapper = mount(<App />);
    });

    when('the user edits the number of events shown', () => {
      AppWrapper.find('.event-number__input').hostNodes().simulate('change', { target: { value: 18 } });
    });

    then('the displayed number of events should change', () => {
      const newData = mockData.slice(0, 18);
      AppWrapper.update();

      expect(AppWrapper.state('numberOfEvents')).toBe(18);
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(newData.length);
    });
  });
});