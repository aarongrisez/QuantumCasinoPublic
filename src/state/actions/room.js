export const CREATE_ROOM = 'CREATE_ROOM';
export const CREATE_ROOM_REQUESTED = 'CREATE_ROOM_REQUESTED';
export const CREATE_ROOM_SUCCEEDED = 'CREATE_ROOM_SUCCEEDED';
export const LOAD_ROOMS = 'LOAD_ROOMS';
export const FETCH_ROOMS_SUCCEEDED = 'FETCH_ROOMS_SUCEEDED';
export const RENDER_ROOMS = 'RENDER_ROOMS';
export const DELETE_ROOM_REQUESTED = 'DELETE_ROOM_REQUESTED';
export const DELETE_ROOM_SUCCEEDED = 'DELETE_ROOM_SUCCEEDED';

export function createRoomRequested(
  roomName,
  game,
  numPlayers,
  setFetching,
  token
) {
  return {
    type: CREATE_ROOM_REQUESTED,
    url: '/rooms/' + game + '/create',
    setFetching: setFetching,
    token: token,
    roomName: roomName,
    numPlayers: numPlayers,
  };
}

export function deleteRoomRequested(roomName, game, setFetching, token) {
  return {
    type: DELETE_ROOM_REQUESTED,
    url: '/rooms/' + game + '/' + roomName,
    setFetching: setFetching,
    token: token,
    game: game
  };
}

export function loadRooms(game, setFetching, token) {
  return {
    type: LOAD_ROOMS,
    url: '/rooms/' + game,
    setFetching: setFetching,
    token: token,
    game: game
  };
}

export function renderRooms(data) {
  return {
    type: RENDER_ROOMS,
    data: data
  };
}
