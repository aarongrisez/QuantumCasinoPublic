FROM node:10-alpine

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh yarn

WORKDIR /usr/src/app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]