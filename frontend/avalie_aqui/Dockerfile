FROM node:18-alpine3.16

WORKDIR /app

COPY . .

RUN rm package-lock.json

RUN npm install

RUN npm run build

RUN [ ! -e ./src/.env.env ] || rm ./src/.env.env

RUN cp ./src/docker.env ./src/.env.env