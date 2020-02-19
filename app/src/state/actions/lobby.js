export const CREATE_ROOM = 'CREATE_ROOM';
export const LOAD_ROOMS = 'LOAD_ROOMS';
export const RENDER_ROOMS = 'RENDER_ROOMS';

export function createRoom(roomName, game, numPlayers) {
  return {
    type: CREATE_ROOM,
    room: {
      roomID: null,
      roomName: roomName,
      game: game,
      numPlayers: numPlayers
    }
  };
}

export function loadRooms(game) {
  return {
    type: LOAD_ROOMS,
    game: game
  };
}

export function renderRooms() {
  return {
    type: RENDER_ROOMS
  };
}
