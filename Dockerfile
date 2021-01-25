FROM node:15.6.0-alpine3.10 as build-stage
RUN mkdir -p build
WORKDIR /build
COPY . .
RUN yarn
RUN yarn build

FROM node:15.6.0-alpine3.10 as run-stage
RUN mkdir -p app
COPY --from=build-stage /build ./app
WORKDIR /app
ENTRYPOINT [ "yarn", "start" ]
