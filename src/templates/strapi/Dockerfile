FROM node:20 as build
RUN apt-get update && apt-get install build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git
RUN rm -rf /var/lib/apt/lists/*
ENV NODE_ENV production

WORKDIR /opt/
COPY package.json yarn.lock ./
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 -g && yarn install --production
ENV PATH /opt/node_modules/.bin:$PATH
WORKDIR /opt/app
COPY . .
RUN yarn build

## Build runtime image
FROM node:20-slim as prod
RUN apt-get install vips-dev
RUN rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production

WORKDIR /opt/
COPY --from=build /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=build /opt/app ./
ENV PATH /opt/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["yarn", "start"]
