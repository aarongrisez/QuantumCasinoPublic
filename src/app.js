import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import PrivateRoute from './components/PrivateRoute';
import Loading from './components/Layout/Loading';
import NavBar from './components/Layout/NavBar';
import Footer from './components/Layout/Footer';
import Home from './pages/HomeView';
import Profile from './pages/ProfileView';
import LobbyView from './pages/LobbyView';
import ErrorView from './pages/ErrorView';
import AboutView from './pages/AboutView';
import { useAuth0 } from './react-auth0-spa';
import history from './utilities/history';

// styles
import './app.css';

// fontawesome
import initFontAwesome from './utilities/initFontAwesome';
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={AboutView} />
            <PrivateRoute path="/lobby" component={LobbyView} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="*" exact component={ErrorView} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
