import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Notifications from "./Notifications";
import notificationsReducer from '../../features/notifications/notificationsSlice';
import { getLatestNotification } from "../../utils/utils";

jest.mock("../../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      notifications: notificationsReducer
    },
    preloadedState: initialState
  });
};

const renderWithRedux = (component, initialState) => {
  const store = createMockStore(initialState);
  return { store, ...render(
    <Provider store={store}>
      {component}
    </Provider>
  )};
};

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

  test("renders the notifications title", () => {
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
        displayDrawer: true,
      }
    };
    renderWithRedux(<Notifications />, initialState);
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the close button", () => {
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
        displayDrawer: true,
      }
    };
    renderWithRedux(<Notifications />, initialState);
    const buttonElement = screen.getByRole("button", { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("logs message when close button is clicked", () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
        displayDrawer: true,
      }
    };

    const store = createMockStore(initialState);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const buttonElement = screen.getByRole("button", { name: /close/i });

    fireEvent.click(buttonElement);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/hideDrawer');

    consoleSpy.mockRestore();
  });

  test("it should display 3 notification items as expected through props", () => {
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: true,
      }
    };

    renderWithRedux(<Notifications />, initialState);

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(3);
  });

  test('it should not display a title, button and a 3 list items, whenever the "displayDrawer" set to false', () => {
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: false,
      }
    };
    renderWithRedux(<Notifications />, initialState);

    const notificationsTitle = screen.queryByText(
      /here is the list of notifications/i
    );
    const notificationsButton = screen.queryByRole("button");
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsTitle).toBeNull();
    expect(notificationsButton).toBeNull();
    expect(notificationsListItems).toHaveLength(0);
  });

  test('it should display a paragraph of "No new notifications for now" whenever the listNotification prop is empty', () => {
    const initialState = {
      notifications: {
        notifications: [],
        displayDrawer: true,
      }
    };
    renderWithRedux(<Notifications />, initialState);

    const notificationsTitle = screen.getByText(/no new notifications for now/i);
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsListItems).toHaveLength(0);
    expect(notificationsTitle).toBeInTheDocument();
  });

  test('it should display "Your notifications" in all cases', () => {
    const initialState = {
      notifications: {
        notifications: [],
        displayDrawer: false,
      }
    };

    const { unmount } = renderWithRedux(<Notifications />, initialState);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    unmount();

    const initialState2 = {
      notifications: {
        notifications: [],
        displayDrawer: true,
      }
    };
    const { unmount: unmount2 } = renderWithRedux(<Notifications />, initialState2);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
    unmount2();

    const initialState3 = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
        ],
        displayDrawer: true,
      }
    };
    renderWithRedux(<Notifications />, initialState3);
    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("it should display close button, p element, and notification items when displayDrawer is true", () => {
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: true,
      }
    };

    renderWithRedux(<Notifications />, initialState);

    const closeButton = screen.getByRole("button", { name: /close/i });
    const pElement = screen.getByText(/here is the list of notifications/i);
    const listItems = screen.getAllByRole("listitem");

    expect(closeButton).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });

  test("it should call markNotificationAsRead when a notification item is clicked", () => {
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: "default", value: "New course available" },
          { id: 2, type: "urgent", value: "New resume available" },
          { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
        ],
        displayDrawer: true,
      }
    };

    const store = createMockStore(initialState);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const listItems = screen.getAllByRole("listitem");

    fireEvent.click(listItems[0]);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/markNotificationAsRead');
    expect(dispatchSpy.mock.calls[0][0].payload).toBe(1);

    dispatchSpy.mockClear();

    fireEvent.click(listItems[1]);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/markNotificationAsRead');
    expect(dispatchSpy.mock.calls[0][0].payload).toBe(2);

    dispatchSpy.mockClear();

    fireEvent.click(listItems[2]);
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/markNotificationAsRead');
    expect(dispatchSpy.mock.calls[0][0].payload).toBe(3);
  });

  test('should update when the notifications length changes', () => {
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'Notification 1' },
        ],
        displayDrawer: true,
      }
    };

    const { unmount } = renderWithRedux(<Notifications />, initialState);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    unmount();

    const updatedState = {
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'Notification 1' },
          { id: 2, type: 'urgent', value: 'Notification 2' },
        ],
        displayDrawer: true,
      }
    };

    renderWithRedux(<Notifications />, updatedState);
    const updatedListItems = screen.getAllByRole('listitem');
    expect(updatedListItems).toHaveLength(2);
  });

  test('should maintain same content when notifications are unchanged', () => {
    const initialState = {
      notifications: {
        notifications: [
          { id: 1, type: 'default', value: 'Notification 1' },
          { id: 2, type: 'urgent', value: 'Notification 2' },
        ],
        displayDrawer: true,
      }
    };

    renderWithRedux(<Notifications />, initialState);
    const firstListItems = screen.getAllByRole('listitem');
    expect(firstListItems).toHaveLength(2);
    expect(firstListItems[0].textContent).toContain('Notification 1');
  });

  test('should call handleDisplayDrawer when "Your notifications" is clicked', () => {
    const initialState = {
      notifications: {
        notifications: [],
        displayDrawer: false,
      }
    };

    const store = createMockStore(initialState);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const notificationTitle = screen.getByText('Your notifications');
    fireEvent.click(notificationTitle);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/showDrawer');
  });

  test('should call handleHideDrawer when close button is clicked', () => {
    const initialState = {
      notifications: {
        notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
        displayDrawer: true,
      }
    };

    const store = createMockStore(initialState);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy.mock.calls[0][0].type).toBe('notifications/hideDrawer');
  });
});
