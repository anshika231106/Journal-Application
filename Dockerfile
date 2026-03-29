FROM node:18

WORKDIR /app

COPY server ./server

WORKDIR /app/server

RUN npm install

EXPOSE 5000

CMD ["node", "server.js"]