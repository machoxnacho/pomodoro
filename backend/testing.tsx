# Use official Node.js base image
FROM node:18

# Create working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port your app uses
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
