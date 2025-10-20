import { render, screen, fireEvent } from "@testing-library/react";
import Notifications from "./Notifications";
import { getLatestNotification } from "../utils/utils";

jest.mock("../utils/utils", () => ({
  getLatestNotification: jest.fn(),
}));

describe("Notifications component", () => {
  beforeEach(() => {
    getLatestNotification.mockReturnValue(
      "<strong>Urgent requirement</strong> - complete by EOD"
    );
  });

  test("renders the notifications title", () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      displayDrawer: true,
    };
    render(<Notifications {...props} />);
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the close button", () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      displayDrawer: true,
    };
    render(<Notifications {...props} />);
    const buttonElement = screen.getByRole("button", { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test("logs message when close button is clicked", () => {
    console.log = jest.fn();
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
      ],
      displayDrawer: true,
    };

    render(<Notifications {...props} />);

    const buttonElement = screen.getByRole("button", { name: /close/i });

    fireEvent.click(buttonElement);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringMatching(/close button has been clicked/i)
    );
  });

  test("it should display 3 notification items as expected through props", () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      displayDrawer: true,
    };

    render(<Notifications {...props} />);

    const listItemElements = screen.getAllByRole("listitem");
    expect(listItemElements).toHaveLength(3);
  });

  test('it should not display a title, button and a 3 list items, whenever the "displayDrawer" set to false', () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      displayDrawer: false,
    };
    render(<Notifications {...props} />);

    const notificationsTitle = screen.queryByText(
      /here is the list of notifications/i
    );
    const notificationsButton = screen.queryByRole("button");
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsTitle).toBeNull();
    expect(notificationsButton).toBeNull();
    expect(notificationsListItems).toHaveLength(0);
  });

  test('it should display a paragraph of "No new notification for now" whenever the listNotification prop is empty', () => {
    const props = {
      notifications: [],
      displayDrawer: true,
    };
    render(<Notifications {...props} />);

    const notificationsTitle = screen.getByText(/no new notification for now/i);
    const notificationsListItems = screen.queryAllByRole("listitem");

    expect(notificationsListItems).toHaveLength(0);
    expect(notificationsTitle).toBeInTheDocument();
  });

  test('it should display "Your notifications" in all cases', () => {
    const notificationsData = [
      { id: 1, type: "default", value: "New course available" },
    ];

    const { rerender } = render(
      <Notifications displayDrawer={false} notifications={[]} />
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();

    rerender(<Notifications displayDrawer={true} notifications={[]} />);

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();

    rerender(
      <Notifications displayDrawer={true} notifications={notificationsData} />
    );

    expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  });

  test("it should display close button, p element, and notification items when displayDrawer is true", () => {
    const props = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      displayDrawer: true,
    };

    render(<Notifications {...props} />);

    const closeButton = screen.getByRole("button", { name: /close/i });
    const pElement = screen.getByText(/here is the list of notifications/i);
    const listItems = screen.getAllByRole("listitem");

    expect(closeButton).toBeInTheDocument();
    expect(pElement).toBeInTheDocument();
    expect(listItems).toHaveLength(3);
  });
});
