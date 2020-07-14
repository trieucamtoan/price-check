#https://cli.vuejs.org/guide/deployment.html#docker-nginx

# build stage
FROM node:lts-alpine as build-stage
WORKDIR /frontend

COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent


COPY . ./
RUN npm run-script build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /frontend/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]