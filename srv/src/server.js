const { Server } = require('boardgame.io/server');
const { TicTacToe } = require('./Games/TicTacToe');
const jwt = require("koa-jwt");
const { koaJwtSecret } = require('jwks-rsa');
const Cabin = require('cabin');
const koaConnect = require('koa-connect');
const requestReceived = require('request-received');
const responseTime = require('response-time');
const requestId = require('express-request-id');
const { Signale } = require('signale');
const pino = require('pino')({
  customLevels: {
    log: 30
  }
});

const fs = require('fs');
const db_uri = fs.readFileSync('/run/secrets/DB_CONNECTION_URI', 'utf8').trim()

const cabin = new Cabin({
  axe: {
    logger: new Signale()
  }
});

function getServer() {
  return Server({
    games: [TicTacToe],
  })
}

function runServer(server) {
  server.run(8000).catch(error => {
    console.log('Failed to connect to mongo, trying again in 5 seconds...');
    setTimeout(() => runServer(getServer()), 5000);
  });
}

const server = getServer()

console.log(`Loading middlewares...`);
// adds request received hrtime and date symbols to request object
// (which is used by Cabin internally to add `request.timestamp` to logs
server.app.use(requestReceived);

// adds `X-Response-Time` header to responses
server.app.use(koaConnect(responseTime()));

// adds or re-uses `X-Request-Id` header
server.app.use(koaConnect(requestId()));

// use the cabin middleware (adds request-based logging and helpers)
server.app.use(cabin.middleware);



runServer(server)