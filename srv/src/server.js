const { Server, Mongo } = require('boardgame.io/server');
const { BellgameVanilla } = require('../bellgame/game');

const server = Server({
  games: [BellgameVanilla],
  db: new Mongo({
    url: 'mongodb://root:pass@mongo:27017',
    dbname: 'games'
  })
});

server.run(8000);