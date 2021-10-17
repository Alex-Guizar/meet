import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event.js';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  afterEach(() => {
    EventWrapper.setState({ isExpanded: false });
  });

  test('render event details', () => {
    expect(EventWrapper.find('.details')).toHaveLength(1);
  });

  test('event details should be collapsed on render', () => {
    expect(EventWrapper.find('.details').hasClass('is-active')).toBeFalsy();
  });

  test('user can expand an event to see details', () => {
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.details').hasClass('is-active')).toBeTruthy();
  });

  test('user can collapse and event after expanding it', () => {
    EventWrapper.find('.details-btn').simulate('click');
    EventWrapper.find('.details-btn').simulate('click');
    expect(EventWrapper.find('.details').hasClass('is-active')).toBeFalsy();
  });
});