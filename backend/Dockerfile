FROM node:17.3

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000
CMD [ "yarn", "start" ]