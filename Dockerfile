FROM node:22.23.4-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .



CMD ["npm", "run", "start:dev"]