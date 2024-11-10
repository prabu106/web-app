FROM node:18-alpine

WORKDIR /web-app

COPY . /web-app/

EXPOSE 4000

RUN npm install

CMD ["npm", "start"]