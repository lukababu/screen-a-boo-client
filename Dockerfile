# Stage 1: Build the React application
FROM node:16.20.2-alpine3.18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables at build time
ARG REACT_APP_SOCKET_SERVER_URL
ENV REACT_APP_SOCKET_SERVER_URL=${REACT_APP_SOCKET_SERVER_URL}

# Run the build command to create production-ready files
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Serve the build
CMD ["npx", "serve", "-s", "build"]