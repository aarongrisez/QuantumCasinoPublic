import {
  FETCH_ROOMS_SUCCEEDED,
  CREATE_ROOM_SUCCEEDED
} from '../actions/room';

const initialState = {
  rooms: []
};

export function roomReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM_SUCCEEDED:
      return createRoomReducer(state, action);
    case FETCH_ROOMS_SUCCEEDED:
      return fetchRoomReducer(state, action);
    default:
      return state;
  }
}

const createRoomReducer = (state, action) => {
  const newGame = {
    roomID: action.data.name,
    roomName: action.data.name,
    game: action.data.game,
    players: action.data.players,
    maxPlayers: action.data.maxPlayers
  };
  let newRooms = [
    ...state.rooms,
    {
      ...newGame
    }
  ];
  return {
    ...state,
    rooms: newRooms
  };
};

const fetchRoomReducer = (state, action) => {
  let rooms = action.data.map(room => {
    return {
      roomID: room.id,
      roomName: room.name,
      game: room.game,
      players: room.players,
      maxPlayers: room.maxPlayers
    };
  });

  return {
    ...state,
    rooms: rooms
  };
};
