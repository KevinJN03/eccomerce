FROM node:alpine3.19
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps
COPY  . . 
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]
