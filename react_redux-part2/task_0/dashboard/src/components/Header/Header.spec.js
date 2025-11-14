import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer from '../../features/auth/authSlice';

const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: initialState
  });
};

const renderWithRedux = (component, initialState) => {
  const store = createMockStore(initialState);
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

export const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    console.log({hex})
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

test('should contain a <p/> element with specific text, <h1/>, and an <img/>', () => {
  const initialState = {
    auth: {
      user: {
        email: '',
        password: ''
      },
      isLoggedIn: false
    }
  };

  renderWithRedux(<Header />, initialState);

  const headingElement = screen.getByRole('heading', {name: /school Dashboard/i});
  const imgElement = screen.getByAltText('holberton logo')

  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveStyle({color: convertHexToRGBA('#e1003c') })
  expect(imgElement).toBeInTheDocument();
});

test('logoutSection is not rendered with default context value', () => {
  const initialState = {
    auth: {
      user: {
        email: '',
        password: ''
      },
      isLoggedIn: false
    }
  };

  renderWithRedux(<Header />, initialState);

  const logoutSection = screen.queryByText(/logout/i);

  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  const initialState = {
    auth: {
      user: {
        email: 'test@test.com',
        password: 'password123'
      },
      isLoggedIn: true
    }
  };

  renderWithRedux(<Header />, initialState);

  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('clicking logout link calls the logOut function', () => {
  const initialState = {
    auth: {
      user: {
        email: 'test@test.com',
        password: 'password123'
      },
      isLoggedIn: true
    }
  };

  const store = createMockStore(initialState);
  const dispatchSpy = jest.spyOn(store, 'dispatch');

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(dispatchSpy).toHaveBeenCalledWith(
    expect.objectContaining({
      type: 'auth/logout'
    })
  );
});
