FROM node:13.12.0-alpine
#FROM node:20.0.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
