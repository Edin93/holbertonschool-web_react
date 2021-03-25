import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount, } from 'enzyme';
import { StyleSheetTestUtils, } from 'aphrodite';
import { SELECT_COURSE, UNSELECT_COURSE, } from './courseActionTypes';
import { selectCourse, unSelectCourse, } from './courseActionCreators';

configure({ adapter: new Adapter() });

StyleSheetTestUtils.suppressStyleInjection();

describe("Testing the course Action Creator.", () => {

  it("Testing the selectCourse action", () => {
    const expectedResult = { type: SELECT_COURSE, index: 1 };

    let result = selectCourse(1);
    expect(result).toMatchObject(expectedResult);
  });

  it("Testing the unSelectCourse action", () => {
    const expectedResult = { type: UNSELECT_COURSE, index: 1 };

    let result = unSelectCourse(1);
    expect(result).toMatchObject(expectedResult);
  });

});
