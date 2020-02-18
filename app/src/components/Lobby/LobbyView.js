/*
 * Copyright 2018 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import { connect } from 'react-redux';
import CreateRoomForm from './CreateRoomForm';
import { getFormValues } from 'redux-form';
import { createRoom } from '../../state/actions/lobby';
//import { TicTacToe } from '../Games/TicTacToe';
//import { TicTacToeBoard } from '../Boards/TicTacToeBoard';

//const importedGames = [{ game: TicTacToe, board: TicTacToeBoard }];

let LobbyView = ({ dispatch }) => {
  return (
    <div style={{ padding: 50 }}>
      <h1>Lobby</h1>
      <CreateRoomForm
        onSubmit={values =>
          dispatch(createRoom(values.roomName, values.game, values.numPlayers))
        }
      />
    </div>
  );
};
LobbyView = connect(state => ({
  formValues: getFormValues('create-room-form')(state)
}))(LobbyView);

export default LobbyView;
