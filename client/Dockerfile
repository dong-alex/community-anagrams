FROM node:12.19.0-alpine

WORKDIR /app

COPY . ./

RUN yarn
RUN yarn build

EXPOSE 3000 49153

CMD ["yarn", "start"]