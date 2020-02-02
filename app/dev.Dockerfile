FROM node:10-alpine

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh yarn

WORKDIR /usr/src/app
COPY ./app/package.json .
COPY ./app/yarn.lock .
RUN yarn install
COPY ./app .
EXPOSE 3000
CMD ["npm", "start"]