import React from 'react';
import PropTypes from 'prop-types';
import { Table, Jumbotron } from 'reactstrap';
import Room from './Room';

const RoomList = ({ rooms }) => {
  if (rooms) {
    return (
      <Table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Game</th>
            <th># Players</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <Room key={index} {...room} />
          ))}
        </tbody>
      </Table>
    );
  } else {
    return <h1>No Rooms</h1>;
  }
};

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      roomName: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default RoomList;
