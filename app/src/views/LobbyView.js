/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { Lobby } from 'boardgame.io/react';
import { TicTacToe } from "../components/Games/TicTacToe"
import { TicTacToeBoard } from "../components/Boards/TicTacToeBoard"

const importedGames = [
  { game: TicTacToe, board: TicTacToeBoard },
];

const LobbyView = () => {

  if (importedGames.length > 0) {
    return getDefaultLobbyView();
  }
  else {
    return getEmptyLobbyView();
  }
};

const getDefaultLobbyView = () => (
  <div style={{ padding: 50 }}>
    <Lobby
      gameServer={process.env.REACT_APP_GAME_SERVER}
      lobbyServer={process.env.REACT_APP_LOBBY_SERVER}
      gameComponents={importedGames}
    />
  </div>
)

const getEmptyLobbyView = () => (
  <h1>No games here... :(</h1>
)

export default LobbyView;
