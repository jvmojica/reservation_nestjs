FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install -g && yarn install

COPY . .

RUN yarn build

# CREATE PRODUCTION IMAGE
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --production

COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/package.json ./package.json

CMD [ "node", "dist/apps/reservations/main" ]