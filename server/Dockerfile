FROM node:alpine3.19
WORKDIR /app
COPY package.json ./
RUN rm -rf node_modules && npm cache clean --force
RUN npm install --legacy-peer-deps
COPY  . . 
EXPOSE 3000
RUN npm run build
CMD ["node", "server-build/index.js"]
