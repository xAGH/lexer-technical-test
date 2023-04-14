FROM node:18-alpine AS builder
WORKDIR /app/src
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine AS app
WORKDIR /app
COPY --from=builder /app/src/package*.json .
COPY --from=builder /app/src/dist ./dist
RUN npm install --only=production
CMD [ "npm", "start" ]
