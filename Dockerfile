FROM node:latest as node

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build -c docker

FROM nginx:alpine
COPY --from=node /app/dist/notescrib /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
