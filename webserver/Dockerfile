# Start your image with a node base image
FROM --platform=linux/amd64 node:lts-alpine as builder

# The /app directory should act as the main application directory
WORKDIR /app

# Copy json configs
COPY *.json ./
COPY vite.config.ts ./
COPY yarn.lock ./

# Copy index file
COPY index.html ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./public ./public

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN yarn install

RUN yarn run build

FROM nginx:1.25.0-alpine as production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Start the app using serve command
CMD [ "nginx", "-g", "daemon off;"]