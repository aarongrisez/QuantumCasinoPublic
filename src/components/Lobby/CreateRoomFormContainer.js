import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';
import CreateRoomForm from './CreateRoomForm';
import { getFormValues } from 'redux-form';
import { createRoomRequested } from '../../state/actions/room';

let CreateRoomFormContainer = ({ dispatch }) => {
  const [requestingRoom, setRequestingRoom] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = (formValues) => {
    setRequestingRoom(true);
    getAccessTokenSilently().then(result => {
      dispatch(
        createRoomRequested(
          formValues.roomName,
          formValues.game || "bellgame-vanilla",
          formValues.numPlayers || 2,
          setRequestingRoom,
          result
        )
      );
    });
  }

  const getCanRequestRoom = () => {
    return !requestingRoom
  }

  return <CreateRoomForm 
    onSubmit={handleSubmit}
    canRequestRoom={getCanRequestRoom()}
  />
}

CreateRoomFormContainer = connect(state => ({
  formValues: getFormValues('create-room-form')(state)
}))(CreateRoomFormContainer);

export default CreateRoomFormContainer;
