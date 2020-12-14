import React, { Fragment } from 'react';

import Hero from '../components/Layout/Hero';

const Home = () => (
  <Fragment>
    <Hero />
    <h1 className="mb-4">Welcome to the Bellgame!</h1>
    <p>Pardon the mess, we're working on getting features back up and running.
    Take a look back here soon to try your hand at the Bellgame!</p>
  </Fragment>
);

export default Home;
