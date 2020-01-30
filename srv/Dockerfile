FROM node:latest
COPY ./srv/package.json /app/package.json
COPY ./srv/package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install
COPY ./srv/src /app/src
EXPOSE 8000
CMD ["npm", "start"]