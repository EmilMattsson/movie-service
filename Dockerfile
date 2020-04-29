FROM node:12.13.0-slim

WORKDIR /usr/src/app

COPY package.json .
COPY ./build .
RUN yarn install --prod

EXPOSE 4000
CMD [ "yarn", "start" ]