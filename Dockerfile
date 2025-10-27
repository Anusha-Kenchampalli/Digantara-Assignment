# # Use an official Node.js runtime as a parent image
# FROM node:18-alpine

# # Set the working directory in the container
# WORKDIR /usr/src/app

# # Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

# # Install project dependencies
# RUN npm install

# # Copy the rest of the application's source code from your host to your image filesystem.
# COPY . .

# # Compile TypeScript to JavaScript
# RUN npm run build

# # Your app binds to port 8000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
# EXPOSE 8000

# # Define the command to run your app
# CMD [ "node", "dist/server.js" ]

# Use Node.js image
FROM node:18

# Create working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose app port
EXPOSE 8000

# Start command
CMD ["npm", "run", "dev"]
