# Use an official Node runtime as a parent image
FROM node:lts as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# build app for production with minification
RUN quasar build

# Stage 2: Setup serve to serve static files from dist/spa
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
