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

# Run the build command to create production-ready files
RUN npm run build

# Stage 2: Use a minimal image to hold the built files
FROM alpine:3.18

# Copy only the build files from the previous stage
COPY --from=build /usr/src/app/build /app/build

# The final image only contains the build files, without any runtime server
