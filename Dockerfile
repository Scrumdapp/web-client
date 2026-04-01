# Install phase
FROM node:25-alpine as install

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm ci

# Build phase
FROM node:25-alpine as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY --from=install /app/node_modules node_modules

# Make sure to exclude MSW directory
COPY tsconfig*.json .
COPY vite.config.ts .
COPY index.html .
COPY src src
COPY public public
COPY msw/empty.ts msw/worker.ts

# Remove service worker, we don't want it in the build
RUN rm public/mockServiceWorker.js

RUN npm run build

# Runner
FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=build /app/dist /var/www/web

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]