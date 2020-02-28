import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Spinner } from 'reactstrap';
import Loading from '../Loading';
import Room from './Room';

const RoomList = props => {
  if (props.fetching) {
    return <Spinner color="primary" />;
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Room Name</th>
          <th>Game</th>
          <th># Players</th>
          <th>Details</th>
          <th>Join</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {props.rooms.map((room, index) => (
          <Room key={index} requestDelete={props.requestDelete} {...room} />
        ))}
      </tbody>
    </Table>
  );
};

RoomList.propTypes = {
  requestDelete: PropTypes.func.isRequired,
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomName: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default RoomList;
