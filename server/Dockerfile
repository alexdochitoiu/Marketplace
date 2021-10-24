FROM node:16.10-slim

WORKDIR /usr/src/app

COPY ./dist ./dist
COPY ./public ./public
COPY ./package.json .
COPY ./.env .
COPY ./.env.example .

RUN npm install --progress --verbose

EXPOSE 4000

CMD ["yarn", "serve"]