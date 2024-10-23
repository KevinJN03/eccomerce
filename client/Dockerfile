FROM node:20-alpine3.19 AS builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm i --force
COPY  . . 
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm run build

# FROM nginx:stable-alpine
# # copy nginx configuration in side conf.d folder
# COPY --from=builder /usr/src/app/nginx /etc/nginx/conf.d
# # Copy the build output from the dist folder into the Nginx html directory
# COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# EXPOSE 80
# ENTRYPOINT ["nginx", "-g", "daemon off;"] 

FROM node:20-alpine3.19 
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app /usr/src/app
EXPOSE 80
CMD ["npm", "run", "preview"]

