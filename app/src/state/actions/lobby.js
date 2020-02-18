export const CREATE_ROOM = 'CREATE_ROOM';

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
