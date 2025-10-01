import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { beforeEach, afterEach, test, expect, jest } from "@jest/globals";
import App from './App';

beforeEach(() => {
  jest.spyOn(document, 'addEventListener');
  jest.spyOn(document, 'removeEventListener');
});

afterEach(() => {
  document.addEventListener.mockRestore();
  document.removeEventListener.mockRestore();
});

test('Should return true if the App component is a class component', () => {
  const props = Object.getOwnPropertyNames(App.prototype);
  const isClassComponent = App.prototype.__proto__ === React.Component.prototype;
  const inheritsFromReactComponent = Object.getPrototypeOf(App.prototype) === React.Component.prototype;
  expect(props).toContain('constructor');
  expect(isClassComponent).toBe(true);
  expect(inheritsFromReactComponent).toBe(true);
});

test('Should call the logOut prop once whenever the user hits "Ctrl" + "h" keyboard keys', () => {
  const logOutMock = jest.fn();
  jest.spyOn(window, 'alert').mockImplementation(() => { });
  render(<App isLoggedIn={true} logOut={logOutMock} />);
  fireEvent.keyDown(document, { ctrlKey: true, key: 'h' });
  expect(logOutMock).toHaveBeenCalledTimes(1);
});

test('Should display an alert window whenever the user hit "ctrl" + "h" keyboard keys', () => {
  const logoutSpy = jest.fn();
  window.alert = jest.fn();
  render(<App logOut={logoutSpy} />);
  fireEvent.keyDown(document, { ctrlKey: true, key: 'h' });
  expect(window.alert).toHaveBeenCalledWith('Logging you out');
});

test('Should remove event listener in componentWillUnmount', () => {
  const { unmount } = render(<App isLoggedIn={false} />);
  expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
  unmount();
  expect(document.removeEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
});

test('should add event listener in componentDidMount', () => {
  render(<App isLoggedIn={false} />);
  expect(document.addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));
});
