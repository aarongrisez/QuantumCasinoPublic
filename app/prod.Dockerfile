FROM node:10-alpine as deps

RUN apk update && apk upgrade && \
  apk add --no-cache bash git openssh yarn

WORKDIR /usr/src/app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

# ---------------

FROM nginx:1.12-alpine
RUN mkdir -p /app/build
COPY --from=deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
