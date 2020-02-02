FROM node:latest
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
WORKDIR /app
RUN npm install
COPY ./src /app/src
EXPOSE 8000
CMD ["npm", "start"]