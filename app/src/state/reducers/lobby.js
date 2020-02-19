import { CREATE_ROOM, RENDER_ROOMS } from '../actions/lobby';
import fetchBackend from '../../utilities/backend';

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
    case RENDER_ROOMS:
      return {
        ...state,
        rooms: action.rooms
      };
    default:
      return state;
  }
}
