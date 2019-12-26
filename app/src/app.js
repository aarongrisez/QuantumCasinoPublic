/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';
import { getLiNavLinks } from './utils/li-navlink';
import { getPrivateLiNavLinks } from './utils/private-li-navlink';

import routes, { privateRoutes } from './routes';
import './app.css';

// CSS for the sidebar is taken from vue.css
export const App = () => (
  <Router>
    <main>
      <aside className="sidebar">
        <div className="sidebar-nav" style={{ height: '90%' }}>
          <ul>
            { routes.map((route_category, idx) => getLiNavLinks(route_category, idx)) }
          </ul>
          <ul>
            { privateRoutes.map((route_category, idx) => getPrivateLiNavLinks(route_category, idx)) }
          </ul>
        </div>
      </aside>
      <section className="content">
        {_.flattenDeep(routes.map(route => route.routes)).map((route, idx) => (
          <Route
            key={idx}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      </section>
    </main>
  </Router>
);
