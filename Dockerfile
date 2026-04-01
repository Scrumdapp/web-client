# Build phase
FROM 25-alpine as build

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm ci

# Make sure to include MSW directory
COPY src .
COPY public .

# Remove service worker, we don't want it in the build
RUN rm public/mockServiceWorker.js

RUN npm run build

# Runner
FROM nginx:stable-alpine

COPY nginx/default.conf /etc/nginx/conf.d
COPY --from=build dist /var/www/web

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]