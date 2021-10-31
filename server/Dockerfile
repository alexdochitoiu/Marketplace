FROM node:16.10-slim

WORKDIR /usr/src/app

COPY ./dist ./dist
COPY ./package*.json .
COPY ./.env* .
RUN mkdir -p ./public/images

RUN npm install --progress --verbose

EXPOSE 4000

CMD ["yarn", "serve"]