import coursesSlice, { fetchCourses } from "../courses/coursesSlice";
import { logout } from "../auth/authSlice";
import mockAxios from "jest-mock-axios";

afterEach(() => {
  mockAxios.reset();
});

describe("coursesSlice", () => {
  const initialState = {
    courses: [],
  };

  test("should return the initial state", () => {
    expect(coursesSlice(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("fetchCourses async thunk", () => {
    test("should handle fetchCourses.pending", () => {
      const action = { type: fetchCourses.pending.type };
      const state = coursesSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });

    test("should handle fetchCourses.rejected", () => {
      const action = {
        type: fetchCourses.rejected.type,
      };
      const state = coursesSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
      });
    });

    test("test courses", async () => {
      const courses = [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchCourses()(dispatch, getState, null);

      mockAxios.mockResponse({ data: { courses } });

      await promise;

      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch.mock.calls[0][0].type).toEqual(
        fetchCourses.pending.type
      );

      const fulfilledAction = dispatch.mock.calls[1][0];
      expect(fulfilledAction.type).toEqual(fetchCourses.fulfilled.type);

      expect(fulfilledAction.payload).toEqual(courses);
    });
  });

  describe("logout action", () => {
    test("should reset courses array on logout", () => {
      const stateWithCourses = {
        courses: [
          { id: 1, title: "Introduction to Programming" },
          { id: 2, title: "Advanced Mathematics" },
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
