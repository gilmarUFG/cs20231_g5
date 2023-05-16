FROM node:18-alpine3.16
RUN apk --update add postgresql-client

WORKDIR /app

COPY . .

RUN rm package-lock.json
RUN npm install --only=production

RUN npm run build

COPY .env.docker .env

RUN npx prisma generate