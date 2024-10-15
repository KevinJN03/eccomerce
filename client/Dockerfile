FROM node:alpine3.19
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY  . . 
RUN npm run build

FROM nginx:1.27.2-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]