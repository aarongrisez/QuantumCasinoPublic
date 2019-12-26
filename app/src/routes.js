/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import lobbies from './components/lobbies';
import profile from './components/profile';

const routes = [
  {
    name: 'Lobbies',
    routes: lobbies.routes,
  },
];

export const privateRoutes = [
  {
    name: 'Profile',
    routes: profile.routes,
  },
];



export default routes;
