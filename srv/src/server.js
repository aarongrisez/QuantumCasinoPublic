const { Server, Mongo } = require('boardgame.io/server');
const { TicTacToe } = require('./Games/TicTacToe');
const fs = require('fs');

const db_uri = fs.readFileSync('/run/secrets/DB_CONNECTION_URI', 'utf8').trim()

function getServer() {
  return Server({
    games: [TicTacToe],
    db: new Mongo({
      url: db_uri,
      dbname: 'games',
    })
  })
}

function runServer(server) {
  server.run(8000).catch(error => {
    console.log('Failed to connect to mongo, trying again in 5 seconds...');
    setTimeout(() => runServer(getServer()), 5000);
  });
}

async function loggingMiddleware(ctx, next) {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
}

const server = getServer()

console.log(`Loading middlewares...`);
server.app.use(loggingMiddleware);

runServer(server)