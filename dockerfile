FROM node:18-alpine3.14

WORKDIR /usr/src/webhook

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 5000

CMD [ "node", "./dist/index.js" ]