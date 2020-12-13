import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { useAuth0 } from './react-auth0-spa'

const user = {
  email: 'test@bellga.me',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746'
}

jest.mock('./react-auth0-spa');

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