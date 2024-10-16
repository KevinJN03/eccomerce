FROM node:alpine3.19 AS build
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY  . . 
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

FROM nginx:1.27.2-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/dist .
EXPOSE 8080
CMD [ "nginx", "-g", "daemon off;" ]