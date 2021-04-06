import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { courseReducer, initState, } from './courseReducer';
import { configure } from 'enzyme';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS, } from '../actions/courseActionTypes';
import {
  fetchCourseSuccess,
  selectCourse,
  unSelectCourse,
} from '../actions/courseActionCreators';
import Immutable, { setIn, } from 'immutable';
import { coursesNormalizer, } from '../schema/courses'; 

configure({ adapter: new Adapter() });

describe("Testing the courseReducer", () => {

  // let newState = new Map;
  let newState = new Immutable.Map(initState);

  it("Test that the default state returns an empty array", () => {
    let expected = courseReducer(undefined, {});
    expected = expected.toJS();
    expect(expected).to.be.an('object');
  });

  it("Test that FETCH_COURSE_SUCCESS returns the data passed", () => {
    let action = fetchCourseSuccess();
    let expected = courseReducer(undefined, action);
    let updatedData = [];
    action.data.map(course => {
      updatedData.push({...course, isSelected: false});
    });
    newState = coursesNormalizer(updatedData);
    expect(expected.toJS()).to.deep.equal(newState);
  });

  it("Test that SELECT_COURSE returns the data with the right item updated", () => {
    let action = selectCourse(1);
    let ns = setIn(newState, ['entities', 'courses', action.index, 'isSelected'], true);
    let expected = courseReducer(newState, action);
    Immutable.is(expected, ns);
    newState = ns;
  });

  it("Test that UNSELECT_COURSE returns the data with the right item updated", () => {
    let action = unSelectCourse(1);
    let ns = setIn(newState, ['entities', 'courses', action.index, 'isSelected'], true);
    let expected = courseReducer(newState, action);
    Immutable.is(expected, ns);
    newState = ns;
  });

});
