/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import lobby from './lobby';
import simulator from '../bellgame/simulator'

const routes = [
  {
    name: 'Simulator',
    routes: simulator.routes,
  },
  {
    name: 'Lobby',
    routes: lobby.routes,
  },
];

export default routes;
