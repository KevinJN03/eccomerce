FROM node:alpine3.19 as builder
WORKDIR /app
COPY package.json ./
RUN rm -rf node_modules && npm cache clean --force
RUN npm install --legacy-peer-deps
COPY  . . 
RUN npm run build
RUN npm prune --omit=dev -f

FROM node:alpine3.19 
WORKDIR /app
COPY --from=builder /app/ /app/
EXPOSE 3000
# Remove devDependencies after the build process

CMD ["node", "server-build/index.js"]
