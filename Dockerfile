FROM node:20.9.0  as build-stage


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies

COPY package*.json ./

RUN npm install

# Bundle app source

COPY . .

RUN npm run build

# Path: Dockerfile
FROM nginx:latest


RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        openssl \
    && rm -rf /var/lib/apt/lists/*

RUN sed -i "s/\$HOST_IP/$HOST_IP/g" /etc/nginx/conf.d/default.conf


COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]



