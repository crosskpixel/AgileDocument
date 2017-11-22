# specify the node base image with your desired version node:<version>
FROM node:6
# replace this with your application's default port
RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN node -v

RUN npm install

COPY . /usr/src/app

cmd node app.js

EXPOSE 3000