import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Spinner } from 'reactstrap';
import Loading from '../Loading';
import Room from './Room';

const RoomList = ({ rooms }) => {
  const [fetching, setFetching] = useState(true);

  if (fetching) {
    setTimeout(() => setFetching(false), 1500);
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
        </tr>
      </thead>
      <tbody>
        {rooms.map((room, index) => (
          <Room key={index} {...room} />
        ))}
      </tbody>
    </Table>
  );
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
