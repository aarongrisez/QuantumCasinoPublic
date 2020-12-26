import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { useAuth0 } from '@auth0/auth0-react'

const user = {
  email: 'test@bellga.me',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746'
}

jest.mock('@auth0/auth0-react');

describe('App', () => {

  beforeEach(() => {
    useAuth0.mockReturnValue({
      isAuthenticated: true,
      user,
      logout: jest.fn(),
      loginWithRedirect: jest.fn(),
    })
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});