import { act, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import mockAxios from "jest-mock-axios";
import App from "../App";
import authSlice, { logout, login } from "../features/auth/authSlice";
import notificationsSlice from "../features/notifications/notificationsSlice";
import coursesSlice from "../features/courses/coursesSlice";

const NOTIFICATIONS_DATA = [
  {
    id: "5debd764507712e7a1307303",
    context: {
      type: "urgent",
      isRead: false,
      value:
        "ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et.",
    },
  },
  {
    id: "5debd76444dd4dafea89d53b",
    context: {
      type: "urgent",
      isRead: false,
      value:
        "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed",
    },
  },
  {
    id: "5debd7644e561e022d66e61a",
    context: {
      type: "urgent",
      isRead: false,
      value:
        "In hendrerit gravida rutrum quisque non tellus orci. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Lorem mollis aliquam ut porttitor",
    },
  },
  {
    id: "5debd7644aaed86c97bf9d5e",
    context: {
      type: "default",
      isRead: false,
      value: "Cursus metus aliquam eleifend mi in nulla posuere.",
    },
  },
  {
    id: "5debd76413f0d5e5429c28a0",
    context: {
      type: "default",
      isRead: false,
      value: "Quam viverra orci sagittis eu volutpat odio facilisis mauris sit",
    },
  },
  {
    id: "5debd764c1127bc5a490a4d0",
    context: {
      type: "default",
      isRead: false,
      value: "Cursus risus at ultrices mi.",
    },
  },
  {
    id: "5debd764a4f11eabef05a81d",
    context: {
      type: "default",
      isRead: false,
      value:
        "Ac placerat vestibulum lectus mauris ultrices eros in cursus. Amet nisl suscipit adipiscing bibendum est ultricies integer. Lorem donec massa sapien faucibus et molestie ac",
    },
  },
  {
    id: "5debd764af0fdd1fc815ad9b",
    context: {
      type: "urgent",
      isRead: false,
      value: "Nulla malesuada pellentesque elit eget gravida cum sociis",
    },
  },
  {
    id: "5debd76468cb5b277fd125f4",
    context: {
      type: "urgent",
      isRead: false,
      value:
        "Elit eget gravida cum sociis natoque penatibus et. Congue mauris rhoncus aenean vel",
    },
  },
  {
    id: "5debd764de9fa684468cdc0b",
    context: {
      type: "default",
      isRead: false,
      value:
        "Leo vel fringilla est ullamcorper. Volutpat consequat mauris nunc congue",
    },
  },
];

const COURSES_DATA = [
  { id: 1, name: "ES6", credit: 60 },
  { id: 2, name: "Webpack", credit: 20 },
  { id: 3, name: "React", credit: 40 },
];

describe("App Component Integration Tests", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
        courses: coursesSlice,
        notifications: notificationsSlice,
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  const renderWithStore = () => {
    return render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  };

  test("should NOT populate courses when not logged in", async () => {
    renderWithStore();

    mockAxios.mockResponse({ data: NOTIFICATIONS_DATA });

    await waitFor(() => {
      expect(store.getState().courses.courses).toHaveLength(0);

      const notifications = store.getState().notifications.notifications;
      expect(notifications).toHaveLength(10);
      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "5debd764507712e7a1307303",
            type: "urgent",
            isRead: false,
            value: expect.stringContaining("ut labore et dolore magna aliqua"),
          }),
          expect.objectContaining({
            id: "5debd76444dd4dafea89d53b",
            type: "urgent",
            isRead: false,
            value: expect.stringContaining("Non diam phasellus vestibulum"),
          }),
          expect.objectContaining({
            id: "5debd7644aaed86c97bf9d5e",
            type: "default",
            isRead: false,
            value: "Cursus metus aliquam eleifend mi in nulla posuere.",
          }),
          expect.objectContaining({
            id: "5debd764af0fdd1fc815ad9b",
            type: "urgent",
            isRead: false,
            value: "Nulla malesuada pellentesque elit eget gravida cum sociis",
          }),
        ])
      );
    });
  });

  test("should populate courses WHEN logged in", async () => {
    store.dispatch(
      login({
        email: "test@example.com",
        password: "password123",
      })
    );

    renderWithStore();

    mockAxios.mockResponse({ data: NOTIFICATIONS_DATA });

    mockAxios.mockResponse({ data: { courses: COURSES_DATA } });

    await waitFor(() => {
      expect(store.getState().courses.courses).toEqual([
        { id: 1, name: "ES6", credit: 60, isSelected: false },
        { id: 2, name: "Webpack", credit: 20, isSelected: false },
        { id: 3, name: "React", credit: 40, isSelected: false },
      ]);

      const notifications = store.getState().notifications.notifications;
      expect(notifications).toHaveLength(10);
      expect(notifications).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: "5debd7644e561e022d66e61a",
            type: "urgent",
            isRead: false,
            value: expect.stringContaining("In hendrerit gravida rutrum"),
          }),
          expect.objectContaining({
            id: "5debd764de9fa684468cdc0b",
            type: "default",
            isRead: false,
            value:
              "Leo vel fringilla est ullamcorper. Volutpat consequat mauris nunc congue",
          }),
        ])
      );
    });
  });

  test("should CLEAR courses on logout", async () => {
    store.dispatch(
      login({
        email: "test@example.com",
        password: "password123",
      })
    );

    renderWithStore();

    mockAxios.mockResponse({ data: NOTIFICATIONS_DATA });
    mockAxios.mockResponse({ data: { courses: COURSES_DATA } });

    await waitFor(() => {
      expect(store.getState().courses.courses).toHaveLength(3);
    });

    act(() => store.dispatch(logout()));

    await waitFor(() => {
      expect(store.getState().courses.courses).toHaveLength(0);
      expect(store.getState().notifications.notifications).toHaveLength(10);
    });
  });
});
