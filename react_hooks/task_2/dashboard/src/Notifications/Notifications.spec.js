import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notifications from './Notifications';
import { getLatestNotification } from '../utils/utils'


describe('Notifications component', () => {
  const logSpy = jest.spyOn(console, 'log')

  test('renders the notifications title', () => {
    const props = {
      notifications: [
        { id:1, type:'default', value:'New course available' },
        { id:2, type:'urgent', value:'New resume available' },
        { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
      ], 
      displayDrawer: true
    }
    render(<Notifications {...props} />);
    const titleElement = screen.getByText(/Here is the list of notifications/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the close button', () => {
    const props = {
      notifications: [
        { id:1, type:'default', value:'New course available' },
        { id:2, type:'urgent', value:'New resume available' },
        { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
      ], 
      displayDrawer: true
    }
    render(<Notifications {...props} />);
    const buttonElement = screen.getByRole('button', { name: /close/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders three notifications', () => {
    const props = {
      notifications: [
        { id:1, type:'default', value:'New course available' },
        { id:2, type:'urgent', value:'New resume available' },
        { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
      ], 
      displayDrawer: true
    }
    render(<Notifications {...props} />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(3);
  });

  // test('logs message when close button is clicked', () => {
  //   console.log = jest.fn();
  //   const props = {
  //     notifications: [
  //       { id:1, type:'default', value:'New course available' },
  //       { id:2, type:'urgent', value:'New resume available' },
  //       { id:3, type:'urgent', html:{ __html: getLatestNotification()} }
  //     ], 
  //     displayDrawer: true
  //   }
  //   render(<Notifications {...props} />);
  //   const buttonElement = screen.getByRole('button', { name: /close/i });
  //   fireEvent.click(buttonElement);
  //   expect(console.log).toHaveBeenCalledWith('Close button has been clicked');
  // });

  test('should display the 3 notification items with their given text', () => {
    const props = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } }
      ],
      displayDrawer: true
    };

    render(<Notifications {...props} />);
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
    expect(screen.getByText(/Urgent requirement/)).toBeInTheDocument();
  });

  test('should display the text No new notification for now when Notifications list is empty', () => {
    const props = {
      notifications: [],
      displayDrawer: true
    };

    render(<Notifications {...props} />);
    expect(screen.getByText('No new notification for now')).toBeInTheDocument();
  });


  test('it should rerender when prop values change', () => {
    const markAsReadMock = jest.fn();
  
    const initialProps = {
      displayDrawer: true,
      notifications: [
        { id: 1, type: 'default', value: 'New notification' },
        { id: 2, type: 'urgent', value: 'Urgent notification' }
      ],
      markNotificationAsRead: markAsReadMock,
    };
  
    const { rerender } = render(<Notifications {...initialProps} />);
  
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  
    fireEvent.click(screen.getByText('New notification'));
  
    expect(markAsReadMock).toHaveBeenCalledWith(1);
  
    const updatedProps = {
      ...initialProps,
      notifications: [
        { id: 2, type: 'urgent', value: 'Urgent notification' }
      ]
    };
  
    rerender(<Notifications {...updatedProps} />);
  
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });

  test('should rerender when the notifications length changes', () => {
    const initialNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
    ];
  
    const newNotifications = [
      { id: 1, type: 'default', value: 'Notification 1' },
      { id: 2, type: 'urgent', value: 'Notification 2' },
    ];
  
    const renderSpy = jest.spyOn(Notifications.prototype, 'render');
  
    const { rerender } = render(<Notifications notifications={initialNotifications} displayDrawer={true} />);
  
    expect(renderSpy).toHaveBeenCalledTimes(1);
  
    rerender(<Notifications notifications={newNotifications} displayDrawer={true} />);
  
    expect(renderSpy).toHaveBeenCalledTimes(2);
    renderSpy.mockRestore();
  });


  test('calls handleDisplayDrawer when clicking on the menu item', () => {
    const handleDisplayDrawerMock = jest.fn(); 

    render(
      <Notifications 
        notifications={[]} 
        displayDrawer={false} 
        handleDisplayDrawer={handleDisplayDrawerMock} 
      />
    );

    const menuItem = screen.getByText('Your notifications');
    fireEvent.click(menuItem);

    expect(handleDisplayDrawerMock).toHaveBeenCalled();
  });

});