import { CREATE_ROOM } from '../actions/lobby';

const initialState = {
  rooms: []
};

export function lobbyReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_ROOM:
      let newRooms = [
        ...state.rooms,
        {
          ...action.room
        }
      ];
      return {
        ...state,
        rooms: newRooms
      };
    default:
      return state;
  }
}
