import { SELECT_COURSE, UNSELECT_COURSE, } from './courseActionTypes';

const selectCourse = (index) => {
  return dispatch({
    type: SELECT_COURSE,
    index: index,
  });
};

const unSelectCourse = (index) => {
  return dispatch({
    type: UNSELECT_COURSE,
    index: index,
  });
};

module.exports = {
  selectCourse,
  unSelectCourse,
};
