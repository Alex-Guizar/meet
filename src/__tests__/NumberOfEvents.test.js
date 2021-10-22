import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../components/NumberofEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberWrapper;
  beforeAll(() => {
    NumberWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });

  test('render number of events input', () => {
    expect(NumberWrapper.find('.event-number')).toHaveLength(1);
  });

  test('render 32 events when not specified by user', () => {
    expect(NumberWrapper.state('eventNumber')).toBe(32);
  });

  test('change event number when number input is changed', () => {
    const eventObject = { target: { value: 15 }};
    NumberWrapper.find('.event-number').simulate('change', eventObject);
    expect(NumberWrapper.state('eventNumber')).toBe(15);
  });
});