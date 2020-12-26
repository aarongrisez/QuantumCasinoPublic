import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, Spinner } from 'reactstrap';
import Room from './Room';

const RoomList = props => {
  if (props.fetching) {
    return (
      <Fragment>
        <h1>All Rooms</h1> 
        <div class="card-body p-2 text-center">
          <Spinner color="primary" />
        </div>
      </Fragment>
    )
  }

  const renderRooms = (rooms) => {
    return (
      <tbody>
        {rooms.map((room, index) => (
          <Room key={index} {...room} />
        ))}
      </tbody>
    )
  }

  const renderEmptyPlaceholder = () => {
    if (!props.rooms | props.rooms.length === 0) {
      return (
        <div class="card-body p-2 text-center">
          <span class="badge bg-grey-lt">No Rooms Yet</span>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <Fragment>
      <h1>All Rooms</h1> 
      <Table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Game</th>
            <th># Players</th>
            <th>Details</th>
            <th>Join</th>
          </tr>
        </thead>
        {renderRooms(props.rooms)}
      </Table>
      {renderEmptyPlaceholder(props.rooms)}
    </Fragment>
  );
};

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomName: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default RoomList;
