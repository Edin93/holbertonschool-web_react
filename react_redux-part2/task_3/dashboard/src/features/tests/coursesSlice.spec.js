import coursesSlice, { fetchCourses, selectCourse, unSelectCourse } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import mockAxios from 'jest-mock-axios';

describe('coursesSlice', () => {
  const initialState = {
    courses: [],
  };

  afterEach(() => {
    mockAxios.reset();
  });

  test('should return the initial state', () => {
    expect(coursesSlice(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  describe('fetchCourses async thunk', () => {
    test('should handle fetchCourses.pending', () => {
      const action = { type: fetchCourses.pending.type };
      const state = coursesSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });

    test('should handle fetchCourses.rejected', () => {
      const action = {
        type: fetchCourses.rejected.type,
      };
      const state = coursesSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });

    test('test courses', async () => {
      const coursesData = [
        { "id": 1, "name": "ES6", "credit": 60 },
        { "id": 2, "name": "Webpack", "credit": 20 },
        { "id": 3, "name": "React", "credit": 40 }
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchCourses()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { courses: coursesData }
      });

      await promise;

      expect(dispatch).toHaveBeenCalledTimes(2);

      const fulfilledAction = dispatch.mock.calls[1][0];

      expect(fulfilledAction.type).toEqual(fetchCourses.fulfilled.type);
      expect(fulfilledAction.payload).toEqual(coursesData);
    });
  });

  describe('logout action', () => {
    test('should reset courses array on logout', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, title: 'Introduction to Programming' },
          { id: 2, title: 'Advanced Mathematics' },
        ],
      };

      const action = { type: logout.type };
      const state = coursesSlice(stateWithCourses, action);

      expect(state).toEqual({
        courses: [],
      });
    });
  });

  describe('selectCourse and unSelectCourse actions', () => {
    test('should handle selectCourse', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
          { id: 2, name: 'Webpack', credit: 20, isSelected: false },
          { id: 3, name: 'React', credit: 40, isSelected: false },
        ],
      };

      const action = selectCourse(2);
      const state = coursesSlice(stateWithCourses, action);

      expect(state.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: true },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ]);
    });

    test('should handle unSelectCourse', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
          { id: 2, name: 'Webpack', credit: 20, isSelected: true },
          { id: 3, name: 'React', credit: 40, isSelected: false },
        ],
      };

      const action = unSelectCourse(2);
      const state = coursesSlice(stateWithCourses, action);

      expect(state.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ]);
    });

    test('should handle selectCourse for non-existent course', () => {
      const stateWithCourses = {
        courses: [
          { id: 1, name: 'ES6', credit: 60, isSelected: false },
        ],
      };

      const action = selectCourse(999);
      const state = coursesSlice(stateWithCourses, action);

      expect(state.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
      ]);
    });

    test('should add isSelected property to courses on fetchCourses.fulfilled', () => {
      const action = {
        type: fetchCourses.fulfilled.type,
        payload: [
          { id: 1, name: 'ES6', credit: 60 },
          { id: 2, name: 'Webpack', credit: 20 },
        ],
      };

      const state = coursesSlice(initialState, action);

      expect(state.courses).toEqual([
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      ]);
    });
  });
});
