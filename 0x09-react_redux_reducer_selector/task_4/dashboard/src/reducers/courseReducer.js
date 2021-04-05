import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS, } from '../actions/courseActionTypes';
import Immutable, { setIn } from 'immutable';
import { coursesNormalizer, } from '../schema/courses'; 

export let initState = [];

export let courseReducer = (state = new Immutable.Map(initState), action) => {
  let newState = [];
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      let editedData = [];
      action.data.map(course => {
        editedData.push({...course, isSelected: false});
      });
      editedData = coursesNormalizer(editedData);
      return state.merge(editedData);
    case SELECT_COURSE:
      return setIn(state, ['entities', 'courses', action.index, 'isSelected'], true);
    case UNSELECT_COURSE:
      return setIn(state, ['entities', 'courses', action.index, 'isSelected'], false);
    default:
      return state;
  };
};
