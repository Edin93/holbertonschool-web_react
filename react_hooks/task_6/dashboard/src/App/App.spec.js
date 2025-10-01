import React from "react";
import mockAxios from "jest-mock-axios";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import App from "./App";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";

jest.mock("axios");

test("renders App component without crashing", () => {
  render(<App />);
});

test("renders Header component without crashing", () => {
  render(<Header user={{ isLoggedIn: false, email: "" }} logOut={jest.fn()} />);
});

test("renders Login component without crashing", () => {
  render(<Login />);
});

test("renders Footer component without crashing", () => {
  render(<Footer user={{ isLoggedIn: false}} />);
});

test("renders Notifications component without crashing", () => {
  render(<Notifications />);
});

test('renders 2 input elements and a button with the text "OK" when isLoggedIn is false', () => {
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  expect(emailInput).toBeInTheDocument();

  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();

  const buttonElement = screen.getByRole("button", { name: "OK" });
  expect(buttonElement).toBeInTheDocument();
});

test('displays the title "Course list" above the CourseList component when isLoggedIn is true', async () => {
  const coursesMock = {
    courses: [
      { id: 1, name: "ES6", credit: 60 },
      { id: 2, name: "Webpack", credit: 20 },
      { id: 3, name: "React", credit: 40 },
    ],
  };

  mockAxios.get.mockResolvedValueOnce({ data: coursesMock });

  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, { target: { value: "user@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });

  const loginButton = screen.getByRole("button", { name: /OK/i });
  fireEvent.click(loginButton);

  await waitFor(() => screen.findByText("Course list"), { timeout: 5000 });

  const courseListTitle = screen.getByText("Course list");
  expect(courseListTitle).toBeInTheDocument();
});

test('displays the title "Log in to continue" above the Login component when isLoggedIn is false', () => {
  render(<App />);

  const loginTitle = screen.getByText("Log in to continue");
  expect(loginTitle).toBeInTheDocument();
});

test('displays "News from the School" and "Holberton School News goes here" by default', () => {
  render(<App />);

  const newsTitle = screen.getByText(/News from the School/i);
  expect(newsTitle).toBeInTheDocument();

  const newsContent = screen.getByText(/Holberton School News goes here/i);
  expect(newsContent).toBeInTheDocument();
});

test("verifies that notification items are removed and the correct log is printed when clicked", async () => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  const mockNotifications = {
    data: {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New course available soon" },
      ],
    },
  };
  mockAxios.get.mockResolvedValueOnce(mockNotifications);
  render(<App />);
  await screen.findByText("New course available");

  const notificationItem = screen.getByText("New course available");
  fireEvent.click(notificationItem);

  expect(console.log).toHaveBeenCalledWith(
    "Notification 1 has been marked as read"
  );
  const notificationList = screen.queryByText("New course available");
  expect(notificationList).toBeNull();
});

it("fetches and displays notifications when App is rendered", async () => {
  const mockNotifications = {
    notifications: [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "Latest notification content" } },
    ],
  };

  mockAxios.get.mockResolvedValueOnce({ data: mockNotifications });

  render(<App />);

  await waitFor(() => screen.findByText("New course available"));

  expect(screen.getByText("New course available")).toBeInTheDocument();
  expect(screen.getByText("New resume available")).toBeInTheDocument();
  expect(screen.getByText("Latest notification content")).toBeInTheDocument();
});


// it('fetches and displays courses after user logs in', async () => {

//   const mockCourses = {
//     courses: [
//       { "id": 1, "name": "ES6", "credit": 60 },
//       { "id": 2, "name": "Webpack", "credit": 20 },
//       { "id": 3, "name": "React", "credit": 40 }
//     ],
//   };

//   mockAxios.get.mockResolvedValueOnce(mockCourses );

//   const { getByText, findByText} = render(<App />);

//   const emailInput = screen.getByLabelText(/email/i);
//   const passwordInput = screen.getByLabelText(/password/i);
//   const loginButton = screen.getByRole('button', { name: /ok/i });

//   expect(loginButton).toBeInTheDocument()

//   fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
//   fireEvent.change(passwordInput, { target: { value: 'password123' } });
  
//   fireEvent.submit(loginButton);

//   await findByText('ES6');

//   // expect(getByText('ES6')).toBeInTheDocument();
//   // expect(getByText('Webpack')).toBeInTheDocument();
//   // expect(getByText('React')).toBeInTheDocument();
// });

