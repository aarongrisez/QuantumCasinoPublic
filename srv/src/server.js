const { Server, Mongo } = require('boardgame.io/server');
const { TicTacToe } = require('./Games/TicTacToe')

const server = Server({
  games: [TicTacToe],
  db: new Mongo({
    url: 'mongodb://root:pass@mongo:27017',
    dbname: 'games'
  })
});

server.run(8000);