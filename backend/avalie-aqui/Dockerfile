FROM node:18-alpine3.16
RUN apk --update add postgresql-client
RUN apk add --no-cache bash

WORKDIR /app

COPY . .

RUN rm package-lock.json

RUN npm install

RUN npx prisma generate

RUN npm run build

RUN [ ! -e .env ] || rm .env

RUN cp docker.env .env
