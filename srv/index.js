const Server = require('boardgame.io/server').Server;
const BellgameVanilla = require('./game').BellgameVanilla;

const server = Server({
  games: [BellgameVanilla],
});

server.run(8000);