import React from 'react';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { uiReducer, initState, } from './uiReducer';
import { configure } from 'enzyme';
import { SELECT_COURSE } from '../actions/courseActionTypes';
import { DISPLAY_NOTIFICATION_DRAWER } from '../actions/uiActionTypes';

configure({ adapter: new Adapter() });

describe("Testing the uiReducer", () => {
  
  it("Verify the returned state equals the initial state when no action is passed", () => {
    expect(uiReducer(undefined, {})).to.equal(initState);
  });

  it("Verify the returned state equals the initial state when the action SELECT_COURSE is passed", () => {
    expect(uiReducer(undefined, { type: SELECT_COURSE })).to.equal(initState);
  });

  it("Verify the returned state has the correct 'isNotificationDrawerVisible' when the 'DISPLAY_NOTIFICATION_DRAWER' action is passed", () => {
    let r = (uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER }));

    expect(
      (uiReducer(undefined, { type: DISPLAY_NOTIFICATION_DRAWER })).isNotificationDrawerVisible
    ).to.equal(true);
  });

});
