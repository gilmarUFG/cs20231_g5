FROM node:18-alpine3.16
RUN apk --update add postgresql-client

WORKDIR /app
# COPY package.json .

COPY . .
RUN rm package-lock.json
RUN npm install --only=production

# RUN chmod +x ./wait-for-postgres.sh

# RUN npm run build

COPY .env.docker .env

RUN npx prisma generate
# CMD npx prisma migrate dev