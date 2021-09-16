FROM node:15

WORKDIR /usr/src/app

COPY . .

RUN npm install --progress --verbose

EXPOSE 4000

CMD ["npm", "start"]