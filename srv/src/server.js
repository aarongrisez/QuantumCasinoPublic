const { Server, Mongo } = require('boardgame.io/server');
const { TicTacToe } = require('./Games/TicTacToe')

var successful_connect = false;

while (!successful_connect) {
  try {
    const server = Server({
      games: [TicTacToe],
      db: new Mongo({
        url: 'mongodb://root:pass@mongo:27017',
        dbname: 'games'
      })
    });
  }
  catch(error) {
    console.log(error);
    console.log('Failed to connect to mongo, trying again in 5 seconds...');
    setTimeout(5);
  }
}

console.log('Server running, listening on 8000');
server.run(8000);