# Use an official Node.js runtime as a parent image
FROM node:lts as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Quasar CLI globally and project dependencies
RUN npm install -g @quasar/cli && npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the Quasar project
RUN quasar build

# Stage 2: Serve the static files using Nginx
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the Nginx server
CMD ["nginx", "-g", "daemon off;"]
