FROM node:18-alpine as build

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json .
RUN npm i

COPY . .

RUN npm run build


FROM busybox:1.35

RUN adduser -D static
USER static

WORKDIR /home/static

COPY --from=build /usr/src/app/dist /home/static

CMD ["busybox", "httpd", "-f", "-v", "-p", "5000"]
