FROM node:18

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json .
RUN npm i

COPY . .

EXPOSE 5000

CMD [ "node", "src/main.js" ]
