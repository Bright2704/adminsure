# Use an official node image as a base image
FROM node:16.14.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install a simple static file server to serve the React app
RUN npm install -g serve

# Set the command to run the server
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 5173
