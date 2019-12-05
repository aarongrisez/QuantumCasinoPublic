# bellga.me
## 2.0

### Server Quickstart

The easiest way to get running is to use the docker-compose file in the root of this repo. Assuming you have docker-compose (min API version 3 required) installed, run

```bash
docker-compose build
```

to create the server image for the first time. You can then run

```bash
docker-compose up
```

to run the server.


### API Testing

I am personally a fan of Postman for API testing, so I've included an export of my saved requests that I use for testing in the `test` directory.