FROM node:latest
COPY ./srv/package.json /home/node/app/package.json
COPY ./srv/package-lock.json /home/node/app/package-lock.json
WORKDIR /home/node/app
RUN npm install
COPY ./srv/src /home/node/app/src
EXPOSE 8000
CMD ["npm", "start"]