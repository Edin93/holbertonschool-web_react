import { render, screen, fireEvent } from '@testing-library/react';
import { getLatestNotification } from '../utils/utils'
import { test, expect, jest } from "@jest/globals";
import Notifications from './Notifications';

test('Should display a title, button and a 3 list items, whenever the "displayDrawer" set to true', () => {
  const props = {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ],
    displayDrawer: true
  }
  render(<Notifications {...props} />)
  const notificationsTitle = screen.getByText('Here is the list of notifications');
  const notificationsButton = screen.getByRole('button');
  const notificationsListItems = screen.getAllByRole('listitem');
  expect(notificationsTitle).toBeInTheDocument();
  expect(notificationsButton).toBeInTheDocument();
  expect(notificationsListItems).toHaveLength(3);
});

test('Should display 3 notification items as expected', () => {
  const props = {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ],
    displayDrawer: true
  };
  render(<Notifications {...props} />);
  const notificationsFirstItem = screen.getByText('New course available');
  const notificationsSecondItem = screen.getByText('New resume available');
  const notificationsListItems = screen.getAllByRole('listitem');
  expect(notificationsFirstItem).toBeInTheDocument();
  expect(notificationsSecondItem).toBeInTheDocument();
  const reactPropsKey = Object.keys(notificationsListItems[2]).find(key => /^__reactProps/.test(key));
  if (reactPropsKey) {
    const dangerouslySetInnerHTML = notificationsListItems[2][reactPropsKey].dangerouslySetInnerHTML.__html;
    expect(dangerouslySetInnerHTML).toContain('<strong>Urgent requirement</strong>');
    expect(dangerouslySetInnerHTML).toContain(' - complete by EOD');
  } else {
    throw new Error('No property found matching the regex');
  }
});

test('Should display the correct notification colors', () => {
  const props = {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ],
    displayDrawer: true
  };
  render(<Notifications {...props} />);
  const notificationsListItems = screen.getAllByRole('listitem');
  const colorStyleArr = [];
  for (let i = 0; i <= notificationsListItems.length - 1; i++) {
    const styleProp = Object.keys(notificationsListItems[i]).find(key => /^__reactProps/.test(key));
    if (styleProp) {
      colorStyleArr.push(notificationsListItems[i].style._values.color);
    }
  }
  expect(colorStyleArr).toEqual(['blue', 'red', 'red']);
});


test('Should log "Close button has been clicked" whenever the close button is clicked and, the "displayDrawer" set to true', () => {
  const props = {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ],
    displayDrawer: true
  }
  render(<Notifications {...props} />)
  const notificationsButton = screen.getByRole('button');
  const consoleSpy = jest.spyOn(console, 'log');
  fireEvent.click(notificationsButton);
  expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
  consoleSpy.mockRestore();
})

test('Should render the 3 given notifications text, whenever the "displayDrawer" set to true', () => {
  const props = {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ],
    displayDrawer: true
  }
  render(<Notifications {...props} />)
  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
  expect(screen.getByText(/complete by EOD/)).toBeInTheDocument();
})

test('Should not display a title, button and a 3 list items, whenever the "displayDrawer" set to false', () => {
  const props = {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
    ],
    displayDrawer: false
  }
  render(<Notifications {...props} />)
  const notificationsTitle = screen.queryByText('Here is the list of notifications');
  const notificationsButton = screen.queryByRole('button');
  const notificationsListItems = screen.queryAllByRole('listitem');
  expect(notificationsTitle).toBeNull();
  expect(notificationsButton).toBeNull();
  expect(notificationsListItems).toHaveLength(0);
});

test('Should display a paragraph of "No new notification for now" whenever the listNotification prop is empty', () => {
  const props = {
    notifications: [],
    displayDrawer: true
  }
  render(<Notifications {...props} />)
  const notificationsTitle = screen.getByText('No new notification for now');
  expect(notificationsTitle).toBeInTheDocument();
});
