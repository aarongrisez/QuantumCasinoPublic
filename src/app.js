import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Layout/Loading';
import NavBar from './components/Layout/NavBar';
import Footer from './components/Layout/Footer';
import DashboardView from './pages/DashboardView';
import HomeView from './pages/HomeView';
import Profile from './pages/ProfileView';
import ErrorView from './pages/ErrorView';
import AboutView from './pages/AboutView';
import { useAuth0 } from '@auth0/auth0-react';
import history from './utilities/history';

// styles
import './app.css';

// fontawesome
import initFontAwesome from './utilities/initFontAwesome';
initFontAwesome();

const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if ( isLoading ) {
    return <Loading />;
  }

  let Landing = null;
  if ( isAuthenticated ) {
    Landing = DashboardView
  } else {
    Landing = HomeView
  }

  return (
    <BrowserRouter history={history}>
      <div id="app" className="d-flex flex-column h-100 antialiased">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/about" exact component={AboutView} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="*" exact component={ErrorView} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
