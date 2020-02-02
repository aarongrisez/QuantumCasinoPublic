# bellga.me2
[![CircleCI](https://circleci.com/gh/aarongrisez/bellga.me2/tree/release-v1.0.0.svg?style=svg)](https://circleci.com/gh/aarongrisez/bellga.me2/tree/release-v1.0.0)

## Application Structure
### Client
The client is a React application bootstrapped with CRA and served by NGINX. Authentication is handled by Auth0.

### Server
The server is a Koa application (NodeJS) using a MongoDB backend for storing game and lobby states.

### Framework
We use boardgame.io as our game framework for handling game logic and state.

## Docker Images
 - [Client](https://hub.docker.com/repository/docker/aarongrisez/bellgame2-app)
 - [Server](https://hub.docker.com/repository/docker/aarongrisez/bellgame2-srv)

## Resources
 - [Bell's Theorem](https://en.wikipedia.org/wiki/Bell%27s_theorem)
 - [What's this all about?](about.md)