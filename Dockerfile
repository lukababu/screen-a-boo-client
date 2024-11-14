# Stage 1: Build the application
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


# Stage 2: Serve the build files
FROM node:16.20.2-alpine3.18

# Set the working directory for the final stage
WORKDIR /usr/src/app

# Copy only the build files from the previous stage
COPY --from=build /usr/src/app/build ./build

# Install a simple HTTP server to serve the build files (e.g., `serve`)
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Serve the build files
CMD ["serve", "-s", "build"]
