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
import { createRoom, loadRooms } from '../../state/actions/lobby';
import RoomListContainer from './RoomListContainer';
//import { TicTacToe } from '../Games/TicTacToe';
//import { TicTacToeBoard } from '../Boards/TicTacToeBoard';

//const importedGames = [{ game: TicTacToe, board: TicTacToeBoard }];

let LobbyView = ({ dispatch }) => {
  dispatch(loadRooms('tic-tac-toe'));

  return (
    <div>
      <h1>Lobby</h1>
      <div style={{ padding: 10 }}>
        <h2>Make a New Room</h2>
        <CreateRoomForm
          onSubmit={values =>
            dispatch(
              createRoom(values.roomName, values.game, values.numPlayers)
            )
          }
        />
      </div>
      <div style={{ padding: 10 }}>
        <h2>Join an existing room</h2>
        <RoomListContainer />
      </div>
    </div>
  );
};
LobbyView = connect(state => ({
  formValues: getFormValues('create-room-form')(state)
}))(LobbyView);

export default LobbyView;
