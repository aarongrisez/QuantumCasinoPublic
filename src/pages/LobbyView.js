import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { connect } from 'react-redux';
import CreateRoomForm from '../components/Lobby/CreateRoomForm';
import { getFormValues } from 'redux-form';
import {
  loadRooms,
  createRoomRequested,
  deleteRoomRequested
} from '../state/actions/lobby';
import RoomListContainer from '../components/Lobby/RoomListContainer';

let LobbyView = ({ dispatch }) => {
  const [fetchingRooms, setFetchingRooms] = useState(true);
  const [requestingRoom, setRequestingRoom] = useState(false);
  const [requestingRoomDeletion, setRequestingRoomDeletion] = useState(false);
  const { getTokenSilently } = useAuth0();

  console.log(requestingRoom)
  console.log(requestingRoomDeletion)

  const requestDelete = (roomName, game) => {
    return () => {
      setRequestingRoomDeletion(true);
      getTokenSilently().then(result => {
        dispatch(
          deleteRoomRequested(roomName, game, setRequestingRoomDeletion, result)
        );
      });
    };
  };

  useEffect(() => {
    getTokenSilently().then(result => {
      dispatch(loadRooms('', setFetchingRooms, result));
    });
  }, [dispatch, getTokenSilently]);

  return (
    <div>
      <h1>Lobby</h1>
      <div style={{ padding: 30 }}>
        <h2>Make a New Room</h2>
        <CreateRoomForm
          onSubmit={values => {
            setRequestingRoom(true);
            getTokenSilently().then(result => {
              dispatch(
                createRoomRequested(
                  values.roomName,
                  values.game || "bellgame-vanilla",
                  values.numPlayers || 2,
                  setRequestingRoom,
                  result
                )
              );
            });
          }}
        />
      </div>
      <div style={{ padding: 30 }}>
        <h2>Join an existing room</h2>
        <RoomListContainer
          fetching={fetchingRooms}
          requestDelete={requestDelete}
        />
      </div>
    </div>
  );
};
LobbyView = connect(state => ({
  formValues: getFormValues('create-room-form')(state)
}))(LobbyView);

export default LobbyView;
