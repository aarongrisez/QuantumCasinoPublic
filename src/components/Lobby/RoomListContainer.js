import { connect } from 'react-redux';
import RoomList from './RoomList';

const mapStateToProps = state => {
  return {
    rooms: state.room.rooms
  };
};

const RoomListContainer = connect(mapStateToProps)(RoomList);

export default RoomListContainer;
