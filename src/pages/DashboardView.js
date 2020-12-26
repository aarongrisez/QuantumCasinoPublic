import React, { Fragment, useState, useEffect } from 'react';
import DashboardLayout from '../components/Layout/Dashboard/DashboardLayout';
import CreateRoomFormContainer from '../components/Lobby/CreateRoomFormContainer';
import RoomListContainer from '../components/Lobby/RoomListContainer';
import { loadRooms } from '../state/actions/room';
import { useAuth0 } from '@auth0/auth0-react';
import { connect } from 'react-redux';

let DashboardView = ({dispatch}) => {

  const [fetchingRooms, setFetchingRooms] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    getAccessTokenSilently().then(result => {
      dispatch(loadRooms('', setFetchingRooms, result));
    });
  }, [dispatch, getAccessTokenSilently]);

  return (
    <Fragment>
      <DashboardLayout 
        createRoomFormContainer = {<CreateRoomFormContainer />}
        roomListContainer = {<RoomListContainer fetching={fetchingRooms}/>} 
      />
    </Fragment>
  )
};

DashboardView = connect()(DashboardView);

export default DashboardView;