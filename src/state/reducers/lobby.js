import {
  CREATE_ROOM,
  FETCH_ROOMS_SUCCEEDED,
  CREATE_ROOM_SUCCEEDED
} from '../actions/lobby';

const initialState = {
  rooms: []
};

export function lobbyReducer(state = initialState, action) {
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
    roomID: action.data.gameID,
    roomName: action.data.gameID,
    game: action.data.game,
    numPlayers: action.data.numPlayers
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
  let rooms = action.data.rooms.map(room => {
    return {
      roomID: room.gameID,
      roomName: room.gameID,
      game: action.data.game,
      numPlayers: room.players.length
    };
  });

  return {
    ...state,
    rooms: rooms
  };
};
