FROM node:18-alpine3.16

WORKDIR /app

COPY . .

RUN rm package-lock.json

# Apaga o arquivo .env caso ele exista
RUN [ ! -e src/.env.end ] || rm src/.env.end

RUN npm install

# RUN npm install -g serve

# RUN npm run build