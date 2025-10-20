import coursesSlice, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('coursesSlice', () => {
  const initialState = {
    courses: [],
  };

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

    test('should handle fetchCourses.fulfilled with manual payload', () => {
      const mockCourses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ];
      const action = {
        type: fetchCourses.fulfilled.type,
        payload: mockCourses,
      };
      const state = coursesSlice(initialState, action);
      expect(state).toEqual({
        courses: mockCourses,
      });
    });

    test('should execute fetchCourses thunk and return courses data', async () => {
      const mockCourses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchCourses()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { courses: mockCourses }
      });

      await promise;

      expect(dispatch).toHaveBeenCalledTimes(2); // pending + fulfilled

      const fulfilledAction = dispatch.mock.calls[1][0];

      expect(fulfilledAction).toEqual(
        expect.objectContaining({
          type: fetchCourses.fulfilled.type,
          payload: mockCourses
        })
      );
      expect(fulfilledAction.payload).toHaveLength(3);
      expect(fulfilledAction.payload).not.toEqual([]);
    });

    test('should not return empty array when courses data exists', async () => {
      const mockCourses = [
        { id: 1, name: 'ES6', credit: 60 }
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchCourses()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { courses: mockCourses }
      });

      await promise;

      const fulfilledAction = dispatch.mock.calls[1][0];

      expect(fulfilledAction.payload).not.toEqual([]);
      expect(fulfilledAction.payload.length).toBeGreaterThan(0);
      expect(Array.isArray(fulfilledAction.payload)).toBe(true);
    });

    test('should update state with actual courses from API response', async () => {
      const mockCourses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 }
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchCourses()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { courses: mockCourses }
      });

      await promise;

      const fulfilledAction = dispatch.mock.calls[1][0];

      const newState = coursesSlice(initialState, fulfilledAction);

      expect(newState.courses).toEqual(mockCourses);
      expect(newState.courses).toHaveLength(2);
      expect(newState.courses).not.toEqual([]);
    });

    test('should return courses with correct object structure', async () => {
      const mockCourses = [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 }
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchCourses()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: { courses: mockCourses }
      });

      await promise;

      const fulfilledAction = dispatch.mock.calls[1][0];

      expect(fulfilledAction.payload).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            credit: expect.any(Number)
          })
        ])
      );
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
});
